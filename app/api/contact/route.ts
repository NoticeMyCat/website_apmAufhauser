import { createHash, createHmac } from "node:crypto";
import { createContactHandler } from "@/lib/contact";
import { getContactSettings } from "@/lib/contact-settings";

export const runtime = "nodejs";
export const maxDuration = 30;

type MemoryWindow = { count: number; expiresAt: number };
const memoryWindows = new Map<string, MemoryWindow>();

function consumeMemoryWindow(key: string, limit: number, ttlMs: number, now = Date.now()) {
  const existing = memoryWindows.get(key);
  if (!existing || existing.expiresAt <= now) {
    memoryWindows.set(key, { count: 1, expiresAt: now + ttlMs });
    return true;
  }
  existing.count += 1;
  return existing.count <= limit;
}

function pruneMemoryWindows(now = Date.now()) {
  if (memoryWindows.size < 500) return;
  for (const [key, window] of memoryWindows) {
    if (window.expiresAt <= now) memoryWindows.delete(key);
  }
}

export async function POST(request: Request) {
  const settings = getContactSettings();
  return createContactHandler(settings, {
    async limit(req) {
      const address = req.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() || "unknown";
      const key = settings.rateSecret
        ? createHmac("sha256", settings.rateSecret).update(address).digest("hex")
        : createHash("sha256").update(`apm-contact:${address}`).digest("hex");
      if (!settings.rateUrl || !settings.rateToken || !settings.rateSecret) {
        pruneMemoryWindows();
        return consumeMemoryWindow(`short:${key}`, 5, 10 * 60 * 1000) &&
          consumeMemoryWindow("daily", 80, 24 * 60 * 60 * 1000);
      }
      // Atomic fixed windows shared by all function instances; global quota protects the free mail allowance.
      const script = "local a=redis.call('INCR',KEYS[1]); if a==1 then redis.call('EXPIRE',KEYS[1],600) end; local b=redis.call('INCR',KEYS[2]); if b==1 then redis.call('EXPIRE',KEYS[2],86400) end; if a>5 or b>80 then return 0 else return 1 end";
      const result = await fetch(settings.rateUrl!, { method: "POST", headers: { Authorization: `Bearer ${settings.rateToken}`, "Content-Type": "application/json" }, body: JSON.stringify(["EVAL", script, "2", `apm:contact:${key}`, "apm:contact:daily"]), signal: AbortSignal.timeout(4000), cache: "no-store" });
      if (!result.ok) throw new Error("Rate service unavailable");
      const data = await result.json(); if (data.error || ![0,1].includes(data.result)) throw new Error("Invalid rate response");
      return data.result === 1;
    },
    async send(data) {
      const response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${settings.apiKey}`, "Content-Type": "application/json" }, signal: AbortSignal.timeout(10000), body: JSON.stringify({ from: settings.from, to: settings.recipient, reply_to: data.email, subject: "Neue Terminanfrage über die Website", text: [`Name: ${data.firstName} ${data.lastName}`, `E-Mail: ${data.email}`, data.phone ? `Telefon: ${data.phone}` : "", "", "Nachricht:", data.message].join("\n") }) });
      const result = await response.json().catch(() => null) as { id?: string; name?: string; message?: string } | null;
      if (!response.ok) {
        console.error("[contact] Resend rejected email", {
          status: response.status,
          error: result?.name || "unknown_provider_error",
        });
        throw new Error("Mail provider rejected request");
      }
      if (!result?.id) {
        console.error("[contact] Resend response did not include an email id", { status: response.status });
        throw new Error("Mail provider response was incomplete");
      }
      console.info("[contact] Resend accepted email", { emailId: result.id });
    },
  })(request);
}
