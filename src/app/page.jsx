// Coming Soon landing page with Auth (Google + Magic Link)
export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
        {/* Optional background image: place /public/hero.jpg if you have one */}
        <div
          className="absolute inset-0 bg-center bg-cover opacity-40"
          style={{ backgroundImage: "url('/hero.jpg')" }}
          aria-hidden
        />

        <div className="relative z-10 mx-auto w-full max-w-3xl px-6 text-center">
          <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight mb-4">
            Launching Soon
          </h1>
          <p className="text-white/70 mb-8">
            Core Architecture Zambia — transforming spaces. Sign up to get notified and
            access early updates.
          </p>

          {/* Auth Actions */}
          <div className="mx-auto max-w-md space-y-4">
            {/* Google OAuth via Auth.js route */}
            <form action="/api/auth/signin/google" method="post">
              <input type="hidden" name="callbackUrl" value="/" />
              <button
                type="submit"
                className="w-full rounded-md bg-white text-black px-4 py-2 font-medium hover:bg-white/90"
              >
                Continue with Google
              </button>
            </form>

            <div className="relative text-center">
              <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-white/40 text-xs">or</span>
              <div className="h-0.5 bg-white/10" />
            </div>

            {/* Magic link via Auth.js email route */}
            <form action="/api/auth/signin/email" method="post" className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto]">
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email for a magic link"
                className="w-full rounded-md bg-white/10 px-4 py-2 placeholder-white/50 outline-none ring-1 ring-white/10 focus:ring-white/30"
              />
              <input type="hidden" name="callbackUrl" value="/" />
              <button
                type="submit"
                className="rounded-md bg-emerald-500 px-4 py-2 font-medium text-black hover:bg-emerald-400"
              >
                Send Link
              </button>
            </form>

            <p className="text-xs text-white/50">
              We’ll email you a secure sign-in link. No password required.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-6 left-0 right-0 text-center text-sm text-white/50">
          © {new Date().getFullYear()} Core Architecture Zambia
        </div>
      </section>
    </main>
  );
}

