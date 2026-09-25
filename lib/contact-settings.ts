import { contactReady } from "./contact";
export function getContactSettings() {
  return { enabled: process.env.CONTACT_FORM_ENABLED !== "false", apiKey: process.env.APM_RESEND_API_KEY ?? process.env.RESEND_API_KEY, recipient: process.env.CONTACT_TO_EMAIL, from: process.env.EMAIL_FROM, rateUrl: process.env.UPSTASH_REDIS_REST_URL, rateToken: process.env.UPSTASH_REDIS_REST_TOKEN, rateSecret: process.env.CONTACT_RATE_SECRET };
}
export const isContactReady = () => contactReady(getContactSettings());
