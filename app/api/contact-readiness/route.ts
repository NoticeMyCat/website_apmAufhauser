import { getContactSettings } from "@/lib/contact-settings";

export const runtime = "nodejs";

export function GET() {
  const settings = getContactSettings();
  return Response.json({
    enabled: settings.enabled,
    apiKeyPresent: Boolean(settings.apiKey),
    recipientPresent: Boolean(settings.recipient),
    senderPresent: Boolean(settings.from),
  }, { headers: { "Cache-Control": "no-store" } });
}
