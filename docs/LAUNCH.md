# Deployment and launch handoff

16 September 2026. Review preview only; business launch is not certified ready.

## What remains before launch

1. Owner reviews CONTENT-REVIEW.md, especially the altered health claims and proposed first-person practice copy. Verify third-party press links and rights. Confirm the original supplied business facts remain current and resolve applicable professional/register/ADR details.
2. Verify hosting subscription permits commercial use. Vercel Hobby is for non-commercial personal use. No upgrade or purchase has been made. Existing team eligibility has not yet been verified.
3. Configure email and shared rate-limit credentials. Nothing has been sent to a real recipient. The current contact page offers mail/telephone because sending is disabled.
4. Confirm Gmail account type and processor/transfer arrangements, Vercel/Resend/Upstash contracts and regions, provider retention settings, actual mailbox deletion practice and applicable Article 9 handling. Current privacy page is a review draft; it must match actual account arrangements before launch.
5. Review AI-assisted health/public-interest text substantively and record editorial responsibility. No chatbot, synthetic portrait or enquiry-to-AI processing exists. CSS motion does not introduce visitor AI interaction. Article 50 has applied since 2 August 2026; assess disclosure obligations for actual use instead of adding a compliance badge.
6. Confirm custom domain migration and enable SITE_INDEXABLE only for the final domain. Set NEXT_PUBLIC_SITE_URL to its canonical URL and rebuild. No DNS changes made.

## Email configuration

Resend can send to Gmail; Gmail is the destination, not a spoofed sender. Set a sender on a domain you control and have verified in Resend. Never put the visitor's address in From; code uses Reply-To.

Server-only variables in .env.example:
- RESEND_API_KEY: restricted sending key.
- EMAIL_FROM: verified sender, e.g. APM Aufhauser <termine@your-verified-domain>.
- CONTACT_TO_EMAIL: create.khanhdo@gmail.com for approved testing; apm.aufhauser@gmail.com when owner confirms production routing.
- UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN: persistent account-owned database; choose a permitted region and free plan if eligible.
- CONTACT_RATE_SECRET: random secret for HMAC pseudonymisation; generate securely, do not publish.
- CONTACT_FORM_ENABLED=true only when all values, provider contracts and delivery workflow are verified.

Rebuild after changing enable/configuration variables because the contact/privacy pages are statically rendered. Missing credentials fail closed at the endpoint. Provider errors are reported without logging form contents.

Bounds: 16 KiB actual request body, field length checks, honeypot, atomic per-IP 5 attempts/10 minutes and global 80 attempts/24-hour fixed window. Counters expire; shared across serverless instances. Rate-service timeout 4 seconds; sending timeout 10 seconds. Shared service outage prevents send. The global limit counts attempts, including denied IP requests; deliberate abuse may exhaust it (email/phone fallback remains available). This is abuse reduction, not complete bot prevention.

Disable Resend open/click tracking in provider settings. Check existing DNS before applying exact Resend DKIM/SPF records; do not replace unrelated mail records. Assess DMARC alignment. Provider acceptance is not proof of inbox delivery. Get explicit permission for a real test, then check recipient, reply routing, spam placement and duplicate behaviour. No automatic retries after ambiguous send timeouts.

Free-tier information checked 16 September 2026: Resend lists a free tier; Upstash lists 500K Redis commands/month free. Confirm account eligibility and avoid automatic paid upgrades. Hosting costs are separate. No new service/account was provisioned.

## Sources and legal review scope

- https://resend.com/pricing
- https://upstash.com/pricing/redis
- https://vercel.com/docs/plans/hobby
- https://www.wko.at/internetrecht/website-impressum
- https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng
- https://dsb.gv.at/faqs/datenschutz-cookies
- https://digital-strategy.ec.europa.eu/en/policies/guidelines-ai-transparency-obligations

Preserve rollback deployment dpl_3KudBvDsUsmy6ksny9z2tkw8Voer before any production promotion. Git is unavailable on this machine due to the Xcode licence condition; no commit/push claimed.
