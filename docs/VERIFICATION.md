# Verification — 16 September 2026

## Passed

- Production Next.js build, TypeScript and ESLint; final build has no warning from icon rendering.
- Nine Node tests for contact request bounds, invalid payload, origin restriction, disabled configuration, rate denial, limiter failure, provider failure, honeypot and fixed recipient control.
- Impeccable detector: [] (no findings). This is not accessibility certification.
- Browser: desktop hero in dark mode; mobile hero in light and dark; contact, biography and Angebote desktop layouts reviewed. Opaque original-logo tile found and fixed using the actual transparent source asset. Confirmed clean header in light/mobile and dark/desktop.
- Heading geometry: one line at 320×640, 360×640, 390×844, 768×1024, 844×390, 1024×768, 1440×900, 1920×1080 in the in-app browser. No document horizontal overflow at these sizes.
- Theme selection survives navigation/reload. Mobile navigation Escape closes and restores focus to its trigger. Current navigation marked with aria-current.
- Contact map DOM: zero iframes before consent; one after load; zero after withdrawal; focus returns to Anfahrt. Code inspection: iframe source only mounted after explicit consent, no Google preconnect. Network-level third-party audit not completed.
- Preview Vercel build READY: dpl_4KUBmRM3e3fXG6aBgRNuoPfpyams; production alias not promoted.

## Evidence limits / remaining checks

- In-app browser only; Firefox, standalone WebKit and real iOS Safari not verified. No claim of all-browser coverage.
- Full 200% text enlargement / 400% browser zoom and screen-reader testing remain. 320px layout is tested but is not a substitute for these tests.
- Reduced motion is implemented in CSS; OS preference simulation not run. No autoplay or scrolling animation engine.
- No field Core Web Vitals evidence or Lighthouse score claimed.
- Endpoint dependency tests use mocks. No live Resend/Redis integration or actual Gmail receipt test performed; missing credentials prevent delivery. Form browser states require configured test environment; current visitor fallback is verified.
- Favicon/Apple icon generated and production-built; real device homescreen rendering remains unverified.
- Preview browser redirects to Vercel access protection for the currently signed-in account. Team-authorised CLI verification used separately. Local production build available at http://localhost:3001/ for review.

Sources, editorial comparisons and launch gates are in CONTENT-REVIEW.md and LAUNCH.md. The website is not represented as legally or WCAG certified.
