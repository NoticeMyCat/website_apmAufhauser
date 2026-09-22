# Go-live audit — 2026-09-22

## Executive summary

Status: good to go live after deploying the current working tree.

The site passed lint, tests, production build, dependency audit, runtime header checks, DNS checks, Resend DNS checks, and a responsive browser pass across mobile, tablet, and desktop widths. No exposed high-confidence secrets or vulnerable dependencies were found in tracked files. The main corrective changes from this audit were legal/privacy copy updates for Resend and larger tap targets for primary text links and footer contact links.

This is a technical/design/security audit, not formal legal advice. Impressum and Datenschutz should still be reviewed by the business owner or legal counsel before final launch.

## Audit health score

| # | Dimension | Score | Key finding |
|---|---:|---:|---|
| 1 | Accessibility | 3/4 | Good semantics, labels, focus styling and skip link; tap targets improved during audit. |
| 2 | Performance | 3/4 | Static pages, optimized Next images, no dependency vulnerabilities; some large source images remain but are transformed by Next. |
| 3 | Responsive design | 4/4 | No horizontal overflow found at 360, 390, 768, or 1440px test widths. |
| 4 | Security / vulnerability | 3/4 | Strong security headers and hardened contact endpoint; CSP still allows inline script/style because of the current Next/static styling setup. |
| 5 | Connection / launch readiness | 4/4 | Domain, sitemap/robots, Google Maps iframe, Resend DNS, and contact endpoint checks are healthy. |
| **Total** |  | **17/20** | **Good / launch-ready with minor hardening follow-ups.** |

## What changed in this audit

1. Updated Datenschutz to describe contact-form delivery through Resend, including the provider, categories of processed data, possible third-country transfer, DPA/subprocessor references, and the actual fallback rate-limit behavior.
   - Location: `app/datenschutz/page.tsx:12-20`
2. Updated Impressum to use the requested responsibility wording and link Datenschutz explicitly to contact form and Resend email delivery.
   - Location: `app/impressum/page.tsx:11-18`
3. Improved touch targets for important text links and footer contact links.
   - Location: `app/globals.css:54`, `app/globals.css:174`

## Verification performed

### Build and tests

- `pnpm lint` passed.
- `pnpm test` passed: 12/12 contact-form security/validation tests.
- `pnpm build` passed with Next.js 16.3.5.
- `pnpm audit --audit-level=moderate` found no known vulnerabilities.
- `pnpm outdated` shows package updates available, but no moderate-or-higher vulnerabilities were reported.

### Runtime and connection checks

- `https://apm-aufhauser.at/` returned HTTP 200 when routed to Vercel.
- `https://apm-aufhauser.at/kontakt` returned HTTP 200 when routed to Vercel.
- Production security headers include CSP, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `Cross-Origin-Opener-Policy`, and HSTS from Vercel.
- `robots.txt` allows crawling and references the sitemap.
- `sitemap.xml` is available and uses the canonical `https://apm-aufhauser.at` URLs.
- Resend DNS records are visible through public DNS:
  - DKIM TXT at `resend._domainkey.apm-aufhauser.at`
  - SPF TXT at `send.apm-aufhauser.at`
  - MX at `send.apm-aufhauser.at`
  - DMARC TXT at `_dmarc.apm-aufhauser.at`

### Browser / responsive pass

Checked `/`, `/angebote`, `/ueber-mich`, `/kontakt`, `/datenschutz`, and `/impressum` in the in-app browser at representative widths:

- 360×640
- 390×844
- 768×1024
- 1440×900

Observed results:

- No horizontal overflow.
- Exactly one viewport meta tag.
- No console errors or warnings in the checked pass.
- Navigation active states were present on main pages.
- Contact form labels were present.
- Google Maps iframe was present on `/kontakt`.
- Datenschutz and Impressum render without overflow on mobile and desktop.

## Security and vulnerability findings

### Positive findings

