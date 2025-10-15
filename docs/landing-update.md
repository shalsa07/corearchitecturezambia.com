## Landing Page Update: Inspired by corearchitecturezambia.com

This update redesigns the landing page to better reflect the look and structure of corearchitecturezambia.com while preserving the existing authentication flows (Google OAuth and Email magic link) powered by Auth.js v5.

### What Changed
- Rebuilt `src/app/page.jsx` to include:
  - Fixed top navigation with brand and section links (About, Projects, Services, Contact)
  - Full-bleed hero with background image overlay (optional `/public/hero.jpg`)
  - About section with brief studio overview
  - Featured Projects grid (placeholders)
  - Services grid (key offerings)
  - Dedicated Sign In section with Google and Magic Link forms (re-using existing Auth.js endpoints)
  - Contact footer with placeholders for email/phone
- Maintained TailwindCSS styling throughout. No TypeScript, JSX only.
- Kept Auth.js v5 configuration and API routes unchanged (Google + Email providers already configured).

### Auth UI Details
- Google sign-in: form POSTs to `/api/auth/signin/google` with `callbackUrl=/`.
- Magic link: form POSTs to `/api/auth/signin/email` with `callbackUrl=/` and an email input.
- A "Sign in" button is available in the top nav and in the hero CTA, both anchoring to the Sign In section.

### Files Touched
- Modified: `src/app/page.jsx`
- New doc: `docs/landing-update.md` (this file)

### Prerequisites / Environment
- Ensure Auth.js env vars are set in `.env.local`:
  - NEXTAUTH_URL, NEXTAUTH_SECRET
  - GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
  - EMAIL_SERVER_HOST, EMAIL_SERVER_PORT, EMAIL_SERVER_USER, EMAIL_SERVER_PASSWORD, EMAIL_FROM
  - MONGODB_URI, MONGODB_DB

### Development Notes
- Dev server: `npm run dev` (port 3001 as defined in package.json)
- If port 3001 is busy on macOS: `lsof -ti:3001 | xargs kill -9 || true` then re-run `npm run dev`.
- Optional: place a hero image at `/public/hero.jpg` for richer visuals.

### Commit Message (Summary)
Landing: redesign inspired by corearchitecturezambia.com; add clear sign-in UI (Google + magic link), improve structure and sections

- Rebuilt landing page layout with hero, about, projects, services, and contact
- Embedded Auth UI: Google OAuth and Email magic link forms
- Tailwind styling; JSX only; no TS changes
- Preserved existing Auth.js v5 setup (MongoDB adapter, email+google providers)


