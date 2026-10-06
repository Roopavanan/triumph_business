"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { images } from "@/lib/images";
import { SectionLabel } from "./ui";

const lines = [
  "No more simply working for someone else's growth.",
  "Build your own customer relationships.",
  "Create your own local presence.",
  "Grow your own network.",
  "And become the travel expert people in your market turn to.",
];

function Line({ text, i, progress }: { text: string; i: number; progress: MotionValue<number> }) {
  const start = 0.12 + i * 0.12;
  const opacity = useTransform(progress, [start, start + 0.1], [0.15, 1]);
  const x = useTransform(progress, [start, start + 0.1], [-20, 0]);
  return (
    <motion.p
      style={{ opacity, x }}
      className="font-display text-lg font-semibold leading-snug text-white sm:text-4xl sm:leading-tight"
    >
      {text}
    </motion.p>
  );
}

export function Emotional() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
  const finaleOpacity = useTransform(scrollYProgress, [0.75, 0.88], [0, 1]);
  const finaleY = useTransform(scrollYProgress, [0.75, 0.88], [30, 0]);

  return (
    <section ref={ref} className="relative h-[320vh] bg-ink">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <motion.div style={{ scale }} className="absolute inset-0">
          <Image src={images.halong} alt="" fill sizes="100vw" className="object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-ink/75" />
        <div className="absolute inset-0 bg-linear-to-r from-ink via-ink/60 to-transparent" />

        <div className="relative mx-auto w-full max-w-7xl px-4 pt-16 sm:px-6">
          <SectionLabel index="06" dark>
            Your own business
          </SectionLabel>
          <h2 className="mt-4 max-w-4xl font-display text-3xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl">
            Imagine Having a Business You Can <span className="text-gradient">Call Your Own.</span>
          </h2>
          <div className="mt-6 max-w-3xl space-y-3 border-l-2 sm:mt-10 sm:space-y-4 border-sun/50 pl-6">
            {lines.map((l, i) => (
              <Line key={l} text={l} i={i} progress={scrollYProgress} />
            ))}
          </div>
          <motion.div
            style={{ opacity: finaleOpacity, y: finaleY }}
            className="mt-6 inline-flex flex-col gap-1 rounded-2xl border border-white/15 bg-white/10 px-5 py-4 sm:mt-10 sm:px-6 sm:py-5 backdrop-blur-xl sm:flex-row sm:gap-3"
          >
            <span className="font-display text-base font-semibold text-white sm:text-lg">
              Triumph Holidays gives you the platform.
            </span>
            <span className="font-display text-base font-semibold text-sun-light sm:text-lg">
              Your ambition drives the journey.
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
