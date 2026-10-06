"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";
import logo from "../../public/logo.webp";

const links = [
  { href: "#why", label: "Why Triumph" },
  { href: "#opportunity", label: "Opportunity" },
  { href: "#who", label: "Who It's For" },
  { href: "#how", label: "How It Works" },
];

/** Brand logo. `white` renders it as a white silhouette for dark backgrounds. */
export function Logo({ white = false, className = "h-10 w-auto sm:h-11" }: { white?: boolean; className?: string }) {
  return (
    <a href="#top" aria-label="Triumph Holidays home" className="flex shrink-0 items-center">
      <Image
        src={logo}
        alt="Triumph Holidays"
        priority
        className={`${className} transition-[filter] duration-500 ${white ? "brightness-0 invert" : ""}`}
      />
    </a>
  );
}

export function Navbar() {
  const { scrollY, scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  // Solid white bar once scrolled or while the mobile menu is open; transparent over the hero.
  const solid = scrolled || open;

  return (
    <>
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-linear-to-r from-sun to-coral"
      />
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6">
        <nav
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-500 sm:px-6 ${
            solid
              ? "border border-ink/5 bg-white/90 shadow-xl shadow-ink/10 backdrop-blur-xl"
              : "border border-transparent bg-transparent"
          }`}
        >
          <Logo white={!solid} />
          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    solid
                      ? "text-ink/70 hover:bg-sun/5 hover:text-sun"
                      : "text-white/85 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <a
              href="#apply"
              className={`hidden rounded-full px-5 py-2.5 text-sm font-semibold shadow-md transition hover:shadow-lg sm:inline-block ${
                solid
                  ? "bg-linear-to-r from-sun to-coral text-white shadow-sun/30"
                  : "bg-white text-sun shadow-black/10"
              }`}
            >
              Apply Now
            </a>
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className={`grid h-10 w-10 place-items-center rounded-full lg:hidden ${
                solid ? "text-ink hover:bg-ink/5" : "text-white hover:bg-white/10"
              }`}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="mx-auto mt-2 max-w-7xl rounded-2xl border border-ink/5 bg-white p-3 shadow-2xl shadow-ink/15 lg:hidden"
            >
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="block rounded-xl px-4 py-3 text-base font-medium text-ink/80 hover:bg-sun/5 hover:text-sun"
                >
                  {l.label}
                </motion.a>
              ))}
              <a
                href="#apply"
                onClick={() => setOpen(false)}
                className="mt-2 block rounded-xl bg-linear-to-r from-sun to-coral px-4 py-3 text-center font-semibold text-white"
              >
                Apply Now
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
