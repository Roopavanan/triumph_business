"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Handshake, Plane, TrendingUp } from "lucide-react";
import { Reveal, SectionLabel } from "./ui";

const paragraph =
  "Travel is no longer just about booking tickets and hotels. Customers are looking for someone they can trust to plan their entire journey. With Triumph Holidays, you get the opportunity to become that trusted travel partner in your market.";

const pillars = [
  { icon: Handshake, text: "Build relationships." },
  { icon: Plane, text: "Sell experiences." },
  { icon: TrendingUp, text: "Grow your own business." },
];

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  );
}

export function Hook() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = paragraph.split(" ");

  return (
    <section id="hook" className="relative overflow-hidden bg-sand py-24 sm:py-36">
      <div className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-sun/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-10 h-96 w-96 rounded-full bg-sea-light/20 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        <Reveal>
          <SectionLabel index="02">The big idea</SectionLabel>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
            What If Your Next Business Was in{" "}
            <span className="relative inline-block text-sea">
              Travel?
              <svg
                viewBox="0 0 200 20"
                aria-hidden
                className="absolute -bottom-2 left-0 w-full"
              >
                <motion.path
                  d="M2 14 Q 60 2 100 10 T 198 6"
                  fill="none"
                  stroke="var(--color-sun)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </svg>
            </span>
          </h2>
        </Reveal>

        <p
          ref={ref}
          className="mt-12 font-display text-2xl font-medium leading-snug text-ink sm:text-4xl"
        >
          {words.map((w, i) => (
            <Word
              key={i}
              progress={scrollYProgress}
              range={[i / words.length, (i + 1) / words.length]}
            >
              {w}
            </Word>
          ))}
        </p>

        <div className="mt-16 grid gap-4 sm:grid-cols-3">
          {pillars.map(({ icon: Icon, text }, i) => (
            <Reveal key={text} delay={i * 0.12}>
              <motion.div
                whileHover={{ y: -6 }}
                className="flex items-center gap-4 rounded-2xl border border-ink/5 bg-white p-5 shadow-sm transition-shadow hover:shadow-xl"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-sea/10 text-sea">
                  <Icon className="h-6 w-6" />
                </span>
                <span className="font-display text-lg font-semibold">{text}</span>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
