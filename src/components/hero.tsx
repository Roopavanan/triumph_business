"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { Compass, Megaphone, Sparkles, Users } from "lucide-react";
import { images } from "@/lib/images";
import { CtaButton } from "./ui";

const headline = ["Turn", "Your", "Passion", "for", "Travel", "Into", "a", "Business"];
const accent = new Set(["Passion", "Travel"]);

const floatCards = [
  { icon: Compass, title: "Ready-to-sell holidays", sub: "Domestic & international", pos: "right-[6%] top-[24%]", delay: 1.2 },
  { icon: Megaphone, title: "Marketing support", sub: "Attract & convert customers", pos: "right-[18%] top-[52%]", delay: 1.4 },
  { icon: Users, title: "Expert guidance", sub: "Training & ongoing support", pos: "right-[4%] top-[72%]", delay: 1.6 },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.3]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="grain relative flex min-h-[100svh] items-center overflow-hidden bg-ink"
    >
      <motion.div style={{ scale, y }} className="absolute inset-0">
        <Image
          src={images.heroBeach}
          alt="Turquoise tropical beach"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-linear-to-r from-ink via-ink/75 to-ink/20" />
      <div className="absolute inset-0 bg-linear-to-t from-ink via-transparent to-ink/40" />

      <motion.div
        style={{ y: contentY, opacity: fade }}
        className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-24 pt-32 sm:px-6"
      >
        

        <h1 className="mt-6 max-w-4xl font-display text-[2.6rem] font-bold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-[5.4rem]">
          {headline.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden pb-2 align-bottom">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className={`inline-block ${accent.has(word) ? "text-gradient" : ""}`}
              >
                {word}&nbsp;
              </motion.span>
            </span>
          ))}
          <span className="inline-block overflow-hidden pb-2 align-bottom">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block text-white/90"
            >
              With Triumph Holidays
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-white/75 sm:text-xl"
        >
          Build your own travel business with the backing of an established travel brand,
          ready-to-sell travel products, technology, marketing support and expert guidance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.15 }}
          className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center"
        >
          <CtaButton href="#apply">Become a Franchise Partner</CtaButton>
          <p className="flex items-center gap-2 text-sm text-white/70">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sun opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-sun" />
            </span>
            Limited opportunities available across selected locations.
          </p>
        </motion.div>
      </motion.div>

      {floatCards.map(({ icon: Icon, title, sub, pos, delay }, i) => (
        <motion.div
          key={title}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay }}
          className={`absolute z-10 hidden xl:block ${pos}`}
        >
          <div
            className="animate-float flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-4 pr-6 text-white shadow-2xl backdrop-blur-xl"
            style={{ animationDelay: `${i * 1.2}s` }}
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-linear-to-br from-sun to-coral">
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold">{title}</p>
              <p className="text-xs text-white/60">{sub}</p>
            </div>
          </div>
        </motion.div>
      ))}

      <motion.a
        href="#hook"
        aria-label="Scroll down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 sm:block"
      >
        <span className="flex h-12 w-7 justify-center rounded-full border-2 border-white/40 pt-2">
          <motion.span
            animate={{ y: [0, 14, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="h-2 w-1 rounded-full bg-white"
          />
        </span>
      </motion.a>
    </section>
  );
}
