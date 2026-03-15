import Image from "next/image";

function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#08060d]/60 backdrop-blur-md">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-6 h-14">
        <a href="/" className="flex items-center gap-2.5">
          <Image src="/icon.png" alt="" width={28} height={28} className="rounded-md" />
          <span className="text-[15px] font-semibold text-white">Orbit Loader</span>
        </a>
        <div className="hidden md:flex items-center gap-7 text-[13px] text-[#777]">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#multiplayer" className="hover:text-white transition-colors">Multiplayer</a>
        </div>
        <a href="#download" className="text-[13px] font-medium text-white/80 hover:text-white transition-colors">
          Download
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="pt-36 pb-32 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-[13px] text-[#555] mb-6 tracking-wide uppercase">Mod manager for KSP</p>

        <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold text-white leading-[1.1] tracking-tight mb-6">
          Stop managing files.<br />Start playing.
        </h1>

        <p className="text-[17px] text-[#888] max-w-lg mx-auto mb-10 leading-relaxed">
          Orbit Loader finds your KSP install, handles mods and profiles,
          and gets you into the game. That&apos;s it.
        </p>

        <div className="flex items-center justify-center gap-3">
          <a
            href="#download"
            className="px-6 py-2.5 text-[14px] font-semibold rounded-lg bg-white text-black hover:bg-white/90 transition-colors"
          >
            Download
          </a>
          <a
            href="#features"
            className="px-6 py-2.5 text-[14px] font-medium rounded-lg text-[#999] hover:text-white transition-colors"
          >
            See features
          </a>
        </div>
      </div>

      {/* App screenshot mockup */}
      <div className="max-w-4xl mx-auto mt-20 relative">
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
        <div className="rounded-2xl bg-[#111118] overflow-hidden border border-white/[0.06]">
          {/* Titlebar */}
          <div className="flex items-center px-4 h-9 bg-[#0c0c12] border-b border-white/[0.04]">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-white/[0.06]" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/[0.06]" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/[0.06]" />
            </div>
            <span className="ml-3 text-[11px] text-[#444]">Orbit Loader</span>
          </div>

          <div className="flex h-[320px]">
            {/* Sidebar */}
            <div className="w-44 border-r border-white/[0.04] p-2.5 flex flex-col gap-0.5 bg-[#0e0e15]">
              {[
                { name: "Home", active: true },
                { name: "Mods", active: false },
                { name: "Profiles", active: false },
                { name: "AstroSync", active: false },
              ].map((item) => (
                <div
                  key={item.name}
                  className={`px-3 py-[7px] rounded-md text-[12px] ${
                    item.active
                      ? "bg-white/[0.06] text-white font-medium"
                      : "text-[#555]"
                  }`}
                >
                  {item.name}
                </div>
              ))}
              <div className="flex-1" />
              <div className="px-3 py-[7px] text-[12px] text-[#333]">Settings</div>
            </div>

            {/* Main content */}
            <div className="flex-1 p-5">
              <p className="text-[15px] font-semibold text-white mb-0.5">Welcome back</p>
              <p className="text-[11px] text-[#444] mb-5">Dashboard</p>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="col-span-2 p-3.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-medium text-[#aaa]">KSP Installation</span>
                    <span className="text-[11px] font-medium text-emerald-400/80 bg-emerald-400/[0.08] px-2 py-0.5 rounded">Detected</span>
                  </div>
                  <p className="text-[11px] text-[#333] mt-2 font-mono">C:\Steam\...\Kerbal Space Program</p>
                </div>
                <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                  <span className="text-[12px] font-medium text-[#aaa]">Profile</span>
                  <p className="text-[11px] text-[#555] mt-1">Default — 12 mods</p>
                  <div className="mt-3 px-3 py-1.5 rounded-md bg-indigo-500/90 text-[11px] text-white font-semibold text-center">
                    Launch
                  </div>
                </div>
                <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                  <div className="grid grid-cols-2 gap-2 text-center">
                    {[
                      { v: "12", l: "Mods" },
                      { v: "3", l: "Profiles" },
                      { v: "2", l: "Updates" },
                      { v: "1.12", l: "KSP" },
                    ].map((s) => (
                      <div key={s.l} className="py-1.5">
                        <div className="text-[14px] font-semibold text-white">{s.v}</div>
                        <div className="text-[10px] text-[#444]">{s.l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#08060d] to-transparent pointer-events-none" />
      </div>
    </section>
  );
}

function Features() {
  const items = [
    {
      title: "Finds KSP automatically",
      desc: "Scans Steam, Epic, GOG, and common folders. Verifies the install is real, not just a folder.",
    },
    {
      title: "Mods in one click",
      desc: "Browse, install, update, remove. Dependencies get pulled in automatically.",
    },
    {
      title: "Profiles",
      desc: "Run different mod setups for different saves. Switch between them instantly.",
    },
    {
      title: "Catches problems early",
      desc: "Incompatible mods, missing dependencies, version mismatches — flagged before you launch.",
    },
    {
      title: "Built-in launcher",
      desc: "Pick a profile, hit launch. KSP starts with the right mods loaded. No file juggling.",
    },
    {
      title: "Marketplace",
      desc: "Creators can publish paid or free content. Buyers get one-click access through the app.",
    },
  ];

  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <p className="text-[13px] text-[#555] mb-3 tracking-wide uppercase">Features</p>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-14">
          Less time modding, more time flying.
        </h2>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-10">
          {items.map((f) => (
            <div key={f.title}>
              <h3 className="text-[15px] font-semibold text-white mb-1.5">{f.title}</h3>
              <p className="text-[14px] text-[#666] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Multiplayer() {
  return (
    <section id="multiplayer" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-14">
          <div className="flex-1">
            <p className="text-[13px] text-[#555] mb-3 tracking-wide uppercase">Multiplayer</p>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              AstroSync
            </h2>
            <p className="text-[15px] text-[#666] mb-8 leading-relaxed">
              Paste a server code. Orbit Loader checks what mods are needed,
              installs anything missing, and drops you in. If a server runs
              sketchy content, you get a warning first.
            </p>
            <div className="space-y-3">
              {[
                "Detects required server mods",
                "Installs missing content automatically",
                "Warns about unverified mods",
                "Launches straight into the server",
              ].map((item) => (
                <p key={item} className="text-[14px] text-[#888] flex items-center gap-2.5">
                  <span className="w-1 h-1 rounded-full bg-[#555]" />
                  {item}
                </p>
              ))}
            </div>
          </div>
          <div className="flex-shrink-0 lg:mt-8">
            <Image
              src="/astrosync.png"
              alt="AstroSync"
              width={200}
              height={200}
              className="rounded-2xl opacity-90"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Download() {
  return (
    <section id="download" className="py-32 px-6">
      <div className="max-w-md mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
          Get Orbit Loader
        </h2>
        <p className="text-[14px] text-[#666] mb-8">
          Free. Open source. Windows 10+.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="#"
            className="px-6 py-2.5 text-[14px] font-semibold rounded-lg bg-white text-black hover:bg-white/90 transition-colors"
          >
            Download for Windows
          </a>
          <a
            href="#"
            className="px-6 py-2.5 text-[14px] font-medium rounded-lg text-[#666] hover:text-white transition-colors"
          >
            GitHub
          </a>
        </div>
        <p className="text-[12px] text-[#333] mt-6">
          macOS and Linux coming later
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/[0.04] py-8 px-6">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <span className="text-[12px] text-[#333]">Orbit Loader</span>
        <div className="flex items-center gap-5 text-[12px] text-[#333]">
          <a href="#features" className="hover:text-[#888] transition-colors">Features</a>
          <a href="#multiplayer" className="hover:text-[#888] transition-colors">Multiplayer</a>
          <a href="#download" className="hover:text-[#888] transition-colors">Download</a>
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
      <Multiplayer />
      <Download />
      <Footer />
    </>
  );
}
