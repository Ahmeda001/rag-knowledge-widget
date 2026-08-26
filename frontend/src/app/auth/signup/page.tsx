"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { createClient } from "@supabase/supabase-js";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  FileText,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  User,
  Loader2,
  AlertCircle,
} from "lucide-react";

/* ─────────────────────────── helpers ─────────────────────────── */

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing Supabase Environment Variables. Check your .env.local file."
    );
  }
  return createClient(url, key);
}

function useBrandAssets() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=IBM+Plex+Mono:wght@400;500&display=swap";
    document.head.appendChild(link);

    const style = document.createElement("style");
    style.textContent = `
      html { scroll-behavior: smooth; }
      body { background: #FBF7F0; color: #1C1712; font-family: 'Instrument Sans', sans-serif; }
      .font-serif { font-family: 'Fraunces', serif; }
      .font-mono { font-family: 'IBM Plex Mono', monospace; }
      ::selection { background: #E4572E; color: #FBF7F0; }
      .text-balance { text-wrap: balance; }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(style);
    };
  }, []);
}

function SocialButton({
  icon,
  label,
  onClick,
  disabled,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex w-full items-center justify-center gap-3 rounded-xl border border-ink/15 bg-white py-3 text-sm font-semibold text-ink shadow-[2px_2px_0_0_#1C1712] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_0_#1C1712] hover:border-ink disabled:opacity-50 disabled:pointer-events-none"
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

const HIGHLIGHTS = [
  "Zero engineering setup 1 script tag",
  "Upload PDFs, URLs, or Notion docs",
  "Source citations on every reply",
  "Private vector index per workspace",
];

function AuthSidePanel() {
  return (
    <div className="relative hidden h-full flex-col justify-between overflow-hidden rounded-3xl border border-ink/20 bg-[#2C3B32] p-10 text-[#FBF7F0] shadow-[8px_8px_0_0_#1C1712] lg:flex">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: "radial-gradient(#FBF7F0 0.75px, transparent 0.75px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#FBF7F0]/20 bg-[#FBF7F0]/10 px-3 py-1 text-xs font-semibold text-[#FBF7F0]">
          <ShieldCheck className="h-3.5 w-3.5 text-persimmon" />
          SOC2 & GDPR Compliant
        </div>

        <h2 className="mt-8 font-serif text-3xl leading-snug font-semibold tracking-tight text-balance">
          “Docsy cut our repetitive support tickets by 62% in the very first month.”
        </h2>
      </div>

      <div className="relative z-10 my-8">
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="rounded-2xl border border-ink/20 bg-[#FBF7F0] p-5 text-ink shadow-[6px_6px_0_0_#1C1712]"
        >
          <div className="flex items-center gap-3 border-b border-ink/10 pb-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-persimmon text-xs font-bold text-[#FBF7F0]">
              D
            </span>
            <div>
              <p className="text-xs font-semibold">Docsy Engine v2.4</p>
              <p className="text-[10px] text-soot">Indexed 312 sources · Live</p>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-soot">
            <span className="flex items-center gap-1">
              <FileText className="h-3.5 w-3.5 text-persimmon" />
              API_Docs_v3.pdf
            </span>
            <span className="font-mono text-[10px] text-emerald-600 font-semibold">
              Synced
            </span>
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 space-y-3">
        {HIGHLIGHTS.map((item) => (
          <div key={item} className="flex items-center gap-2.5 text-xs text-[#FBF7F0]/85 font-medium">
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-persimmon text-[#FBF7F0]">
              <Check className="h-2.5 w-2.5" />
            </span>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────── Main Page ─────────────────────────── */

export default function SignUpPage() {
  useBrandAssets();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  /* Email & Password Sign Up */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!agreed) {
      setError("Please agree to the Terms of Service and Privacy Policy.");
      return;
    }

    setLoading(true);

    try {
      const supabase = getSupabaseClient();

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (signUpError) throw signUpError;

      if (data.session) {
        router.push("/dashboard");
      } else {
        setSuccessMsg("Account created! Check your email to confirm registration.");
      }
    } catch (err: any) {
      console.error("SignUp Error:", err);
      setError(err.message || "An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  /* OAuth Sign Up */
  const handleOAuthSignUp = async (provider: "google" | "github") => {
    setError(null);
    setLoading(true);

    try {
      const supabase = getSupabaseClient();
      const { error: oAuthError } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (oAuthError) throw oAuthError;
    } catch (err: any) {
      console.error("OAuth Error:", err);
      setError(err.message || `Failed to sign up with ${provider}.`);
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FBF7F0] text-ink selection:bg-persimmon selection:text-[#FBF7F0]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.3]"
        style={{
          backgroundImage: "radial-gradient(#1C1712 0.75px, transparent 0.75px)",
          backgroundSize: "26px 26px",
        }}
      />

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-between px-5 py-6 sm:px-8">
        <header className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-persimmon font-serif text-lg font-semibold text-[#FBF7F0] shadow-[2px_2px_0_0_#1C1712]">
              D
            </span>
            <span className="font-serif text-xl font-semibold tracking-tight text-ink">
              Docsy
            </span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-lg border border-ink/15 bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-soot transition-all hover:border-ink hover:text-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to landing page
          </Link>
        </header>

        <main className="my-auto py-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="flex justify-center lg:justify-start">
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-md"
              >
                <div className="text-left">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-white/60 px-3 py-1 text-[11px] font-semibold text-soot">
                    <Sparkles className="h-3 w-3 text-persimmon" />
                    14-day free trial · No card needed
                  </span>
                  <h1 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                    Get started with Docsy
                  </h1>
                  <p className="mt-2 text-sm leading-relaxed text-soot">
                    Turn your static documentation into an intelligent, embeddable answer widget in minutes.
                  </p>
                </div>

                {/* Error & Success Feedback UI */}
                {error && (
                  <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-red-500/20 bg-red-50 p-3 text-xs font-medium text-red-700">
                    <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
                    <span>{error}</span>
                  </div>
                )}

                {successMsg && (
                  <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-emerald-500/20 bg-emerald-50 p-3 text-xs font-medium text-emerald-800">
                    <Check className="h-4 w-4 shrink-0 text-emerald-600" />
                    <span>{successMsg}</span>
                  </div>
                )}

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <SocialButton
                    label="Google"
                    disabled={loading}
                    // onClick={() => handleOAuthSignUp("google")}
                    icon={
                      <svg className="h-4 w-4" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                      </svg>
                    }
                  />
                  <SocialButton
                    label="GitHub"
                    disabled={loading}
                    // onClick={() => handleOAuthSignUp("github")}
                    icon={
                      <svg className="h-4 w-4 fill-ink" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                    }
                  />
                </div>

                <div className="relative my-6 text-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-ink/10" />
                  </div>
                  <span className="relative bg-[#FBF7F0] px-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-soot/70">
                    Or register with work email
                  </span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-soot">
                      Full Name
                    </label>
                    <div className="mt-1 flex items-center gap-2.5 rounded-xl border border-ink/15 bg-white px-3.5 py-2.5 focus-within:border-persimmon focus-within:ring-1 focus-within:ring-persimmon transition-all">
                      <User className="h-4 w-4 text-soot/60" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Alex Morgan"
                        className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-soot/40 font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-soot">
                      Work Email
                    </label>
                    <div className="mt-1 flex items-center gap-2.5 rounded-xl border border-ink/15 bg-white px-3.5 py-2.5 focus-within:border-persimmon focus-within:ring-1 focus-within:ring-persimmon transition-all">
                      <Mail className="h-4 w-4 text-soot/60" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@company.com"
                        className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-soot/40 font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-soot">
                      Password
                    </label>
                    <div className="mt-1 flex items-center gap-2.5 rounded-xl border border-ink/15 bg-white px-3.5 py-2.5 focus-within:border-persimmon focus-within:ring-1 focus-within:ring-persimmon transition-all">
                      <Lock className="h-4 w-4 text-soot/60" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        minLength={6}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="6+ characters"
                        className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-soot/40 font-medium"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-soot/60 hover:text-ink"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="pt-1">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="mt-0.5 h-4 w-4 rounded border-ink/20 text-persimmon focus:ring-persimmon"
                      />
                      <span className="text-xs leading-normal text-soot">
                        I agree to Docsy's{" "}
                        <a href="#terms" className="text-ink underline">
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#privacy" className="text-ink underline">
                          Privacy Policy
                        </a>
                        .
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-persimmon py-3.5 text-base font-semibold text-[#FBF7F0] shadow-[4px_4px_0_0_#1C1712] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#1C1712] disabled:opacity-60 disabled:pointer-events-none"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Creating account...</span>
                      </>
                    ) : (
                      <>
                        <span>Create free account</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>

                <p className="mt-6 text-center text-sm text-soot">
                  Already have an account?{" "}
                  <Link
                    href="/auth/signin"
                    className="font-semibold text-persimmon underline decoration-persimmon/40 underline-offset-4 hover:decoration-persimmon"
                  >
                    Sign in
                  </Link>
                </p>
              </motion.div>
            </div>

            <div className="h-[520px]">
              <AuthSidePanel />
            </div>
          </div>
        </main>

        <footer className="flex flex-col items-center justify-between gap-3 border-t border-ink/10 pt-5 text-xs text-soot/70 sm:flex-row">
          <p>© {new Date().getFullYear()} Docsy Inc. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#terms" className="hover:text-ink">Terms</a>
            <a href="#privacy" className="hover:text-ink">Privacy</a>
            <a href="#contact" className="hover:text-ink">Support</a>
          </div>
        </footer>
      </div>
    </div>
  );
}