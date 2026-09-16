import { createHmac } from "node:crypto";
import { createContactHandler } from "@/lib/contact";
import { getContactSettings } from "@/lib/contact-settings";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(request: Request) {
  const settings = getContactSettings();
  return createContactHandler(settings, {
    async limit(req) {
      const address = req.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() || "unknown";
      const key = createHmac("sha256", settings.rateSecret!).update(address).digest("hex");
      // Atomic fixed windows shared by all function instances; global quota protects the free mail allowance.
      const script = "local a=redis.call('INCR',KEYS[1]); if a==1 then redis.call('EXPIRE',KEYS[1],600) end; local b=redis.call('INCR',KEYS[2]); if b==1 then redis.call('EXPIRE',KEYS[2],86400) end; if a>5 or b>80 then return 0 else return 1 end";
      const result = await fetch(settings.rateUrl!, { method: "POST", headers: { Authorization: `Bearer ${settings.rateToken}`, "Content-Type": "application/json" }, body: JSON.stringify(["EVAL", script, "2", `apm:contact:${key}`, "apm:contact:daily"]), signal: AbortSignal.timeout(4000), cache: "no-store" });
      if (!result.ok) throw new Error("Rate service unavailable");
      const data = await result.json(); if (data.error || ![0,1].includes(data.result)) throw new Error("Invalid rate response");
      return data.result === 1;
    },
    async send(data) {
      const response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${settings.apiKey}`, "Content-Type": "application/json" }, signal: AbortSignal.timeout(10000), body: JSON.stringify({ from: settings.from, to: settings.recipient, reply_to: data.email, subject: "Neue Terminanfrage über die Website", text: [`Name: ${data.firstName} ${data.lastName}`, `E-Mail: ${data.email}`, data.phone ? `Telefon: ${data.phone}` : "", "", "Nachricht:", data.message].join("\n") }) });
      if (!response.ok) throw new Error("Mail provider rejected request");
    },
  })(request);
}
