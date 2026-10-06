"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Briefcase, Heart, Rocket, Store, UserCheck, type LucideIcon } from "lucide-react";
import { images } from "@/lib/images";
import { Reveal, SectionLabel } from "./ui";

const personas: { icon: LucideIcon; title: string; text: string; img: string }[] = [
  {
    icon: Rocket,
    title: "Aspiring Entrepreneurs",
    text: "Start a business in one of the world's most exciting industries.",
    img: images.mountains,
  },
  {
    icon: Store,
    title: "Existing Travel Agents",
    text: "Expand your offerings and strengthen your business with a recognized travel ecosystem.",
    img: images.plane,
  },
  {
    icon: Briefcase,
    title: "Business Owners",
    text: "Add travel to your existing portfolio and unlock a new revenue opportunity.",
    img: images.venice,
  },
  {
    icon: UserCheck,
    title: "Travel Professionals",
    text: "Move from working in travel to building something of your own.",
    img: images.backpacker,
  },
  {
    icon: Heart,
    title: "People With a Passion for Travel",
    text: "Turn your interest in travel into a serious business opportunity.",
    img: images.lake,
  },
];

export function WhoItsFor() {
  const [active, setActive] = useState(0);
  const p = personas[active];

  return (
    <section id="who" className="relative bg-sand-dark/60 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <Reveal>
            <SectionLabel index="05">Who it&apos;s for</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              Built for People Who Want <span className="text-sea">More From Travel</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.15fr]">
          <div className="flex flex-col gap-2" role="tablist" aria-label="Who it's for">
            {personas.map(({ icon: Icon, title }, i) => {
              const isActive = active === i;
              return (
                <Reveal key={title} delay={i * 0.06}>
                  <button
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    className="relative flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-left"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="persona-bg"
                        className="absolute inset-0 rounded-2xl bg-white shadow-xl shadow-ink/10"
                        transition={{ type: "spring", stiffness: 350, damping: 32 }}
                      />
                    )}
                    <span
                      className={`relative grid h-12 w-12 shrink-0 place-items-center rounded-xl transition-colors duration-300 ${
                        isActive ? "bg-linear-to-br from-sun to-coral text-white" : "bg-ink/5 text-ink/60"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span
                      className={`relative font-display text-lg font-semibold transition-colors sm:text-xl ${
                        isActive ? "text-ink" : "text-ink/50"
                      }`}
                    >
                      {title}
                    </span>
                    <motion.span
                      animate={{ x: isActive ? 0 : -8, opacity: isActive ? 1 : 0 }}
                      className="relative ml-auto text-sun"
                    >
                      →
                    </motion.span>
                  </button>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.2}>
            <div className="relative h-[420px] overflow-hidden rounded-[2rem] bg-ink sm:h-full sm:min-h-[460px]">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0"
                >
                  <Image src={p.img} alt="" fill sizes="(min-width:1024px) 55vw, 100vw" className="object-cover" />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 sm:p-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={p.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35 }}
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sun-light">
                      For {p.title}
                    </p>
                    <p className="mt-3 max-w-lg font-display text-2xl font-semibold leading-snug text-white sm:text-3xl">
                      {p.text}
                    </p>
                  </motion.div>
                </AnimatePresence>
                <div className="mt-6 flex gap-1.5">
                  {personas.map((x, i) => (
                    <button
                      key={x.title}
                      aria-label={`Show ${x.title}`}
                      onClick={() => setActive(i)}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        i === active ? "w-10 bg-sun" : "w-4 bg-white/30 hover:bg-white/60"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
