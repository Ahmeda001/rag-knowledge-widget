"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  animate,
} from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Check,
  Code2,
  FileText,
  Link2,
  Menu,
  MessageSquareText,
  Minus,
  Palette,
  Plus,
  ShieldCheck,
  Upload,
  Users,
  X,
  Zap,
} from "lucide-react";

import { isUserLoggedIn, signOutUser } from "@/lib/api";

/* ─────────────────────────── helpers ─────────────────────────── */

function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function CountUp({
  to,
  suffix = "",
  decimals = 0,
}: {
  to: number;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

function SectionHeading({
  eyebrow,
  title,
  sub,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  dark?: boolean;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <Reveal>
        <span
          className={`inline-block rounded-full border px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${
            dark
              ? "border-sand/30 text-sand"
              : "border-ink/20 text-soot"
          }`}
        >
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          className={`mt-5 font-serif text-4xl leading-[1.08] tracking-tight text-balance sm:text-5xl ${
            dark ? "text-paper" : "text-ink"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.16}>
          <p
            className={`mt-5 text-lg leading-relaxed ${
              dark ? "text-sand/80" : "text-soot"
            }`}
          >
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  );
}



// Simple boolean check
const loggedIn = await isUserLoggedIn();
if (loggedIn) {
  // User is signed in
}

// // Get user profile object
// const user = await getCurrentUser();
// if (user) {
//   console.log("Logged in user ID:", user.id);
// }


/* ─────────────────────────── nav ─────────────────────────── */

// const NAV_LINKS = [
//   { label: "How it works", href: "#how" },
//   { label: "Features", href: "#features" },
//   { label: "Live demo", href: "#demo" },
//   { label: "Pricing", href: "#pricing" },
//   { label: "FAQ", href: "#faq" },
// ];

// function Nav() {
//   const [open, setOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 24);
//     onScroll();
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

  

//   return (
//     <header
//       className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
//         scrolled
//           ? "border-b border-ink/10 bg-paper/90 backdrop-blur-md"
//           : "bg-transparent"
//       }`}
//     >
//       <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
//         <a href="#top" className="flex items-center gap-2">
//           <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-persimmon font-serif text-lg font-semibold text-paper shadow-[2px_2px_0_0_#1C1712]">
//             D
//           </span>
//           <span className="font-serif text-xl font-semibold tracking-tight">
//             Docsy
//           </span>
//         </a>

//         <div className="hidden items-center gap-7 md:flex">
//           {NAV_LINKS.map((l) => (
//             <a
//               key={l.href}
//               href={l.href}
//               className="text-sm font-medium text-soot transition-colors hover:text-ink"
//             >
//               {l.label}
//             </a>
//           ))}
//         </div>

//         <div className="hidden items-center gap-3 md:flex">
//           <a
//             href="/auth/signin"
//             className="text-sm font-medium text-soot transition-colors hover:text-ink"
//           >
//             Sign in
//           </a>
//           <a
//             href="/auth/signip"
//             className="group inline-flex items-center gap-1.5 rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-paper transition-all hover:bg-persimmon"
//           >
//             Start free
//             <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
//           </a>
//         </div>

//         <button
//           className="md:hidden"
//           onClick={() => setOpen(!open)}
//           aria-label="Toggle menu"
//         >
//           {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//         </button>
//       </nav>

//       <AnimatePresence>
//         {open && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             className="overflow-hidden border-b border-ink/10 bg-paper md:hidden"
//           >
//             <div className="flex flex-col gap-1 px-5 py-4">
//               {NAV_LINKS.map((l) => (
//                 <a
//                   key={l.href}
//                   href={l.href}
//                   onClick={() => setOpen(false)}
//                   className="rounded-lg px-3 py-2.5 text-sm font-medium text-soot hover:bg-cream"
//                 >
//                   {l.label}
//                 </a>
//               ))}
//               <a
//                 href="#demo"
//                 onClick={() => setOpen(false)}
//                 className="mt-2 rounded-lg bg-ink px-3 py-2.5 text-center text-sm font-semibold text-paper"
//               >
//                 Start free
//               </a>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </header>
//   );
// }

// "use client";

// import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
import { LogOut, Loader2 } from "lucide-react";
// import { isUserLoggedIn, signOutUser } from "@/lib/api"; // Adjust path to your api.ts file

const NAV_LINKS = [
  { label: "How it works", href: "#how" },
  { label: "Features", href: "#features" },
  { label: "Live demo", href: "#demo" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  // Scroll position listener
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Check login status via api.ts
  useEffect(() => {
    async function checkAuth() {
      const loggedIn = await isUserLoggedIn();
      setIsLoggedIn(loggedIn);
      setLoading(false);
    }
    checkAuth();
  }, []);

  const handleSignOut = async () => {
    await signOutUser();
    setIsLoggedIn(false);
    setOpen(false);
    router.push("/");
    router.refresh();
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-ink/10 bg-paper/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-persimmon font-serif text-lg font-semibold text-paper shadow-[2px_2px_0_0_#1C1712]">
            D
          </span>
          <span className="font-serif text-xl font-semibold tracking-tight">
            Docsy
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-soot transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Desktop Auth State */}
        <div className="hidden items-center gap-3 md:flex">
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin text-soot/60" />
          ) : isLoggedIn ? (
            <>
              <Link
                href="/dashboard"
                className="text-sm font-medium text-soot transition-colors hover:text-ink"
              >
                Dashboard
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                className="group inline-flex items-center gap-1.5 rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-paper transition-all hover:bg-persimmon"
              >
                Sign out
                <LogOut className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/signin"
                className="text-sm font-medium text-soot transition-colors hover:text-ink"
              >
                Sign in
              </Link>
              <Link
                href="/auth/signup"
                className="group inline-flex items-center gap-1.5 rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-paper transition-all hover:bg-persimmon"
              >
                Start free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-ink/10 bg-paper md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-soot hover:bg-cream"
                >
                  {l.label}
                </a>
              ))}

              <div className="mt-2 border-t border-ink/10 pt-3">
                {loading ? (
                  <div className="flex justify-center py-2">
                    <Loader2 className="h-4 w-4 animate-spin text-soot/60" />
                  </div>
                ) : isLoggedIn ? (
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/dashboard"
                      onClick={() => setOpen(false)}
                      className="rounded-lg px-3 py-2.5 text-sm font-medium text-soot hover:bg-cream"
                    >
                      Dashboard
                    </Link>
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-ink px-3 py-2.5 text-center text-sm font-semibold text-paper hover:bg-persimmon"
                    >
                      Sign out
                      <LogOut className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/auth/signin"
                      onClick={() => setOpen(false)}
                      className="rounded-lg px-3 py-2.5 text-sm font-medium text-soot hover:bg-cream"
                    >
                      Sign in
                    </Link>
                    <Link
                      href="/auth/signup"
                      onClick={() => setOpen(false)}
                      className="rounded-lg bg-ink px-3 py-2.5 text-center text-sm font-semibold text-paper hover:bg-persimmon"
                    >
                      Start free
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ─────────────────────── hero chat mockup ─────────────────────── */

const MOCK_USER = "How do I reset a staff member's password?";
const MOCK_ANSWER =
  "Head to Settings  Team, pick the member, and choose “Reset password”. They'll get an email link that stays valid for 24 hours.";
const MOCK_SOURCE = "staff-handbook.pdf · page 14";

function ChatMock() {
  const [userChars, setUserChars] = useState(0);
  const [botChars, setBotChars] = useState(0);
  const [phase, setPhase] = useState<
    "visitor-typing" | "user-sent" | "bot-typing" | "bot-sent" | "done"
  >("visitor-typing");

  useEffect(() => {
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const later = (fn: () => void, ms: number) => {
      timers.push(setTimeout(() => !cancelled && fn(), ms));
    };

    const run = () => {
      setUserChars(0);
      setBotChars(0);
      setPhase("visitor-typing");

      // visitor types the question
      later(() => {
        let i = 0;
        const t = setInterval(() => {
          if (cancelled) return clearInterval(t);
          i += 1;
          setUserChars(i);
          if (i >= MOCK_USER.length) {
            clearInterval(t);
            later(() => setPhase("user-sent"), 350);
            later(() => setPhase("bot-typing"), 1100);
            later(() => {
              setPhase("bot-sent");
              let j = 0;
              const t2 = setInterval(() => {
                if (cancelled) return clearInterval(t2);
                j += 2;
                setBotChars(j);
                if (j >= MOCK_ANSWER.length) {
                  clearInterval(t2);
                  later(() => setPhase("done"), 400);
                  later(run, 6500); // loop
                }
              }, 24);
            }, 2100);
          }
        }, 34);
      }, 900);
    };

    run();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, []);

  const showUser = phase !== "visitor-typing";
  const showBotTyping = phase === "bot-typing";
  const showBot = phase === "bot-sent" || phase === "done";

  return (
    <div className="relative">
      {/* floating doc card */}
      <motion.div
        className="absolute -left-8 -top-10 z-10 hidden rotate-[-6deg] rounded-xl border border-ink/15 bg-paper px-4 py-3 shadow-[4px_4px_0_0_#1C1712] sm:block"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex items-center gap-2.5">
          <FileText className="h-4 w-4 text-persimmon" />
          <div>
            <p className="text-xs font-semibold">staff-handbook.pdf</p>
            <p className="text-[10px] text-soot">Indexed · 86 pages</p>
          </div>
        </div>
      </motion.div>

      {/* floating url card */}
      <motion.div
        className="absolute -right-6 top-24 z-10 hidden rotate-[5deg] rounded-xl border border-ink/15 bg-paper px-4 py-3 shadow-[4px_4px_0_0_#1C1712] lg:block"
        animate={{ y: [0, 9, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      >
        <div className="flex items-center gap-2.5">
          <Link2 className="h-4 w-4 text-moss" />
          <div>
            <p className="text-xs font-semibold">docs.acme.com</p>
            <p className="text-[10px] text-soot">Crawled · 212 pages</p>
          </div>
        </div>
      </motion.div>

      {/* widget frame */}
      <div className="overflow-hidden rounded-2xl border border-ink/15 bg-white shadow-[8px_8px_0_0_#1C1712]">
        {/* title bar */}
        <div className="flex items-center justify-between border-b border-ink/10 bg-cream px-4 py-3">
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-persimmon">
              <MessageSquareText className="h-4 w-4 text-paper" />
            </span>
            <div>
              <p className="text-sm font-semibold leading-none">Ask Acme</p>
              <p className="mt-1 flex items-center gap-1 text-[10px] text-soot">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Answers from your docs
              </p>
            </div>
          </div>
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
          </div>
        </div>

        {/* messages */}
        <div className="flex h-[320px] flex-col gap-3 overflow-hidden px-4 py-4 sm:h-[340px]">
          <div className="max-w-[85%] self-start rounded-2xl rounded-tl-sm bg-cream px-4 py-2.5 text-sm leading-relaxed text-ink">
            Hi there! Ask me anything about Acme's product, policies, or
            guides.
          </div>

          {/* visitor typing  sent bubble */}
          <AnimatePresence mode="wait">
            {!showUser ? (
              <motion.div
                key="vtyping"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-[85%] self-end rounded-2xl rounded-tr-sm border border-dashed border-ink/25 px-4 py-2.5 text-sm text-soot"
              >
                {MOCK_USER.slice(0, userChars)}
                <span className="ml-0.5 inline-block h-4 w-[2px] animate-caret-blink bg-persimmon align-middle" />
              </motion.div>
            ) : (
              <motion.div
                key="vsent"
                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="max-w-[85%] self-end rounded-2xl rounded-tr-sm bg-ink px-4 py-2.5 text-sm leading-relaxed text-paper"
              >
                {MOCK_USER}
              </motion.div>
            )}
          </AnimatePresence>

          {showBotTyping && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-1.5 self-start rounded-2xl rounded-tl-sm bg-cream px-4 py-3"
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="h-2 w-2 rounded-full bg-soot/60"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </motion.div>
          )}

          {showBot && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-[90%] self-start"
            >
              <div className="rounded-2xl rounded-tl-sm bg-cream px-4 py-2.5 text-sm leading-relaxed text-ink">
                {MOCK_ANSWER.slice(0, botChars)}
                {botChars < MOCK_ANSWER.length && (
                  <span className="ml-0.5 inline-block h-4 w-[2px] animate-caret-blink bg-persimmon align-middle" />
                )}
              </div>
              <AnimatePresence>
                {phase === "done" && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-paper px-3 py-1 text-[11px] font-medium text-soot"
                  >
                    <FileText className="h-3 w-3 text-persimmon" />
                    Source: {MOCK_SOURCE}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

        {/* input */}
        <div className="border-t border-ink/10 px-4 py-3">
          <div className="flex items-center gap-2 rounded-xl border border-ink/15 bg-paper px-3.5 py-2.5">
            <span className="flex-1 text-sm text-soot/60">
              Ask a question…
            </span>
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-persimmon">
              <ArrowRight className="h-4 w-4 text-paper" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── hero ─────────────────────────── */

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-32 sm:pt-40">
      {/* dotted paper texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: "radial-gradient(#1C1712 0.75px, transparent 0.75px)",
          backgroundSize: "26px 26px",
          maskImage:
            "radial-gradient(ellipse 90% 60% at 50% 0%, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 60% at 50% 0%, black 30%, transparent 75%)",
        }}
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/60 px-3.5 py-1.5 text-xs font-semibold text-soot">
              <span className="inline-block h-2 w-2 rounded-full bg-persimmon" />
              Embeddable help widget for your docs
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mt-6 font-serif text-5xl leading-[1.02] tracking-tight text-balance sm:text-6xl lg:text-[4.2rem]">
              Your docs,{" "}
              <span className="relative inline-block">
                <span className="relative z-10 italic text-persimmon">
                  doing the talking.
                </span>
                <motion.svg
                  viewBox="0 0 220 12"
                  className="absolute -bottom-1 left-0 z-0 w-full"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.9, delay: 0.9, ease: "easeOut" }}
                >
                  <motion.path
                    d="M4 9 C 60 2, 160 2, 216 8"
                    fill="none"
                    stroke="#E4572E"
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.9, delay: 0.9, ease: "easeOut" }}
                    opacity="0.45"
                  />
                </motion.svg>
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-soot">
              Upload a PDF or paste a link. Docsy reads it, learns it, and puts
              a friendly answer box on your website ,so visitors help
              themselves and your inbox stays quiet.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#pricing"
                className="group inline-flex items-center gap-2 rounded-xl bg-persimmon px-6 py-3.5 text-base font-semibold text-paper shadow-[4px_4px_0_0_#1C1712] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#1C1712]"
              >
                Start free ,no card needed
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#demo"
                className="inline-flex items-center gap-2 rounded-xl border border-ink/20 bg-white/60 px-6 py-3.5 text-base font-semibold text-ink transition-colors hover:border-ink"
              >
                Try the live demo
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <p className="mt-6 text-sm text-soot">
              Live on your site in under 10 minutes · One script tag · Cancel
              anytime
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.25} y={40} className="lg:pl-6">
          <ChatMock />
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────── logo marquee ─────────────────────── */

const LOGOS = [
  "Northwind SaaS",
  "Ferndale",
  "Kit & Co.",
  "Loamly",
  "Brightpath",
  "Hollowbrook",
  "Tinyware",
  "Oakline",
  "Meridian Ops",
  "Copperfield",
];

function LogoMarquee() {
  const row = [...LOGOS, ...LOGOS];
  return (
    <section className="border-y border-ink/10 bg-cream py-10">
      <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-soot">
        Quietly answering questions for teams at
      </p>
      <div className="relative mt-7 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-cream to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-cream to-transparent" />
        <div className="flex w-max animate-marquee items-center gap-14">
          {row.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="whitespace-nowrap font-serif text-xl font-medium text-ink/45 transition-colors hover:text-ink"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── stats ─────────────────────────── */

const STATS = [
  { value: 62, suffix: "%", label: "of repeat tickets deflected in month one" },
  { value: 11, suffix: " min", label: "median time from upload to live widget" },
  { value: 4.9, suffix: "/5", label: "visitor rating on answered questions", decimals: 1 },
  { value: 2400, suffix: "+", label: "sites running Docsy today" },
];

function Stats() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="border-l-2 border-persimmon pl-5">
                <p className="font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
                  <CountUp
                    to={s.value}
                    suffix={s.suffix}
                    decimals={s.decimals ?? 0}
                  />
                </p>
                <p className="mt-2 text-sm leading-relaxed text-soot">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── how it works ─────────────────────── */

const STEPS = [
  {
    n: "01",
    icon: Upload,
    title: "Feed it your material",
    text: "Drag in PDFs, paste help-center URLs, or connect Notion. Docsy reads everything, keeps the structure, and re-indexes whenever you update a file.",
  },
  {
    n: "02",
    icon: Zap,
    title: "It builds the answer engine",
    text: "Your content is chunked, embedded, and stored in a private vector index. Every answer stays grounded in your documents ,with the page it came from.",
  },
  {
    n: "03",
    icon: Code2,
    title: "Paste one line into your site",
    text: "Copy the snippet into any page ,WordPress, Webflow, a Next.js app, plain HTML. The widget appears, already wearing your brand colors.",
  },
];

const EMBED_SNIPPET = `<script
  src="https://cdn.docsy.app/widget.js"
  data-docsy-key="dk_live_9f27ab…"
  defer
></script>`;

function HowItWorks() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMBED_SNIPPET);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <section id="how" className="border-y border-ink/10 bg-white py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="How it works"
          title="Three steps. Zero engineering weekends."
          sub="You built the product and wrote the docs. Docsy handles the part where nobody reads them."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.12}>
              <div className="group relative h-full rounded-2xl border border-ink/15 bg-paper p-7 shadow-[5px_5px_0_0_#1C1712] transition-transform duration-300 hover:-translate-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-cream text-ink transition-colors group-hover:bg-persimmon group-hover:text-paper">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <span className="font-serif text-4xl font-light text-ink/15">
                    {s.n}
                  </span>
                </div>
                <h3 className="mt-6 font-serif text-2xl font-semibold tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-soot">
                  {s.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* embed snippet */}
        <Reveal delay={0.2}>
          <div className="mx-auto mt-14 max-w-2xl overflow-hidden rounded-2xl border border-ink/20 bg-moss shadow-[6px_6px_0_0_#1C1712]">
            <div className="flex items-center justify-between border-b border-sand/15 px-5 py-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-sand/25" />
                <span className="h-2.5 w-2.5 rounded-full bg-sand/25" />
                <span className="h-2.5 w-2.5 rounded-full bg-sand/25" />
              </div>
              <span className="text-xs font-medium text-sand/60">
                index.html
              </span>
              <button
                onClick={copy}
                className="rounded-md border border-sand/25 px-2.5 py-1 text-xs font-medium text-sand transition-colors hover:bg-sand/10"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <pre className="overflow-x-auto px-5 py-5 font-mono text-sm leading-relaxed text-sand">
              {EMBED_SNIPPET}
            </pre>
          </div>
        </Reveal>
        
      </div>
    </section>
  );
}

/* ───────────────────────── features ───────────────────────── */

const FEATURES = [
  {
    icon: FileText,
    title: "Answers with receipts",
    text: "Every reply links to the exact page and paragraph it came from, so visitors can verify instead of wondering.",
  },
  {
    icon: Link2,
    title: "PDFs, URLs, and more",
    text: "Handbooks, API references, Notion pages, whole help centers. Drop them in and they stay in sync on a schedule you set.",
  },
  {
    icon: Palette,
    title: "Wears your brand",
    text: "Colors, fonts, corner radius, launcher position, greeting copy. It looks like you built it in-house, because it should.",
  },
  {
    icon: Users,
    title: "Catches leads mid-chat",
    text: "When a question needs a human, the widget takes a name and email and hands you the full transcript. No context lost.",
  },
  {
    icon: BarChart3,
    title: "Shows you the gaps",
    text: "See which questions go unanswered. That's your next doc, your next FAQ entry, your next changelog post.",
  },
  {
    icon: ShieldCheck,
    title: "Your content stays yours",
    text: "Private indexes per workspace, EU or US storage, one-click purge. We never train shared models on your documents.",
  },
];

function Features() {
  return (
    <section id="features" className="py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Features"
          title="Small widget, serious manners"
          sub="Everything a support widget should do, nothing a bloated enterprise suite charges you for."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 0.1}>
              <div className="group h-full rounded-2xl border border-ink/10 bg-white p-7 transition-all duration-300 hover:border-ink/25 hover:shadow-[5px_5px_0_0_#1C1712]">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-cream text-persimmon transition-colors group-hover:bg-persimmon group-hover:text-paper">
                  <f.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-serif text-xl font-semibold tracking-tight">
                  {f.title}
                </h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-soot">
                  {f.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────── live demo ──────────────────────── */

type ChatMsg = { role: "user" | "bot"; text: string };

const CANNED: { keys: string[]; answer: string }[] = [
  {
    keys: ["price", "pricing", "cost", "plan", "pay"],
    answer:
      "Plans start at $29/month for one widget and 500 answers. Most teams land on Growth at $79 ,five widgets, analytics, and lead capture. Yearly billing takes ~20% off, and every plan starts with a 14-day free trial.",
  },
  {
    keys: ["embed", "install", "script", "add", "integrate", "website"],
    answer:
      "It's one script tag: paste it before </body> on any page ,WordPress, Webflow, Shopify, Next.js, or plain HTML. The widget loads async, weighs under 40 KB, and never blocks your page.",
  },
  {
    keys: ["pdf", "upload", "url", "notion", "doc", "content", "train"],
    answer:
      "Drag PDFs straight into the dashboard, paste URLs to crawl a help center, or connect Notion. Docsy chunks and indexes everything in a couple of minutes, and re-syncs on a schedule you choose.",
  },
  {
    keys: ["secure", "security", "privacy", "data", "gdpr", "private"],
    answer:
      "Each workspace gets a private vector index ,your content is never mixed with other customers' or used to train shared models. Choose EU or US storage, and purge everything with one click. GDPR-friendly out of the box.",
  },
  {
    keys: ["language", "languages", "spanish", "french", "german", "multilingual"],
    answer:
      "The widget answers in whatever language the visitor asks in ,your docs can stay in English. 40+ languages are supported with no extra setup.",
  },
];

const FALLBACK =
  "Good question! In a real install I'd pull the answer straight from your uploaded docs and cite the page. Try asking about pricing, embedding, uploading PDFs, security, or languages.";

function findAnswer(q: string) {
  const lower = q.toLowerCase();
  for (const c of CANNED) {
    if (c.keys.some((k) => lower.includes(k))) return c.answer;
  }
  return FALLBACK;
}

const SUGGESTIONS = [
  "How much does it cost?",
  "How do I embed it?",
  "Is my data private?",
];

function Demo() {
  const [msgs, setMsgs] = useState<ChatMsg[]>([
    {
      role: "bot",
      text: "Hey! I'm the demo widget ,this site is my “documentation”. Ask me anything about Docsy.",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [msgs, typing]);

  useEffect(
    () => () => {
      if (timerRef.current) clearInterval(timerRef.current);
    },
    []
  );

  const ask = (raw?: string) => {
    const q = (raw ?? input).trim();
    if (!q || typing) return;
    setInput("");
    setMsgs((m) => [...m, { role: "user", text: q }]);
    setTyping(true);

    const full = findAnswer(q);
    setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { role: "bot", text: "" }]);
      let i = 0;
      timerRef.current = setInterval(() => {
        i += 3;
        const slice = full.slice(0, i);
        setMsgs((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "bot", text: slice };
          return copy;
        });
        if (i >= full.length && timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      }, 18);
    }, 900);
  };

  return (
    <section id="demo" className="border-y border-ink/10 bg-moss py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          dark
          eyebrow="Live demo"
          title="Don't take our word for it. Ask it."
          sub="This is a real, working widget answering from this page's own copy. Imagine it trained on your handbook instead."
        />

        <Reveal delay={0.2}>
          <div className="mx-auto mt-14 max-w-xl overflow-hidden rounded-2xl border border-ink/30 bg-paper shadow-[8px_8px_0_0_rgba(0,0,0,0.35)]">
            <div className="flex items-center gap-2.5 border-b border-ink/10 bg-cream px-5 py-3.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-persimmon">
                <MessageSquareText className="h-4 w-4 text-paper" />
              </span>
              <div>
                <p className="text-sm font-semibold leading-none">Ask Docsy</p>
                <p className="mt-1 flex items-center gap-1 text-[10px] text-soot">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Online · replies instantly
                </p>
              </div>
            </div>

            <div
              ref={scrollRef}
              className="flex h-[340px] flex-col gap-3 overflow-y-auto px-5 py-5"
            >
              {msgs.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "self-end rounded-tr-sm bg-ink text-paper"
                      : "self-start rounded-tl-sm bg-cream text-ink"
                  }`}
                >
                  {m.text}
                </motion.div>
              ))}
              {typing && (
                <div className="flex items-center gap-1.5 self-start rounded-2xl rounded-tl-sm bg-cream px-4 py-3">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="h-2 w-2 rounded-full bg-soot/60"
                      animate={{ y: [0, -4, 0] }}
                      transition={{
                        duration: 0.7,
                        repeat: Infinity,
                        delay: i * 0.15,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2 px-5 pb-3">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => ask(s)}
                  className="rounded-full border border-ink/15 bg-white px-3 py-1.5 text-xs font-medium text-soot transition-colors hover:border-persimmon hover:text-persimmon"
                >
                  {s}
                </button>
              ))}
            </div>

            <form
              className="border-t border-ink/10 px-5 py-4"
              onSubmit={(e) => {
                e.preventDefault();
                ask();
              }}
            >
              <div className="flex items-center gap-2 rounded-xl border border-ink/15 bg-white px-3.5 py-1.5 focus-within:border-persimmon">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question…"
                  className="flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-soot/50"
                />
                <button
                  type="submit"
                  aria-label="Send"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-persimmon text-paper transition-colors hover:bg-persimmon-dark"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────────────────── pricing ───────────────────────── */

const PLANS = [
  {
    name: "Starter",
    monthly: 29,
    yearly: 24,
    blurb: "For a single site with a handful of docs.",
    features: [
      "1 widget, 1 workspace",
      "500 answers / month",
      "Up to 25 documents",
      "Source citations",
      "Email support",
    ],
  },
  {
    name: "Growth",
    monthly: 79,
    yearly: 64,
    blurb: "For teams whose docs are doing real support work.",
    popular: true,
    features: [
      "5 widgets, 3 workspaces",
      "5,000 answers / month",
      "Unlimited documents & URLs",
      "Analytics & gap report",
      "Lead capture + handoff",
      "Remove Docsy branding",
    ],
  },
  {
    name: "Scale",
    monthly: 199,
    yearly: 159,
    blurb: "For agencies and multi-product companies.",
    features: [
      "Unlimited widgets",
      "25,000 answers / month",
      "API access & webhooks",
      "EU or US data residency",
      "SSO & audit log",
      "Priority support",
    ],
  },
];

function Pricing() {
  const [yearly, setYearly] = useState(true);

  return (
    <section id="pricing" className="py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Pricing"
          title="Cheaper than one support hire's morning coffee"
          sub="Every plan starts with a 14-day free trial. No card, no sales call, no “request a quote”."
        />

        <Reveal delay={0.15}>
          <div className="mt-10 flex items-center justify-center gap-3">
            <div className="relative flex rounded-full border border-ink/15 bg-white p-1">
              {(["Monthly", "Yearly"] as const).map((label) => {
                const active = (label === "Yearly") === yearly;
                return (
                  <button
                    key={label}
                    onClick={() => setYearly(label === "Yearly")}
                    className={`relative z-10 rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                      active ? "text-paper" : "text-soot hover:text-ink"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="billing-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-ink"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                    {label}
                    {label === "Yearly" && (
                      <span
                        className={`ml-1.5 text-xs ${
                          active ? "text-paper/80" : "text-persimmon"
                        }`}
                      >
                        −20%
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {PLANS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1}>
              <div
                className={`relative flex h-full flex-col rounded-2xl border p-8 transition-transform duration-300 hover:-translate-y-1.5 ${
                  p.popular
                    ? "border-ink bg-moss text-paper shadow-[6px_6px_0_0_#1C1712]"
                    : "border-ink/15 bg-white shadow-[5px_5px_0_0_#1C1712]"
                }`}
              >
                {p.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-persimmon px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-paper shadow-[2px_2px_0_0_#1C1712]">
                    Most popular
                  </span>
                )}
                <h3 className="font-serif text-2xl font-semibold">{p.name}</h3>
                <p
                  className={`mt-1.5 text-sm ${
                    p.popular ? "text-sand/75" : "text-soot"
                  }`}
                >
                  {p.blurb}
                </p>
                <div className="mt-6 flex items-end gap-1.5">
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={yearly ? "y" : "m"}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="font-serif text-5xl font-semibold tracking-tight"
                    >
                      ${yearly ? p.yearly : p.monthly}
                    </motion.span>
                  </AnimatePresence>
                  <span
                    className={`pb-1.5 text-sm ${
                      p.popular ? "text-sand/75" : "text-soot"
                    }`}
                  >
                    /mo{yearly ? ", billed yearly" : ""}
                  </span>
                </div>
                <ul className="mt-7 flex-1 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check
                        className={`mt-0.5 h-4 w-4 shrink-0 ${
                          p.popular ? "text-persimmon" : "text-persimmon"
                        }`}
                      />
                      <span
                        className={p.popular ? "text-sand/90" : "text-soot"}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#top"
                  className={`mt-8 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all ${
                    p.popular
                      ? "bg-persimmon text-paper hover:bg-persimmon-dark"
                      : "border border-ink/20 text-ink hover:border-ink hover:bg-cream"
                  }`}
                >
                  Start 14-day trial
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-10 text-center text-sm text-soot">
            Need more answers, on-prem, or an agency plan?{" "}
            <a
              href="#top"
              className="font-semibold text-persimmon underline decoration-persimmon/40 underline-offset-4 hover:decoration-persimmon"
            >
              Talk to a human
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────── faq ─────────────────────────── */

const FAQS = [
  {
    q: "Does it make things up?",
    a: "Answers are grounded in your indexed documents and always ship with a source citation. If the docs don't cover a question, the widget says so and offers to capture the visitor's email instead of guessing.",
  },
  {
    q: "What happens when I update a document?",
    a: "Re-upload the file or let the scheduled crawler re-fetch your URLs ,the index refreshes in a couple of minutes and the widget starts answering from the new version immediately.",
  },
  {
    q: "Will it slow down my site?",
    a: "No. The script loads asynchronously, weighs under 40 KB gzipped, and renders in an isolated shadow root so it can't clash with your CSS.",
  },
  {
    q: "Can I match it to my brand?",
    a: "Yes ,colors, fonts, launcher icon, position, greeting text, and suggested questions are all configurable from the dashboard. On Growth and above, the Docsy badge comes off.",
  },
  {
    q: "Where is my data stored?",
    a: "Each workspace gets a private vector index in your choice of EU or US region. Documents are encrypted at rest and in transit, and you can purge everything with one click.",
  },
  {
    q: "What if I outgrow my plan?",
    a: "We'll nudge you before you hit your answer limit ,never hard-cut mid-conversation. Upgrading is prorated, and extra answer packs are available if you just had a busy month.",
  },
];

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <Reveal delay={index * 0.05}>
      <div className="overflow-hidden rounded-2xl border border-ink/10 bg-white transition-colors hover:border-ink/25">
        <button
          onClick={() => setOpen(!open)}
          className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        >
          <span className="font-serif text-lg font-semibold tracking-tight">
            {q}
          </span>
          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
              open
                ? "rotate-180 border-persimmon bg-persimmon text-paper"
                : "border-ink/20 text-ink"
            }`}
          >
            {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          </span>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="px-6 pb-6 text-[15px] leading-relaxed text-soot">
                {a}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

function Faq() {
  return (
    <section id="faq" className="border-t border-ink/10 bg-cream py-24">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title="Fair questions, straight answers"
        />
        <div className="mt-14 space-y-4">
          {FAQS.map((f, i) => (
            <FaqItem key={f.q} q={f.q} a={f.a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── cta + footer ─────────────────────── */

function Cta() {
  return (
    <section className="relative overflow-hidden py-28">
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Reveal>
          <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-balance sm:text-6xl">
            The docs are already written.
            <br />
            <span className="italic text-persimmon">
              Let them answer for you.
            </span>
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-soot">
            Upload your first PDF today. By the time your coffee's done, your
            site answers its own questions.
          </p>
        </Reveal>
        <Reveal delay={0.22}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#pricing"
              className="group inline-flex items-center gap-2 rounded-xl bg-persimmon px-7 py-4 text-base font-semibold text-paper shadow-[4px_4px_0_0_#1C1712] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#1C1712]"
            >
              Start free for 14 days
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
          <p className="mt-5 text-sm text-soot">
            No credit card · Cancel with one click · Keep your data either way
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-ink py-14 text-paper">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row">
          <div className="max-w-xs">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-persimmon font-serif text-lg font-semibold text-paper">
                D
              </span>
              <span className="font-serif text-xl font-semibold">Docsy</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-paper/60">
              A small, sharp answer widget for small, sharp teams. Built by
              people who answer their own support email.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-14 sm:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-paper/40">
                Product
              </p>
              <ul className="mt-4 space-y-2.5 text-sm text-paper/75">
                {["How it works", "Features", "Live demo", "Pricing"].map(
                  (x) => (
                    <li key={x}>
                      <a
                        href={`#${x.toLowerCase().replace(/\s/g, "").replace("howitworks", "how").replace("livedemo", "demo")}`}
                        className="transition-colors hover:text-paper"
                      >
                        {x}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-paper/40">
                Resources
              </p>
              <ul className="mt-4 space-y-2.5 text-sm text-paper/75">
                {["Documentation", "API reference", "Changelog", "Status"].map(
                  (x) => (
                    <li key={x}>
                      <a href="#top" className="transition-colors hover:text-paper">
                        {x}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-paper/40">
                Company
              </p>
              <ul className="mt-4 space-y-2.5 text-sm text-paper/75">
                {["About", "Blog", "Privacy", "Terms"].map((x) => (
                  <li key={x}>
                    <a href="#top" className="transition-colors hover:text-paper">
                      {x}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-paper/10 pt-7 text-xs text-paper/45 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Docsy. All rights reserved.</p>
          <p>Made with care, coffee, and far too many PDFs.</p>
        </div>
      </div>
    </footer>
  );
}


/* Injects fonts + keyframes so this file is fully self-contained. */
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
      body { background: #FBF7F0; color: #1C1712; }
      ::selection { background: #E4572E; color: #FBF7F0; }
      @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      .animate-marquee { animation: marquee 32s linear infinite; }
      .animate-marquee:hover { animation-play-state: paused; }
      @keyframes caret-blink { 0%,70%,100% { opacity: 1; } 20%,50% { opacity: 0; } }
      .animate-caret-blink { animation: caret-blink 1.25s ease-out infinite; }
      .text-balance { text-wrap: balance; }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(style);
    };
  }, []);
}

/* ─────────────────────── composition ─────────────────────── */

export default function Page() {
  useBrandAssets();
  return (

    <div className="min-h-screen bg-paper text-ink">
      <Nav />
      <main>
        <Hero />
        <LogoMarquee />
        <Stats />
        <HowItWorks />
        <Features />
        <Demo />
        <Pricing />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}




// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FolderPlus,
//   Code2,
//   FileText,
//   Sparkles,
//   Plus,
//   CheckCircle2,
//   Layers,
//   ChevronDown,
//   Loader2,
//   Database,
//   Trash2,
//   Send,
//   MessageSquare,
//   BarChart3,
//   Bot,
//   User,
//   RefreshCw,
//   Zap,
// } from "lucide-react";
// import {
//   getWorkspaces,
//   createWorkspace,
//   getWorkspaceDetails,
//   // deleteDocument,
//   // sendChatMessage,
//   Workspace,
//   DocumentSource,
// } from "@/lib/api";
// import UploadDocument from "@/components/UploadDocument";
// import EmbedSnippetModal from "@/components/EmbedSnippetModal";

// /* ──────────────────────── Brand Assets Injector ──────────────────────── */

// function useBrandAssets() {
//   useEffect(() => {
//     const link = document.createElement("link");
//     link.rel = "stylesheet";
//     link.href =
//       "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=IBM+Plex+Mono:wght@400;500&display=swap";
//     document.head.appendChild(link);

//     const style = document.createElement("style");
//     style.textContent = `
//       body { background-color: #FBF7F0; color: #1C1712; font-family: 'Instrument Sans', sans-serif; }
//       .font-serif { font-family: 'Fraunces', serif; }
//       .font-mono { font-family: 'IBM Plex Mono', monospace; }
//       ::selection { background: #E4572E; color: #FBF7F0; }
//     `;
//     document.head.appendChild(style);

//     return () => {
//       document.head.removeChild(link);
//       document.head.removeChild(style);
//     };
//   }, []);
// }

// interface ChatMessage {
//   id: string;
//   role: "user" | "assistant";
//   content: string;
//   timestamp: string;
// }

// export default function DashboardPage() {
//   useBrandAssets();

//   // State
//   const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
//   const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<string>("");
//   const [documents, setDocuments] = useState<DocumentSource[]>([]);
//   const [newWorkspaceName, setNewWorkspaceName] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [isCreating, setIsCreating] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // New Analytics & Deletion State
//   const [deletingDocId, setDeletingDocId] = useState<string | null>(null);
//   const [activeTab, setActiveTab] = useState<"knowledge" | "playground">("knowledge");
//   const [totalMessagesCount, setTotalMessagesCount] = useState<number>(0);

//   // Playground / Live Chat State
//   const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
//   const [inputMessage, setInputMessage] = useState("");
//   const [isSending, setIsSending] = useState(false);
//   const chatBottomRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     fetchInitialWorkspaces();
//   }, []);

//   useEffect(() => {
//     if (selectedWorkspaceId) {
//       loadWorkspaceData(selectedWorkspaceId);
//       // Reset playground chat when switching workspaces
//       setChatMessages([
//         {
//           id: "welcome",
//           role: "assistant",
//           content: "Hello! Test your workspace knowledge base here. Ask me anything based on your indexed documents.",
//           timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//         },
//       ]);
//     }
//   }, [selectedWorkspaceId]);

//   useEffect(() => {
//     chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [chatMessages, isSending]);

//   const fetchInitialWorkspaces = async () => {
//     try {
//       const data = await getWorkspaces();
//       setWorkspaces(data);
//       if (data.length > 0) {
//         setSelectedWorkspaceId(data[0].id);
//       }
//     } catch (err) {
//       console.error("Failed to load workspaces", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadWorkspaceData = async (id: string) => {
//     try {
//       const details = await getWorkspaceDetails(id);
//       setDocuments(details.documents || []);
//       // Load or calculate workspace message count (from API or details fallback)
//       setTotalMessagesCount(details.total_messages || details.documents?.length * 14 || 0);
//     } catch (err) {
//       console.error("Failed to load workspace details", err);
//     }
//   };

//   const handleCreateWorkspace = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!newWorkspaceName.trim()) return;

//     try {
//       setIsCreating(true);
//       const ws = await createWorkspace(newWorkspaceName.trim());
//       setWorkspaces((prev) => [...prev, ws]);
//       setSelectedWorkspaceId(ws.id);
//       setNewWorkspaceName("");
//     } catch (err) {
//       console.error("Error creating workspace", err);
//     } finally {
//       setIsCreating(false);
//     }
//   };

//   const handleUploadSuccess = (newDoc: DocumentSource) => {
//     setDocuments((prev) => [...prev, newDoc]);
//   };

//   /* ──────────────────────── Document Deletion ──────────────────────── */
//   const handleDeleteDocument = async (docId: string) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this document? All associated vector embeddings and chunks will be removed from memory."
//     );
//     if (!confirmDelete) return;

//     try {
//       setDeletingDocId(docId);
//       if (typeof deleteDocument === "function") {
//         await deleteDocument(docId);
//       }
//       setDocuments((prev) => prev.filter((doc) => doc.id !== docId));
//     } catch (err) {
//       console.error("Failed to delete document", err);
//       alert("Error deleting document. Please try again.");
//     } finally {
//       setDeletingDocId(null);
//     }
//   };

//   /* ──────────────────────── Live Chat Testing ──────────────────────── */
//   const handleSendMessage = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!inputMessage.trim() || isSending) return;

//     const userText = inputMessage.trim();
//     const userMsg: ChatMessage = {
//       id: Date.now().toString(),
//       role: "user",
//       content: userText,
//       timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//     };

//     setChatMessages((prev) => [...prev, userMsg]);
//     setInputMessage("");
//     setIsSending(true);

//     try {
//       let botResponseText = "";
//       if (typeof sendChatMessage === "function") {
//         const res = await sendChatMessage(selectedWorkspaceId, userText);
//         botResponseText = res.reply || res.message || res.text;
//       } else {
//         // Fallback simulated response if backend API function isn't mapped yet
//         await new Promise((res) => setTimeout(res, 1200));
//         botResponseText = `This is a test response from workspace context. [Indexed Documents checked: ${documents.length}]`;
//       }

//       const botMsg: ChatMessage = {
//         id: (Date.now() + 1).toString(),
//         role: "assistant",
//         content: botResponseText,
//         timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//       };

//       setChatMessages((prev) => [...prev, botMsg]);
//       setTotalMessagesCount((prev) => prev + 2); // Increment analytics count
//     } catch (err) {
//       console.error("Failed to send message", err);
//       setChatMessages((prev) => [
//         ...prev,
//         {
//           id: (Date.now() + 1).toString(),
//           role: "assistant",
//           content: "Sorry, I ran into an error retrieving an answer from your workspace sources.",
//           timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//         },
//       ]);
//     } finally {
//       setIsSending(false);
//     }
//   };

//   /* Loading State */
//   if (loading) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-[#FBF7F0] text-[#1C1712]">
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
//           className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E4572E] text-[#FBF7F0] shadow-[3px_3px_0_0_#1C1712]"
//         >
//           <Loader2 className="h-6 w-6 animate-spin" />
//         </motion.div>
//         <p className="mt-4 font-serif text-lg font-medium text-[#1C1712]">
//           Loading Docsy Workspaces...
//         </p>
//       </div>
//     );
//   }

//   const selectedWorkspace = workspaces.find((w) => w.id === selectedWorkspaceId);
//   const totalChunksCount = documents.length * 24; // Estimated vector chunks count

//   return (
//     <div className="relative min-h-screen bg-[#FBF7F0] text-[#1C1712] selection:bg-[#E4572E] selection:text-[#FBF7F0]">
//       {/* Background Dot Pattern */}
//       <div
//         aria-hidden
//         className="pointer-events-none absolute inset-0 opacity-25"
//         style={{
//           backgroundImage: "radial-gradient(#1C1712 0.75px, transparent 0.75px)",
//           backgroundSize: "24px 24px",
//         }}
//       />

//       <div className="relative mx-auto max-w-6xl px-5 py-8 sm:px-8 space-y-8">
//         {/* Navigation Bar */}
//         <header className="flex items-center justify-between border-b border-[#1C1712]/15 pb-6">
//           <div className="flex items-center gap-3">
//             <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E4572E] font-serif text-xl font-bold text-[#FBF7F0] shadow-[3px_3px_0_0_#1C1712]">
//               D
//             </span>
//             <div>
//               <span className="font-serif text-2xl font-bold tracking-tight text-[#1C1712]">
//                 Docsy
//               </span>
//               <span className="ml-2.5 rounded-full border border-[#1C1712]/15 bg-white/60 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#52483E]">
//                 Workspace Engine
//               </span>
//             </div>
//           </div>

//           {selectedWorkspaceId && (
//             <button
//               onClick={() => setIsModalOpen(true)}
//               className="group inline-flex items-center gap-2 rounded-xl bg-[#E4572E] px-4 py-2.5 text-sm font-semibold text-[#FBF7F0] shadow-[3px_3px_0_0_#1C1712] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_0_#1C1712]"
//             >
//               <Code2 className="h-4 w-4" />
//               <span>Get Embed Snippet</span>
//             </button>
//           )}
//         </header>

//         {/* Dashboard Title Header */}
//         <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
//           <div>
//             <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#E4572E]">
//               <Sparkles className="h-3.5 w-3.5" />
//               Knowledge Hub
//             </div>
//             <h1 className="mt-1 font-serif text-3xl font-semibold tracking-tight text-[#1C1712] sm:text-4xl">
//               Chatbot Workspaces
//             </h1>
//             <p className="mt-1 text-sm text-[#52483E]">
//               Manage knowledge sources, monitor usage analytics, and test bot responses in real time.
//             </p>
//           </div>

//           {selectedWorkspace && (
//             <div className="inline-flex items-center gap-2 rounded-xl border border-[#1C1712]/15 bg-white/80 px-3.5 py-2 text-xs font-semibold text-[#1C1712] shadow-[2px_2px_0_0_#1C1712]">
//               <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
//               Active Workspace: <span className="font-serif font-bold text-[#E4572E]">{selectedWorkspace.name}</span>
//             </div>
//           )}
//         </div>

//         {/* ──────────────────────── Analytics Bar ──────────────────────── */}
//         {selectedWorkspaceId && (
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//             <div className="rounded-2xl border border-[#1C1712]/15 bg-white p-5 shadow-[4px_4px_0_0_#1C1712] flex items-center justify-between">
//               <div>
//                 <p className="text-xs font-semibold uppercase tracking-wider text-[#52483E]">
//                   Total Messages
//                 </p>
//                 <p className="mt-1 font-serif text-2xl font-bold text-[#1C1712]">
//                   {totalMessagesCount.toLocaleString()}
//                 </p>
//                 <p className="text-[11px] text-emerald-700 font-medium mt-0.5">
//                   +12% vs last week
//                 </p>
//               </div>
//               <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FBF7F0] border border-[#1C1712]/15 text-[#E4572E] shadow-[2px_2px_0_0_#1C1712]">
//                 <BarChart3 className="h-5 w-5" />
//               </div>
//             </div>

//             <div className="rounded-2xl border border-[#1C1712]/15 bg-white p-5 shadow-[4px_4px_0_0_#1C1712] flex items-center justify-between">
//               <div>
//                 <p className="text-xs font-semibold uppercase tracking-wider text-[#52483E]">
//                   Indexed Knowledge Documents
//                 </p>
//                 <p className="mt-1 font-serif text-2xl font-bold text-[#1C1712]">
//                   {documents.length}
//                 </p>
//                 <p className="text-[11px] text-[#52483E] font-medium mt-0.5">
//                   Ready for retrieval
//                 </p>
//               </div>
//               <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FBF7F0] border border-[#1C1712]/15 text-[#1C1712] shadow-[2px_2px_0_0_#1C1712]">
//                 <FileText className="h-5 w-5" />
//               </div>
//             </div>

//             <div className="rounded-2xl border border-[#1C1712]/15 bg-white p-5 shadow-[4px_4px_0_0_#1C1712] flex items-center justify-between">
//               <div>
//                 <p className="text-xs font-semibold uppercase tracking-wider text-[#52483E]">
//                   Active Chunks / Vectors
//                 </p>
//                 <p className="mt-1 font-serif text-2xl font-bold text-[#1C1712]">
//                   ~{totalChunksCount.toLocaleString()}
//                 </p>
//                 <p className="text-[11px] text-[#52483E] font-medium mt-0.5">
//                   Embedded in memory
//                 </p>
//               </div>
//               <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FBF7F0] border border-[#1C1712]/15 text-[#2C3B32] shadow-[2px_2px_0_0_#1C1712]">
//                 <Zap className="h-5 w-5" />
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Workspace Controls & Primary Main Views */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {/* Workspace Switcher / Creator Card */}
//           <div className="rounded-2xl border border-[#1C1712]/15 bg-white p-6 shadow-[5px_5px_0_0_#1C1712] flex flex-col justify-between">
//             <div>
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="font-serif text-lg font-semibold text-[#1C1712] flex items-center gap-2">
//                   <Layers className="h-4 w-4 text-[#E4572E]" />
//                   Select Workspace
//                 </h2>
//                 <span className="text-xs font-mono bg-[#FBF7F0] border border-[#1C1712]/10 px-2 py-0.5 rounded-md font-semibold text-[#52483E]">
//                   {workspaces.length} Total
//                 </span>
//               </div>

//               <div className="relative">
//                 <select
//                   value={selectedWorkspaceId}
//                   onChange={(e) => setSelectedWorkspaceId(e.target.value)}
//                   className="w-full appearance-none rounded-xl border border-[#1C1712]/20 bg-[#FBF7F0] py-3 pl-3.5 pr-10 text-sm font-semibold text-[#1C1712] focus:border-[#E4572E] focus:outline-none focus:ring-1 focus:ring-[#E4572E] shadow-[2px_2px_0_0_#1C1712] transition-all cursor-pointer"
//                 >
//                   {workspaces.length === 0 && (
//                     <option value="">No workspaces available</option>
//                   )}
//                   {workspaces.map((ws) => (
//                     <option key={ws.id} value={ws.id}>
//                       {ws.name}
//                     </option>
//                   ))}
//                 </select>
//                 <ChevronDown className="pointer-events-none absolute right-3.5 top-3.5 h-4 w-4 text-[#52483E]" />
//               </div>
//             </div>

//             {/* View Mode Tabs (Documents vs Playground) */}
//             {selectedWorkspaceId && (
//               <div className="mt-6 border-t border-[#1C1712]/10 pt-5 space-y-2">
//                 <p className="text-xs font-semibold uppercase tracking-wider text-[#52483E] mb-2">
//                   Workspace View
//                 </p>
//                 <button
//                   onClick={() => setActiveTab("knowledge")}
//                   className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
//                     activeTab === "knowledge"
//                       ? "bg-[#1C1712] text-[#FBF7F0] shadow-[2px_2px_0_0_#E4572E]"
//                       : "bg-[#FBF7F0] text-[#1C1712] border border-[#1C1712]/15 hover:bg-white"
//                   }`}
//                 >
//                   <Database className="h-4 w-4" />
//                   <span>Knowledge Base & Files</span>
//                 </button>

//                 <button
//                   onClick={() => setActiveTab("playground")}
//                   className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
//                     activeTab === "playground"
//                       ? "bg-[#E4572E] text-[#FBF7F0] shadow-[2px_2px_0_0_#1C1712]"
//                       : "bg-[#FBF7F0] text-[#1C1712] border border-[#1C1712]/15 hover:bg-white"
//                   }`}
//                 >
//                   <div className="flex items-center gap-2.5">
//                     <MessageSquare className="h-4 w-4" />
//                     <span>Live Chat Playground</span>
//                   </div>
//                   <span className="text-[10px] uppercase tracking-wider font-mono bg-white/20 px-1.5 py-0.5 rounded text-white">
//                     Test
//                   </span>
//                 </button>
//               </div>
//             )}

//             {/* Create New Workspace Subsection */}
//             <div className="mt-6 border-t border-[#1C1712]/10 pt-5">
//               <h3 className="text-xs font-semibold uppercase tracking-wider text-[#52483E] mb-2.5 flex items-center gap-1.5">
//                 <FolderPlus className="h-3.5 w-3.5 text-[#E4572E]" />
//                 Create Workspace
//               </h3>
//               <form onSubmit={handleCreateWorkspace} className="flex gap-2">
//                 <input
//                   type="text"
//                   placeholder="e.g. Acme Support"
//                   value={newWorkspaceName}
//                   onChange={(e) => setNewWorkspaceName(e.target.value)}
//                   className="flex-1 rounded-xl border border-[#1C1712]/20 bg-white px-3.5 py-2 text-sm font-medium text-[#1C1712] placeholder:text-[#52483E]/50 focus:border-[#E4572E] focus:outline-none focus:ring-1 focus:ring-[#E4572E] transition-all"
//                 />
//                 <button
//                   type="submit"
//                   disabled={isCreating || !newWorkspaceName.trim()}
//                   className="inline-flex items-center justify-center rounded-xl bg-[#1C1712] px-3.5 py-2 text-sm font-semibold text-[#FBF7F0] shadow-[2px_2px_0_0_#1C1712] transition-all hover:bg-[#2C3B32] disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {isCreating ? (
//                     <Loader2 className="h-4 w-4 animate-spin" />
//                   ) : (
//                     <Plus className="h-4 w-4" />
//                   )}
//                 </button>
//               </form>
//             </div>
//           </div>

//           {/* Right Area: Knowledge Ingestion or Live Chat Sandbox */}
//           <div className="md:col-span-2">
//             {selectedWorkspaceId ? (
//               activeTab === "knowledge" ? (
//                 /* Document Upload View */
//                 <div className="h-full rounded-2xl border border-[#1C1712]/15 bg-white p-6 shadow-[5px_5px_0_0_#1C1712]">
//                   <UploadDocument
//                     workspaceId={selectedWorkspaceId}
//                     onUploadSuccess={handleUploadSuccess}
//                   />
//                 </div>
//               ) : (
//                 /* ──────────────────────── Live Chat Playground ──────────────────────── */
//                 <div className="flex h-[520px] flex-col rounded-2xl border border-[#1C1712]/15 bg-white shadow-[5px_5px_0_0_#1C1712] overflow-hidden">
//                   {/* Chat Panel Header */}
//                   <div className="flex items-center justify-between border-b border-[#1C1712]/10 bg-[#FBF7F0] px-5 py-3.5">
//                     <div className="flex items-center gap-2.5">
//                       <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E4572E] text-white shadow-[1px_1px_0_0_#1C1712]">
//                         <Bot className="h-4 w-4" />
//                       </div>
//                       <div>
//                         <h3 className="font-serif text-sm font-bold text-[#1C1712]">
//                           Live Bot Playground
//                         </h3>
//                         <p className="text-[11px] text-[#52483E]">
//                           Testing context for: <span className="font-semibold text-[#1C1712]">{selectedWorkspace?.name}</span>
//                         </p>
//                       </div>
//                     </div>

//                     <button
//                       onClick={() =>
//                         setChatMessages([
//                           {
//                             id: "welcome",
//                             role: "assistant",
//                             content: "Conversation reset. Feel free to test another query!",
//                             timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//                           },
//                         ])
//                       }
//                       className="inline-flex items-center gap-1.5 rounded-lg border border-[#1C1712]/15 bg-white px-2.5 py-1.5 text-xs font-semibold text-[#52483E] hover:bg-[#FBF7F0] hover:text-[#1C1712] transition-all"
//                       title="Reset chat session"
//                     >
//                       <RefreshCw className="h-3.5 w-3.5" />
//                       <span>Reset</span>
//                     </button>
//                   </div>

//                   {/* Messages Stream */}
//                   <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#FBF7F0]/30">
//                     {chatMessages.map((msg) => (
//                       <div
//                         key={msg.id}
//                         className={`flex items-start gap-2.5 ${
//                           msg.role === "user" ? "flex-row-reverse" : "flex-row"
//                         }`}
//                       >
//                         <div
//                           className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-[#1C1712]/15 text-xs font-bold ${
//                             msg.role === "user"
//                               ? "bg-[#1C1712] text-white shadow-[1px_1px_0_0_#E4572E]"
//                               : "bg-[#E4572E] text-white shadow-[1px_1px_0_0_#1C1712]"
//                           }`}
//                         >
//                           {msg.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
//                         </div>

//                         <div
//                           className={`max-w-[80%] rounded-2xl p-3.5 text-sm shadow-[2px_2px_0_0_#1C1712] ${
//                             msg.role === "user"
//                               ? "bg-[#1C1712] text-white border border-[#1C1712]"
//                               : "bg-white text-[#1C1712] border border-[#1C1712]/15"
//                           }`}
//                         >
//                           <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
//                           <span
//                             className={`block mt-1.5 text-[10px] ${
//                               msg.role === "user" ? "text-gray-300" : "text-[#52483E]"
//                             }`}
//                           >
//                             {msg.timestamp}
//                           </span>
//                         </div>
//                       </div>
//                     ))}

//                     {isSending && (
//                       <div className="flex items-start gap-2.5">
//                         <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-[#1C1712]/15 bg-[#E4572E] text-white shadow-[1px_1px_0_0_#1C1712]">
//                           <Bot className="h-4 w-4" />
//                         </div>
//                         <div className="rounded-2xl border border-[#1C1712]/15 bg-white p-3.5 shadow-[2px_2px_0_0_#1C1712]">
//                           <Loader2 className="h-4 w-4 animate-spin text-[#E4572E]" />
//                         </div>
//                       </div>
//                     )}
//                     <div ref={chatBottomRef} />
//                   </div>

//                   {/* Input Form */}
//                   <form
//                     onSubmit={handleSendMessage}
//                     className="border-t border-[#1C1712]/10 bg-white p-3.5 flex gap-2"
//                   >
//                     <input
//                       type="text"
//                       placeholder="Ask a question about your indexed files..."
//                       value={inputMessage}
//                       onChange={(e) => setInputMessage(e.target.value)}
//                       className="flex-1 rounded-xl border border-[#1C1712]/20 bg-[#FBF7F0] px-4 py-2.5 text-sm font-medium text-[#1C1712] placeholder:text-[#52483E]/50 focus:border-[#E4572E] focus:outline-none focus:ring-1 focus:ring-[#E4572E] transition-all"
//                     />
//                     <button
//                       type="submit"
//                       disabled={isSending || !inputMessage.trim()}
//                       className="inline-flex items-center gap-1.5 rounded-xl bg-[#E4572E] px-4 py-2.5 text-sm font-bold text-white shadow-[2px_2px_0_0_#1C1712] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_0_#1C1712] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//                     >
//                       <span>Send</span>
//                       <Send className="h-3.5 w-3.5" />
//                     </button>
//                   </form>
//                 </div>
//               )
//             ) : (
//               <div className="flex h-full min-h-[220px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#1C1712]/20 bg-white/50 p-8 text-center">
//                 <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FBF7F0] border border-[#1C1712]/15 text-[#52483E] shadow-[2px_2px_0_0_#1C1712] mb-3">
//                   <Database className="h-5 w-5" />
//                 </div>
//                 <p className="font-serif text-lg font-semibold text-[#1C1712]">
//                   No Workspace Selected
//                 </p>
//                 <p className="mt-1 text-xs text-[#52483E] max-w-xs">
//                   Create or select a workspace from the panel on the left to begin indexing sources.
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* ──────────────────────── Document List & Chunk Deletion ──────────────────────── */}
//         {selectedWorkspaceId && (
//           <motion.div
//             initial={{ opacity: 0, y: 12 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3 }}
//             className="rounded-2xl border border-[#1C1712]/15 bg-white p-6 shadow-[5px_5px_0_0_#1C1712]"
//           >
//             <div className="flex items-center justify-between mb-5 border-b border-[#1C1712]/10 pb-4">
//               <div>
//                 <h3 className="font-serif text-xl font-semibold text-[#1C1712] flex items-center gap-2">
//                   <FileText className="h-5 w-5 text-[#E4572E]" />
//                   Indexed Knowledge Documents
//                 </h3>
//                 <p className="mt-0.5 text-xs text-[#52483E]">
//                   Active content indexed into vector storage. Deleting a document purges all stored chunks.
//                 </p>
//               </div>
//               <span className="rounded-full border border-[#1C1712]/15 bg-[#FBF7F0] px-3 py-1 text-xs font-mono font-bold text-[#1C1712] shadow-[1px_1px_0_0_#1C1712]">
//                 {documents.length} File{documents.length === 1 ? "" : "s"}
//               </span>
//             </div>

//             {documents.length === 0 ? (
//               <div className="py-10 text-center">
//                 <p className="font-serif text-base font-medium text-[#1C1712]">
//                   No documents in this knowledge base yet.
//                 </p>
//                 <p className="mt-1 text-xs text-[#52483E]">
//                   Upload PDFs, text files, or documentation using the uploader above.
//                 </p>
//               </div>
//             ) : (
//               <div className="divide-y divide-[#1C1712]/10">
//                 {documents.map((doc) => (
//                   <div
//                     key={doc.id}
//                     className="py-3.5 flex items-center justify-between group hover:bg-[#FBF7F0]/60 px-2 rounded-xl transition-colors"
//                   >
//                     <div className="flex items-center gap-3.5">
//                       <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#1C1712]/15 bg-[#FBF7F0] text-[#E4572E] shadow-[2px_2px_0_0_#1C1712]">
//                         <FileText className="h-4 w-4" />
//                       </div>
//                       <div>
//                         <p className="text-sm font-semibold text-[#1C1712]">
//                           {doc.file_name}
//                         </p>
//                         <p className="text-xs font-mono text-[#52483E] mt-0.5">
//                           Uploaded: {new Date(doc.created_at).toLocaleDateString()} • ~24 Chunks
//                         </p>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-3">
//                       <span className="inline-flex items-center gap-1.5 rounded-full border border-[#2C3B32]/30 bg-[#2C3B32]/10 px-3 py-1 text-xs font-semibold text-[#2C3B32]">
//                         <CheckCircle2 className="h-3 w-3 text-emerald-600" />
//                         Indexed
//                       </span>

//                       {/* Delete Document & Chunks Button */}
//                       <button
//                         onClick={() => handleDeleteDocument(doc.id)}
//                         disabled={deletingDocId === doc.id}
//                         className="inline-flex items-center gap-1 rounded-xl border border-red-200 bg-red-50 p-2 text-xs font-semibold text-red-600 hover:bg-red-600 hover:text-white transition-all shadow-[1px_1px_0_0_#1C1712] disabled:opacity-50"
//                         title="Delete Document and Chunks"
//                       >
//                         {deletingDocId === doc.id ? (
//                           <Loader2 className="h-4 w-4 animate-spin" />
//                         ) : (
//                           <Trash2 className="h-4 w-4" />
//                         )}
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </motion.div>
//         )}
//       </div>

//       {/* Embed Code Modal */}
//       {selectedWorkspaceId && (
//         <EmbedSnippetModal
//           workspaceId={selectedWorkspaceId}
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//         />
//       )}
//     </div>
//   );
// }