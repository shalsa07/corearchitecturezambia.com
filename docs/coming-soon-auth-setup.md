# CoreArchitectureZambia — Coming Soon + Auth Setup

This document explains how the Coming Soon landing page, authentication (Auth.js v5), database, and admin dashboard are set up.

## Overview
- App Router (Next.js 15)
- Tailwind CSS v4 (classes used directly in components)
- Auth.js v5 with:
  - Google OAuth provider
  - Email magic link (SMTP via Nodemailer)
  - Database session strategy (sessions stored in MongoDB)
- MongoDB Adapter with a custom `role` field on the user (`user` | `admin`)
- Admin dashboard at `/admin` gated by role-based access control

## Files Added
- `src/auth.js` — central Auth.js config, providers, callbacks, events
- `src/lib/mongodb.js` — MongoDB client with connection caching
- `src/app/api/auth/[...nextauth]/route.js` — API route for Auth.js
- `src/app/page.jsx` — Coming Soon landing page with Google + Magic Link sign-in
- `src/app/admin/page.jsx` — Admin dashboard listing users; admin-only
- `docs/coming-soon-auth-setup.md` — this guide

## Authentication Flow
1. On `/` users can sign in with Google or request a magic link via email.
2. Auth.js uses the MongoDB adapter and Database Session strategy:
   - User and session rows are persisted to MongoDB.
3. Events
   - `createUser`: ensures a `role` is set (`admin` for `victorchelemu@gmail.com`, otherwise `user`).
   - `signIn`: updates `lastLogin` timestamp on every successful sign-in.
4. Session callback augments `session.user` with `id` and `role` for server usage (e.g., gating `/admin`).

## Database Schema (MongoDB Adapter)
Auth.js MongoDB adapter manages collections: `users`, `accounts`, `sessions`, `verificationTokens`.
We extend the default `users` documents with:
- `role: "user" | "admin"` (set in `events.createUser`)
- `lastLogin: Date` (set in `events.signIn`)

No additional manual schema is required; MongoDB is schemaless, but these keys are written by the app.

## Admin Access Setup
- The email `victorchelemu@gmail.com` is automatically set to `role = "admin"` on first creation.
- `/admin` page checks the server session:
  - Not signed in → redirect to `/`
  - Signed in but not admin → redirect to `/`
  - Admin → shows a table of users (name, email, role, last login)

## Environment Variables
Set these in `.env.local`:

- `NEXTAUTH_URL` — e.g. `http://localhost:3001` (must match dev port)
- `NEXTAUTH_SECRET` — random string (e.g. `openssl rand -base64 32`)

- `MONGODB_URI` — full MongoDB connection string
- `MONGODB_DB` — database name (e.g. `corearchitecturezambia`)

- `GOOGLE_CLIENT_ID` — from Google Cloud Console
- `GOOGLE_CLIENT_SECRET` — from Google Cloud Console

- `EMAIL_SERVER_HOST` — SMTP host
- `EMAIL_SERVER_PORT` — SMTP port (typically `587`)
- `EMAIL_SERVER_USER` — SMTP username
- `EMAIL_SERVER_PASSWORD` — SMTP password
- `EMAIL_FROM` — from address (e.g. `no-reply@corearchitecturezambia.com`)

## Configure Google OAuth
1. Go to Google Cloud Console → Credentials → Create OAuth client (Web application).
2. Authorized redirect URIs:
   - `http://localhost:3001/api/auth/callback/google`
   - `<YOUR_PRODUCTION_URL>/api/auth/callback/google`
3. Copy the Client ID/Secret into env vars `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`.

## Configure Magic Link (Email)
Use any SMTP provider (e.g., Gmail SMTP, SendGrid, Mailgun, Resend SMTP, etc.).
Set `EMAIL_SERVER_*` variables and `EMAIL_FROM`.
Auth.js will send the verification link using Nodemailer via SMTP.

## Install Dependencies
Run (requires permission):

```bash
npm install next-auth @auth/mongodb-adapter mongodb nodemailer
```

## Development
- Start dev server on the designated port (3001):

```bash
npm run dev
```

If port 3001 is busy, terminate processes on that port and retry:

```bash
# macOS
lsof -ti:3001 | xargs kill -9 || true
npm run dev
```

## Notes
- Tailwind classes are used directly; no custom config required for v4.
- All components are plain JavaScript `.jsx` files.
- Admin page reads directly from MongoDB; ensure env vars are loaded.

