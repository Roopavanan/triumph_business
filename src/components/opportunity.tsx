"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { images } from "@/lib/images";
import { CtaButton, Reveal, SectionLabel } from "./ui";

const tripTypes = [
  { label: "Family Holiday", img: images.heroBeach },
  { label: "Honeymoon", img: images.nusaPenida },
  { label: "International Vacation", img: images.paris },
  { label: "Pilgrimage", img: images.baliTemple },
  { label: "Group Tour", img: images.cappadocia },
  { label: "Customized Itinerary", img: images.planning },
];

const youKnow = ["You know your market.", "You understand your customers.", "You have the ambition."];

export function Opportunity() {
  const [active, setActive] = useState(0);
  const trip = tripTypes[active];

  return (
    <section id="opportunity" className="relative overflow-x-clip bg-sand py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <Reveal>
            <SectionLabel index="04">The opportunity</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              Your City. Your Customers.{" "}
              <span className="text-sea">Your Travel Business.</span>
            </h2>
          </Reveal>

          <ul className="mt-10 space-y-3">
            {youKnow.map((line, i) => (
              <motion.li
                key={line}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="flex items-center gap-4 font-display text-xl font-semibold sm:text-2xl"
              >
                <span className="h-px w-8 bg-sun" />
                {line}
              </motion.li>
            ))}
          </ul>

          <Reveal delay={0.2}>
            <p className="mt-8 text-lg leading-relaxed text-ink/70">
              Now imagine having a complete travel ecosystem behind you. Give your customers more
              reasons to travel, while building a business of your own.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-ink/50">
              Tap a trip type to explore
            </p>
            <div className="mt-3 flex flex-wrap gap-2" role="tablist" aria-label="Trip types">
              {tripTypes.map((t, i) => (
                <button
                  key={t.label}
                  role="tab"
                  aria-selected={active === i}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    active === i ? "text-white" : "bg-white text-ink/70 hover:text-ink"
                  }`}
                >
                  {active === i && (
                    <motion.span
                      layoutId="trip-pill"
                      className="absolute inset-0 rounded-full bg-ink"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative">{t.label}</span>
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.4} className="mt-10">
            <CtaButton href="#apply">Explore Franchise Opportunities</CtaButton>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl shadow-ink/20">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={trip.label}
                initial={{ opacity: 0, scale: 1.12 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={trip.img}
                  alt={trip.label}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-linear-to-t from-ink/80 via-transparent to-transparent" />
            <div className="absolute inset-x-6 bottom-6 flex items-end justify-between text-white">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/60">Sell more with</p>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={trip.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    className="font-display text-3xl font-bold"
                  >
                    {trip.label}
                  </motion.p>
                </AnimatePresence>
              </div>
              <span className="font-display text-sm text-white/60">
                0{active + 1} / 0{tripTypes.length}
              </span>
            </div>
          </div>
          <div className="absolute -bottom-6 -left-6 -z-10 h-40 w-40 rounded-[2rem] bg-sun/30" />
          <div className="absolute -right-6 -top-6 -z-10 h-32 w-32 rounded-full border-2 border-dashed border-sea/40" />
        </Reveal>
      </div>
    </section>
  );
}
