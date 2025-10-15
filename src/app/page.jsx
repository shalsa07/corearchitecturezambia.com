// Landing page inspired by corearchitecturezambia.com with embedded Auth (Google + Magic Link)
export default function Home() {
  const projects=[
    { name: "Project 1", image: "/0001.png" },
    { name: "Project 2", image: "/0002.png" },
    { name: "Project 3", image: "/0003.png" },
    { name: "Project 4", image: "/0004.png" },
  ]
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Top Navigation */}
      <header className="fixed inset-x-0 top-0 z-20 border-b border-white/10 bg-black/60 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <a href="#" className="flex items-center gap-2">
            <span className="inline-block h-6 w-6 rounded-sm bg-emerald-500" aria-hidden />
            <span className="text-sm font-semibold tracking-wide">Core Architecture Zambia</span>
          </a>
          <nav className="hidden items-center gap-6 text-sm text-white/70 sm:flex">
            <a href="#about" className="hover:text-white">About</a>
            <a href="#projects" className="hover:text-white">Projects</a>
            <a href="#services" className="hover:text-white">Services</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </nav>
          <div className="flex items-center gap-2">
            <a href="#signin" className="rounded-md bg-white/10 px-3 py-1.5 text-sm hover:bg-white/20">Sign in</a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black" />
        {/* Optional background image in /public/hero.jpg */}
        <div
          className="absolute inset-0 bg-center bg-cover opacity-35"
          style={{ backgroundImage: "url('/0001.png')" }}
          aria-hidden
        />

        <div className="relative z-10 mx-auto w-full max-w-4xl px-6 pt-24 text-center">
          <h1 className="mb-4 text-4xl font-semibold tracking-tight sm:text-6xl">
            Designing Transformative Spaces in Zambia
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-white/70">
            We deliver architecture with integrity and impact — thoughtful design for homes,
            workplaces, hospitality and civic spaces.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <a href="#projects" className="rounded-md bg-white px-5 py-2 text-black hover:bg-white/90">View Projects</a>
            <a href="#signin" className="rounded-md bg-emerald-500 px-5 py-2 text-black hover:bg-emerald-400">Get Started</a>
          </div>
        </div>

        {/* Subtle bottom accent */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black" />
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid items-start gap-10 md:grid-cols-2">
          <div>
            <h2 className="mb-3 text-2xl font-semibold">About Us</h2>
            <p className="text-white/70">
              Core Architecture Zambia is an architecture practice focused on context-driven
              solutions, sustainability and craftsmanship. Our work spans residential,
              commercial and civic projects across Zambia.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="h-28 rounded-md bg-white/5" />
            <div className="h-28 rounded-md bg-white/5" />
            <div className="h-28 rounded-md bg-white/5" />
            <div className="h-28 rounded-md bg-white/5" />
            <div className="h-28 rounded-md bg-white/5" />
            <div className="h-28 rounded-md bg-white/5" />
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="projects" className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-semibold">Selected Work</h2>
          <a href="#contact" className="text-sm text-white/60 hover:text-white">Start a project →</a>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <div key={p.name} className="group overflow-hidden rounded-lg border border-white/10 bg-white/5">
              <div className="aspect-[4/3] bg-gradient-to-br from-white/10 to-white/0" style={{ backgroundImage: `url(${p.image})` }} />
              <div className="p-3">
                <p className="text-sm font-medium">{p.name}</p>
                <p className="text-xs text-white/60">Lusaka, Zambia</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-6 text-2xl font-semibold">Services</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { t: "Architecture", d: "Concept to completion" },
            { t: "Interior Design", d: "Human-centered, timeless" },
            { t: "Masterplanning", d: "Site strategy and phasing" },
            { t: "Sustainability", d: "Passive and active systems" },
            { t: "Project Management", d: "Coordination and delivery" },
            { t: "Consulting", d: "Feasibility and advisory" },
          ].map((s) => (
            <div key={s.t} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="mb-1 font-medium">{s.t}</p>
              <p className="text-sm text-white/70">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sign in / Get started */}
      <section id="signin" className="relative mx-auto max-w-xl px-6 py-16">
        <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-white/0 blur-2xl" aria-hidden />
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 shadow-xl">
          <h2 className="mb-2 text-center text-xl font-semibold">Sign in to continue</h2>
          <p className="mb-6 text-center text-sm text-white/60">Use Google or get a magic link to your email.</p>

          <div className="space-y-4">
            {/* Google OAuth via Auth.js route */}
            <form action="/api/auth/signin/google" method="post">
              <input type="hidden" name="callbackUrl" value="/" />
              <button
                type="submit"
                className="w-full rounded-md bg-white px-4 py-2 font-medium text-black hover:bg-white/90"
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

            <p className="text-center text-xs text-white/50">
              We’ll email you a secure sign-in link. No password required.
            </p>
          </div>
        </div>
      </section>

      {/* Contact / Footer */}
      <footer id="contact" className="border-t border-white/10 bg-black/60">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid gap-6 sm:grid-cols-3">
            <div>
              <p className="text-sm font-semibold">Core Architecture Zambia</p>
              <p className="text-sm text-white/60">Lusaka, Zambia</p>
            </div>
            <div className="text-sm text-white/60">
              <p>Email: info@corearchitecturezambia.com</p>
              <p>Phone: +260 000 000 000</p>
            </div>
            <div className="text-sm text-white/60">
              <p>© {new Date().getFullYear()} Core Architecture Zambia</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
