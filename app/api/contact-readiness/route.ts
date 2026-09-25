import { connection } from "next/server";
import { getContactSettings } from "@/lib/contact-settings";

export async function GET() {
  await connection();
  const settings = getContactSettings();
  return Response.json({
    enabled: settings.enabled,
    apiKeyPresent: Boolean(settings.apiKey),
    recipientPresent: Boolean(settings.recipient),
    senderPresent: Boolean(settings.from),
    senderIsOnboarding: settings.from?.includes("onboarding@resend.dev") ?? false,
  }, { headers: { "Cache-Control": "no-store" } });
}
