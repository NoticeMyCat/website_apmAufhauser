import { contactReady } from "./contact";
export function getContactSettings() {
  const emailDomain = process.env.APM_RESEND_EMAIL_DOMAIN ?? "apm-aufhauser.at";
  return { enabled: process.env.CONTACT_FORM_ENABLED !== "false", apiKey: process.env.APM_RESEND_API_KEY ?? process.env.RESEND_API_KEY, recipient: process.env.CONTACT_TO_EMAIL ?? "apm.aufhauser@gmail.com", from: process.env.EMAIL_FROM ?? `APM Aufhauser <kontakt@${emailDomain}>`, rateUrl: process.env.UPSTASH_REDIS_REST_URL, rateToken: process.env.UPSTASH_REDIS_REST_TOKEN, rateSecret: process.env.CONTACT_RATE_SECRET };
}
export const isContactReady = () => contactReady(getContactSettings());
