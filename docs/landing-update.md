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



### Auth.js (NextAuth) v5 Upgrade Note
- Target: move from v4 to v5 helper APIs (`auth`, `handlers`, `signIn`, `signOut`).
- Action taken now: Implemented a v4-compatible shim in `src/auth.js` that exports `handlers` and an `auth()` helper compatible with Server Components, plus kept Email + Google providers and MongoDB adapter. This resolves the runtime error without breaking flows.
- Pending explicit v5 install: The registry/dist-tag for `next-auth@beta` was not applied locally (node_modules resolved to 4.24.11). When feasible, perform a clean install to pin v5:
  1. Stop dev: `lsof -ti:3001 | xargs kill -9 || true`
  2. Remove cache/lock and modules: `rm -rf node_modules package-lock.json && npm cache clean --force`
  3. Install v5 beta: `npm install next-auth@beta --save`
  4. Install deps: `npm install`
  5. Verify: open `node_modules/next-auth/package.json` and ensure version starts with `5.`
  6. Optionally switch `src/auth.js` back to native v5 export style:
     - `export const { handlers, auth, signIn, signOut } = NextAuth({ ... })`
- Current state: App functions with the shim; sign-in via Google and magic link works; /admin uses `await auth()` safely.

### Commit Message (Auth v5 upgrade work)
Auth: add v4-compatible shim for `auth()` and route `handlers`; prep path for NextAuth v5 upgrade

- Fix runtime: remove “auth is not a function” in Server Components
- Keep Email + Google providers and MongoDB adapter
- Update Admin sign-out to POST `/api/auth/signout` for v4 compatibility
- Document upgrade path and verification steps
