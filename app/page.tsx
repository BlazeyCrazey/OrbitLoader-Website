import Image from "next/image";

function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#08060d]/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">
        <a href="/" className="flex items-center gap-3">
          <Image src="/icon.png" alt="Orbit Loader" width={32} height={32} className="rounded-lg" />
          <span className="text-lg font-bold text-white tracking-tight">Orbit Loader</span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="#astrosync" className="hover:text-white transition">AstroSync</a>
          <a href="#download" className="hover:text-white transition">Download</a>
        </div>
        <div className="flex items-center gap-3">
          <a href="#download" className="px-4 py-2 text-sm font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition">
            Download
          </a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative pt-32 pb-24 px-6 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-xs font-medium text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
          Now in Early Development
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight mb-6">
          Your KSP mods,
          <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            all in one place.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Orbit Loader is the all-in-one mod manager, launcher, and marketplace for
          Kerbal Space Program. Browse, install, and play — effortlessly.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#download"
            className="px-8 py-3.5 text-base font-bold rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 transition shadow-lg shadow-indigo-600/25"
          >
            Download for Windows
          </a>
          <a
            href="#features"
            className="px-8 py-3.5 text-base font-semibold rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 transition"
          >
            Learn More
          </a>
        </div>

        {/* App preview mockup */}
        <div className="mt-16 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-[#08060d] via-transparent to-transparent z-10 pointer-events-none" />
          <div className="rounded-xl border border-white/10 bg-[#13141a] shadow-2xl shadow-indigo-900/20 overflow-hidden">
            <div className="flex items-center gap-2 px-4 h-10 bg-[#0d0e12] border-b border-white/5">
              <div className="w-3 h-3 rounded-full bg-white/10" />
              <div className="w-3 h-3 rounded-full bg-white/10" />
              <div className="w-3 h-3 rounded-full bg-white/10" />
              <span className="ml-3 text-xs text-gray-500">Orbit Loader</span>
            </div>
            <div className="flex h-[340px]">
              <div className="w-48 border-r border-white/5 bg-[#13141a] p-3 flex flex-col gap-1">
                {["Home", "Mods", "Profiles", "AstroSync"].map((item, i) => (
                  <div
                    key={item}
                    className={`px-3 py-2 rounded-lg text-xs font-medium ${
                      i === 0
                        ? "bg-indigo-500/15 text-indigo-300"
                        : "text-gray-500"
                    }`}
                  >
                    {item}
                  </div>
                ))}
                <div className="flex-1" />
                {["Updates", "Settings"].map((item) => (
                  <div key={item} className="px-3 py-2 rounded-lg text-xs font-medium text-gray-600">
                    {item}
                  </div>
                ))}
              </div>
              <div className="flex-1 p-6">
                <div className="text-lg font-bold text-white mb-1">Welcome back</div>
                <div className="text-xs text-gray-500 mb-5">Orbit Loader Dashboard</div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2 p-4 rounded-lg bg-[#1c1d27] border border-white/5">
                    <div className="text-xs font-semibold text-white mb-3">KSP Installation</div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded text-xs font-semibold bg-green-500/10 text-green-400">
                      <span className="w-2 h-2 rounded-full bg-green-400" />
                      KSP Detected
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-[#1c1d27] border border-white/5">
                    <div className="text-xs font-semibold text-white mb-3">Quick Launch</div>
                    <div className="px-3 py-2 rounded bg-gradient-to-r from-indigo-600 to-purple-600 text-xs text-white font-bold text-center">
                      Launch KSP
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-[#1c1d27] border border-white/5">
                    <div className="text-xs font-semibold text-white mb-3">Overview</div>
                    <div className="grid grid-cols-2 gap-2">
                      {["12 Mods", "3 Profiles", "2 Updates", "1 DLC"].map((s) => (
                        <div key={s} className="text-center text-[10px] text-gray-500 bg-[#16171f] rounded p-1.5">
                          {s}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      title: "Smart Install Detection",
      desc: "Automatically finds your KSP installation across Steam, Epic, GOG, or manual installs.",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
      ),
    },
    {
      title: "One-Click Mod Install",
      desc: "Browse, install, update, and remove mods with a single click. Dependency resolution included.",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
      ),
    },
    {
      title: "Mod Profiles",
      desc: "Create separate mod profiles for career saves, testing, or multiplayer. Switch instantly.",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
      ),
    },
    {
      title: "Conflict Detection",
      desc: "Warns about incompatible mods, missing dependencies, and version mismatches before they break your game.",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M12 9v2m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z"/></svg>
      ),
    },
    {
      title: "Built-in Launcher",
      desc: "Launch KSP directly with the right profile, mods, and settings. No manual file shuffling.",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
      ),
    },
    {
      title: "Mod Marketplace",
      desc: "Creators can upload and sell premium content. Buyers get instant access through Orbit Loader.",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
      ),
    },
  ];

  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Everything you need to mod KSP
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Orbit Loader handles the hard parts so you can focus on building rockets.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="p-6 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition group"
            >
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-4 group-hover:bg-indigo-500/20 transition">
                {f.icon}
              </div>
              <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AstroSync() {
  return (
    <section id="astrosync" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/5 rounded-full blur-[120px]" />
      </div>
      <div className="relative max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-medium text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 rounded-full">
              Multiplayer
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
              AstroSync
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                Multiplayer, simplified.
              </span>
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Join a server and Orbit Loader handles the rest — automatically detects required mods,
              installs missing content, warns about unsafe mods, and launches you straight into the game.
            </p>
            <div className="space-y-4">
              {[
                "Auto-detect required server mods",
                "One-click install missing content",
                "Unsafe mod warnings & confirmation",
                "Launch directly into multiplayer",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-gray-300">
                  <svg className="w-5 h-5 text-cyan-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="flex-shrink-0">
            <Image
              src="/astrosync.png"
              alt="AstroSync"
              width={280}
              height={280}
              className="rounded-3xl shadow-2xl shadow-indigo-900/30"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Download() {
  return (
    <section id="download" className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <Image src="/icon.png" alt="Orbit Loader" width={80} height={80} className="rounded-2xl mx-auto mb-8 shadow-lg shadow-indigo-900/30" />
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
          Ready to launch?
        </h2>
        <p className="text-gray-400 mb-10 max-w-lg mx-auto">
          Download Orbit Loader and take control of your KSP mods. Free and open source.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#"
            className="px-8 py-3.5 text-base font-bold rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 transition shadow-lg shadow-indigo-600/25"
          >
            Download for Windows
          </a>
          <a
            href="#"
            className="px-8 py-3.5 text-base font-semibold rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 transition"
          >
            View on GitHub
          </a>
        </div>
        <p className="text-xs text-gray-600 mt-6">
          Windows 10+ &middot; macOS and Linux coming soon
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Image src="/icon.png" alt="Orbit Loader" width={24} height={24} className="rounded-md" />
          <span className="text-sm text-gray-500">Orbit Loader &middot; KSP Mod Manager</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-gray-500">
          <a href="#features" className="hover:text-gray-300 transition">Features</a>
          <a href="#astrosync" className="hover:text-gray-300 transition">AstroSync</a>
          <a href="#download" className="hover:text-gray-300 transition">Download</a>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <AstroSync />
      <Download />
      <Footer />
    </>
  );
}