- No tracked `.env` file; `.env.local` is ignored by `.gitignore`.
- No high-confidence API keys, private keys, passwords, or token patterns found in tracked files or obvious history filenames.
- Contact form rejects missing origins, cross-origin requests, wrong content types, oversized bodies, invalid payloads, honeypot submissions, rate-limit failures, and provider failures.
- Contact endpoint keeps provider secrets server-side in env vars only.
- Contact endpoint uses timeouts for Resend and optional external rate limiting.
- Security headers are configured globally in `next.config.ts:19-40`.
- No dependency vulnerabilities at moderate level or above.

### Remaining low-priority issues

#### SEC-1: CSP still uses `unsafe-inline`

- Severity: Low for this small static site; higher if user-generated HTML or third-party scripts are later added.
- Location: `next.config.ts:4-17`
- Evidence: `script-src 'self' 'unsafe-inline'` and `style-src 'self' 'unsafe-inline'`.
- Impact: A stricter nonce/hash CSP would reduce XSS blast radius.
- Current mitigation: No `unsafe-eval` in production; no third-party scripts; React renders normal text safely; structured JSON-LD escapes `<`.
- Recommendation: Keep as-is for launch unless Lighthouse/security tooling requires stricter CSP. Moving to nonce-based CSP may force more dynamic rendering and should be planned deliberately.

#### SEC-2: Fallback rate limiting is per function instance

- Severity: Low/Medium.
- Location: `app/api/contact/route.ts:31-46`
- Evidence: fallback uses an in-memory `Map` when Upstash vars are absent.
- Impact: On serverless infrastructure, in-memory limits are not globally shared across regions/instances.
- Current mitigation: Validation, honeypot, origin checks, global per-instance daily limit, Resend provider limits.
- Recommendation: For stronger abuse resistance, add a small managed rate store such as Upstash and set `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`.

#### SEC-3: DMARC policy is monitor-only

- Severity: Low.
- Evidence: `_dmarc.apm-aufhauser.at` currently returns `v=DMARC1; p=none;`.
- Impact: It monitors domain authentication but does not instruct receivers to quarantine/reject spoofed mail.
- Recommendation: Leave `p=none` during initial launch, then move to `quarantine` and later `reject` after confirming real mail flow.

## Design and responsive findings

### Positive findings

- The site has a coherent warm ivory / mauve / charcoal visual system.
- Typography is self-hosted, avoiding Google Fonts requests.
- Key pages are readable on narrow mobile widths.
- Contact page map and form are compact and stable.
- Angebote images preserve focal areas better than previous overlapping/cropped versions.
- Mobile footer remains centered with legal links grouped.

### Remaining polish items

#### UX-1: Legal inline links remain naturally text-sized

- Severity: Low.
- Evidence: paragraph links in Datenschutz/Impressum are inline text links.
- Impact: This is normal for legal copy, but inline links are smaller than dedicated touch targets.
- Recommendation: Keep as-is unless mobile usability testing shows missed taps; turning every paragraph link into a block target would reduce reading quality.

#### UX-2: Some image source files are large

- Severity: Low.
- Evidence: source photos are high-resolution; Next transforms requested delivery sizes.
- Impact: Build/deploy storage and first image optimization can be heavier than necessary.
- Recommendation: If future Lighthouse still flags image delivery, create pre-cropped/downsized source variants for the largest visual compositions instead of relying only on runtime transforms.

## Legal/privacy findings

### Fixed

- Datenschutz now includes Resend email delivery details and no longer incorrectly claims Upstash is used when the live fallback is in-memory.
- Datenschutz now points to Resend privacy, DPA, and subprocessor pages.
- Impressum points readers to Datenschutz for contact form and email delivery processing.

### Note

Because this is an Austrian/German-language practice website with healthcare-adjacent contact requests, final legal review is recommended before launch. The implementation now avoids asking for medical details and the privacy copy asks users not to send diagnoses, findings, or other health documents.

## Recommended next actions

1. Deploy the current changes to Vercel.
2. After deployment, run one live Lighthouse check on `https://apm-aufhauser.at/` and `https://apm-aufhauser.at/kontakt`.
3. Confirm that the test contact email arrives in the intended Gmail inbox.
4. After a few days of successful mail delivery, consider moving DMARC from `p=none` to a stricter policy.
