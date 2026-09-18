# Security audit

Date: 18 September 2026
Scope: the current application, its production deployment, dependency manifest, public Git repository, and contact endpoint.

## Executive summary

No exposed API keys, private keys, credentials, or known vulnerable dependencies were found. GitHub secret scanning and push protection are enabled and report no alerts. The production platform already enforces HTTPS with HSTS.

The review found five application or repository hardening opportunities and one privacy-documentation mismatch. All were addressed in the current change set. This was a focused source, configuration, dependency, and HTTP-behaviour audit; it is not a substitute for a full third-party penetration test or legal review.

## Verification performed

- Scanned tracked files, the working tree, and Git history for common high-confidence secret formats and private-key material.
- Reviewed user-input paths and browser/server security sinks, including the contact endpoint and JSON-LD rendering.
- Ran `pnpm audit --audit-level low`; no known vulnerabilities were reported.
- Ran linting, type checking, and the contact endpoint test suite.
- Checked production crawler responses with normal, Googlebot, Bingbot, and GPTBot user agents.
- Checked GitHub repository visibility and security settings. The repository is public; secret scanning and push protection are enabled and there are no current secret alerts.

## Findings

### SEC-001 — Indexing could be disabled by deployment configuration

- Severity: Medium
- Status: Resolved
- Location: `app/layout.tsx:10-16`, `app/robots.ts:4-9`
- Evidence: crawler directives previously depended on an environment switch, which allowed a production environment value to emit `noindex`, `nofollow`, and a blocked `robots.txt`.
- Impact: search engines could be prevented from indexing every public page.
- Fix: public metadata now always emits `index, follow`; `robots.txt` always allows `/` and advertises the canonical sitemap and host. The deployment-variable switch and conditional `X-Robots-Tag` were removed.
- False-positive notes: current production responses were already indexable when re-tested, indicating the reported Lighthouse result was stale or from an earlier deployment. The code change prevents recurrence.

### SEC-002 — Missing defence-in-depth browser headers

- Severity: Medium
- Status: Resolved
- Location: `next.config.ts:3-40`
- Evidence: production had HSTS, MIME sniffing protection, referrer policy, and a permissions policy, but no application Content Security Policy or explicit framing policy.
- Impact: a future injection or unsafe content change would have fewer browser-enforced containment controls; the site could also be framed by another origin.
- Fix: added a production CSP, denied framing, restricted objects, forms, frames, connections, and base URLs, and added compatible browser hardening headers. Google Maps remains the only permitted frame origin.
- Mitigation notes: Next.js requires inline bootstrap scripts for this statically rendered application, so the production `script-src` retains `'unsafe-inline'`. It does not permit `'unsafe-eval'`; that token is development-only. A nonce-based CSP would require dynamic rendering and is not warranted for this static site at present.

### SEC-003 — Contact endpoint request validation could be stricter

- Severity: Low
- Status: Resolved
- Location: `lib/contact.ts:9-35`, `tests/contact.test.mjs`
- Evidence: the endpoint accepted requests without an `Origin` header and used a prefix check for JSON content types.
- Impact: non-browser clients had an easier path to exercise the endpoint, and lookalike media types such as `application/jsonp` could pass the initial check.
- Fix: require an exact same-origin `Origin` value and parse the media type exactly as `application/json`. Added regression tests for missing origins and lookalike content types.
- Existing controls: 16 KB body cap, strict field lengths, honeypot, rate limiting, pseudonymized IP keys, fixed recipient, provider timeouts, and fail-closed configuration.

### SEC-004 — Public-repository hygiene

- Severity: Low
- Status: Resolved for the current tree
- Location: `.gitignore`, `.env.example`, `README.md`, `PRODUCT.md`, `docs/LAUNCH.md`
- Evidence: a personal test email address and review/build scratch artifacts were tracked; unused styling and email SDK packages increased the dependency surface.
- Impact: unnecessary personal data and internal artifacts were publicly visible, and unused dependencies created avoidable maintenance surface.
- Fix: replaced the example recipient with `praxis@example.com`, documented that production recipients belong only in private deployment variables, ignored and removed scratch artifacts, and removed unused packages.
- History note: the personal test email remains in an early Git commit. It is not a credential or secret. Rewriting public Git history would require a disruptive force-push and was intentionally not performed.

### SEC-005 — Dependency updates were not automated in the repository

- Severity: Low
- Status: Resolved
- Location: `.github/dependabot.yml`
- Evidence: there was no Dependabot update configuration.
- Impact: a future vulnerable dependency could remain unnoticed until a manual review.
- Fix: added weekly grouped Dependabot updates. GitHub secret scanning and push protection are enabled, and automated security fixes are enabled for vulnerable dependencies.

### SEC-006 — Google Maps privacy text did not match runtime behaviour

- Severity: Informational
- Status: Resolved factually; legal review recommended
- Location: `app/datenschutz/page.tsx:18`, `components/practice-map.tsx`
- Evidence: the privacy page described a consent gate and hide control, while the contact page embedded the map directly.
- Impact: visitors received inaccurate information about when a request to Google occurs.
- Fix: updated the text to state that visiting the contact page connects to Google, and renamed the component to reflect its actual behaviour.
- Mitigation notes: whether a directly embedded map is appropriate under Austrian and EU privacy law is a legal/compliance decision. The site owner should have the final wording and legal basis reviewed by qualified counsel.

## Residual recommendations

- Keep production secrets only in Vercel environment variables and rotate any value if GitHub or Vercel ever reports an exposure.
- Review Dependabot and security-workflow results regularly.
- Re-run this audit after adding analytics, third-party scripts, authentication, file uploads, payments, or a database because those changes materially alter the threat model.
