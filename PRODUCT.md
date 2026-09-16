# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Delegated: Next.js App Router, TypeScript, Tailwind CSS, deployed on Vercel. Use Resend behind a server-side route for contact requests so the mail provider and recipient can be configured without exposing credentials.

## Users

Prospective clients in and around Salzburg who are exploring Akupunkt-Massage nach Penzel and want to understand the treatment or contact the practice. Inferred from the existing website and the user's request.

## Product Purpose

Introduce René Aufhauser's APM practice, explain its treatment approach and price, and make it easy for visitors to request an appointment or ask a question. Inferred from the existing site's pages and content.

## Positioning

The practice offers Akupunkt-Massage nach Penzel in Salzburg. Preserve this factual service and location; do not invent treatment outcomes, certifications, testimonials, or medical claims.

## Operating Context

Visitors primarily need to understand what APM is, who provides it, the treatment price and duration, how to reach the practice, and how to submit an enquiry. The existing site lists an appointment as 90 €, usually up to 60 minutes, and provides a Salzburg address, phone number, and practice email.

## Capabilities and Constraints

- Public, responsive marketing website with German-language content.
- Keep the familiar information: Startseite, Über mich, Angebote, Kontakt, and Impressum.
- Reuse the existing site's photographs and brand imagery where available.
- Appointment enquiries should be sent server-side through a configurable email provider. Never expose provider secrets in browser code.
- The temporary contact-form recipient is `create.khanhdo@gmail.com`. It remains configurable through the server-only `CONTACT_TO_EMAIL` environment variable.
- Existing business details and price are source material; verify them with the owner before production launch.

## Brand Commitments

Keep the APM Aufhauser name, René Aufhauser's identity, German language, Salzburg location, and supplied logo and photography. Modernize the web experience without changing the business identity.

## Evidence on Hand

- Existing public source repository: `NoticeMyCat/apm-aufhauser`.
- Homepage, About, Services, Contact, and Impressum source pages.
- Existing factual page content and image references, including practice and treatment photography.
- No verified customer reviews or outcome evidence were established; do not create any.

## Product Principles

- Make treatment information and contact details easy to find.
- Present the practice and treatment clearly without overstating health benefits.
- Make appointment enquiries usable on mobile and accessible by keyboard.
- Keep all email configuration server-side and replaceable.

## Accessibility & Inclusion

Use semantic HTML, visible keyboard focus, readable contrast, descriptive image alternatives, reduced-motion support, and accessible form validation and status messages.
