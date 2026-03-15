"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase-browser";

export default function LoginPage() {
  const supabase = useMemo(() => createClient(), []);
  const [user, setUser] = useState<{ email?: string; name?: string; avatar?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("error")) setError("Authentication failed. Try again.");

    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser({
          email: data.user.email,
          name: data.user.user_metadata?.full_name || data.user.user_metadata?.name || data.user.email,
          avatar: data.user.user_metadata?.avatar_url,
        });
      }
      setLoading(false);
    });
  }, [supabase.auth]);

  async function signIn(provider: "discord" | "github") {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) setError(error.message);
  }

  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#08060d]">
        <div className="w-4 h-4 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
      </div>
    );
  }

  // Logged in state
  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#08060d] px-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <a href="/" className="inline-block mb-8">
              <Image src="/icon.png" alt="" width={40} height={40} className="rounded-xl mx-auto" />
            </a>
            {user.avatar && (
              <img
                src={user.avatar}
                alt=""
                width={64}
                height={64}
                className="rounded-full mx-auto mb-4 border-2 border-white/[0.06]"
              />
            )}
            <p className="text-[15px] font-semibold text-white">{user.name}</p>
            {user.email && <p className="text-[13px] text-[#555] mt-1">{user.email}</p>}
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] mb-4">
            <p className="text-[13px] text-[#888] text-center">
              You&apos;re signed in. You can close this page and use Orbit Loader.
            </p>
          </div>

          <button
            onClick={signOut}
            className="w-full py-2.5 text-[13px] font-medium text-[#666] hover:text-white rounded-lg border border-white/[0.06] hover:border-white/[0.1] transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  // Login state
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#08060d] px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <a href="/" className="inline-block mb-6">
            <Image src="/icon.png" alt="" width={40} height={40} className="rounded-xl mx-auto" />
          </a>
          <h1 className="text-xl font-bold text-white mb-1">Sign in to Orbit Loader</h1>
          <p className="text-[13px] text-[#555]">Connect your account to sync mods and purchases.</p>
        </div>

        {error && (
          <div className="mb-4 px-4 py-2.5 rounded-lg bg-red-500/[0.08] border border-red-500/[0.15] text-[13px] text-red-400 text-center">
            {error}
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={() => signIn("discord")}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-[#5865F2] text-white text-[14px] font-semibold hover:bg-[#4752c4] transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            Continue with Discord
          </button>

          <button
            onClick={() => signIn("github")}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-white/[0.06] text-white text-[14px] font-semibold hover:bg-white/[0.1] border border-white/[0.06] transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
            Continue with GitHub
          </button>
        </div>

        <p className="text-center text-[11px] text-[#333] mt-8">
          By signing in you agree to the terms of service.
        </p>
      </div>
    </div>
  );
}
