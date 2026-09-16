# APM Aufhauser website

A responsive German-language practice website based on the existing APM Aufhauser site. Built with Next.js App Router, React, TypeScript, Tailwind CSS 4, and designed for Vercel.

## Run locally

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Contact email setup

The contact form sends from a Next.js Route Handler through Resend. It does not store submissions in a database and never sends the API key to the browser.

1. Create a Resend API key and set `RESEND_API_KEY` in `.env.local`.
2. `CONTACT_TO_EMAIL` is set to the temporary recipient `create.khanhdo@gmail.com`.
3. For Resend testing, `EMAIL_FROM` defaults to `APM Aufhauser <onboarding@resend.dev>`. Verify the practice's sending domain with Resend before switching to an address on that domain.
4. Add the same variables in Vercel project settings for each environment. Use a verified sender for production.

The form returns a friendly unavailable state until both the API key and a valid recipient are configured.

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
pnpm build
```
