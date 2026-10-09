# APM Aufhauser website

A responsive German-language practice website based on the existing APM Aufhauser site. Built with Next.js App Router, React, TypeScript, and CSS, and designed for Vercel.

## Run locally

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Contact email setup

The contact form sends from a Next.js Route Handler through Resend. It does not store submissions in a database and never sends the API key to the browser.

1. Create a Resend API key and set `RESEND_API_KEY` in `.env.local`. The integration-provided `APM_RESEND_API_KEY` takes precedence when present.
2. Set `CONTACT_TO_EMAIL` to the recipient address in the deployment environment. If omitted, the site's public practice email is used.
3. Set `EMAIL_FROM` to an address on a verified Resend domain. It defaults to `APM Aufhauser <kontakt@apm-aufhauser.at>`; `APM_RESEND_EMAIL_DOMAIN` can override that default domain. The Resend onboarding sender is intentionally rejected.
4. Set `CONTACT_FORM_ENABLED=true` to enable delivery when using the example environment file, and configure the same variables in Vercel for each environment.

Without valid delivery settings, the form opens an email draft in the visitor's email app; the API returns an unavailable response. Configuration validation does not verify API-key permissions or the domain's status with Resend.

For shared rate limiting across deployed instances, configure `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, and `CONTACT_RATE_SECRET`. Otherwise the limiter runs in memory per server instance.

## Routes

- `/` home
- `/angebote` treatment information and price
- `/ueber-mich` therapist profile
- `/kontakt` contact details and enquiry form
- `/impressum` provider details from the existing site
- `/datenschutz` current form data-flow summary and a pre-launch reminder to complete the full privacy notice

## Before production

- Confirm the email recipient, Resend API key, and verified sender domain.
- Review the source business details, price, and duration for accuracy.
- Complete and review the privacy notice and legal provider details before publishing.
- Set `NEXT_PUBLIC_SITE_URL` to the final public site URL.

## Checks

```bash
pnpm lint
pnpm test
pnpm build
```

The tests exercise validation and the actual route's Resend request and error handling with all network calls mocked. They never send email and cannot prove production credentials or inbox delivery.
