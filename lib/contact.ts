export type ContactSettings = { enabled: boolean; apiKey?: string; recipient?: string; from?: string; rateUrl?: string; rateToken?: string; rateSecret?: string };
export type ContactDependencies = { limit: (request: Request) => Promise<boolean>; send: (payload: { firstName: string; lastName: string; email: string; phone: string; message: string }) => Promise<void> };
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const senderPattern = /^(?:[^<>\r\n]{1,100}\s<[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+>|[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+)$/;
const clean = (value: unknown) => typeof value === "string" ? value.trim().replace(/[\u0000-\u001f\u007f]/g, " ") : "";
export function contactReady(settings: ContactSettings) {
  return !!(settings.enabled && settings.apiKey && settings.recipient && emailPattern.test(settings.recipient) && settings.from && senderPattern.test(settings.from) && !settings.from.includes("onboarding@resend.dev") && settings.rateUrl && settings.rateToken && settings.rateSecret);
}
export function createContactHandler(settings: ContactSettings, dependencies: ContactDependencies) {
  return async function POST(request: Request) {
    const reply = (error: string, status: number) => Response.json({ error }, { status, headers: { "Cache-Control": "no-store", ...(status === 429 ? { "Retry-After": "600" } : {}) } });
    const origin = request.headers.get("origin");
    if (!origin || origin !== new URL(request.url).origin) return reply("Diese Anfrage ist nicht erlaubt.", 403);
    if (request.headers.get("content-type")?.split(";", 1)[0].trim().toLowerCase() !== "application/json") return reply("Ungültiges Datenformat.", 415);
    let payload: Record<string, unknown>;
    try {
      const reader = request.body?.getReader();
      if (!reader) return reply("Die Anfrage ist leer.", 400);
      let size = 0; const chunks: Uint8Array[] = [];
      while (true) { const { done, value } = await reader.read(); if (done) break; size += value.byteLength; if (size > 16000) { await reader.cancel(); return reply("Die Nachricht ist zu lang.", 413); } chunks.push(value); }
      const body = new Uint8Array(size); let offset = 0; for (const chunk of chunks) { body.set(chunk, offset); offset += chunk.byteLength; }
      const parsed: unknown = JSON.parse(new TextDecoder().decode(body));
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return reply("Ungültige Anfrage.", 400);
      payload = parsed as Record<string, unknown>;
    } catch { return reply("Die Anfrage konnte nicht gelesen werden.", 400); }
    if (clean(payload.website)) return Response.json({ ok: true });
    const firstName = clean(payload.firstName), lastName = clean(payload.lastName), email = clean(payload.email), phone = clean(payload.phone);
    const message = typeof payload.message === "string" ? payload.message.trim() : "";
    if (!firstName || firstName.length > 80 || !lastName || lastName.length > 80 || !emailPattern.test(email) || email.length > 254 || phone.length > 40 || message.length < 5 || message.length > 4000) return reply("Bitte prüfen Sie Ihre Angaben. Die Nachricht muss 5 bis 4.000 Zeichen enthalten.", 400);
    if (!contactReady(settings)) return reply("Das Formular ist derzeit nicht verfügbar. Bitte rufen Sie an oder schreiben Sie direkt per E-Mail.", 503);
    try { if (!await dependencies.limit(request)) return reply("Zu viele Anfragen. Bitte versuchen Sie es später erneut oder rufen Sie an.", 429); }
    catch { return reply("Das Formular ist vorübergehend nicht verfügbar. Bitte nutzen Sie Telefon oder E-Mail.", 503); }
    try { await dependencies.send({ firstName, lastName, email, phone, message }); }
    catch { return reply("Der Versand konnte nicht bestätigt werden. Bitte prüfen Sie vor einer erneuten Anfrage, ob Sie bereits eine Antwort erhalten haben, oder rufen Sie an.", 502); }
    return Response.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  };
}
