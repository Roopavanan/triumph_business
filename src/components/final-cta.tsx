"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { images } from "@/lib/images";
import { Logo } from "./navbar";
import { CtaButton, Reveal } from "./ui";

export function FinalCta() {
  return (
    <section className="bg-sand px-4 py-24 sm:px-6 sm:py-32">
      <Reveal>
        <div className="grain relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-ink px-6 py-20 text-center sm:px-12 sm:py-28">
          <motion.div
            initial={{ scale: 1.15 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image src={images.island} alt="" fill sizes="100vw" className="object-cover opacity-35" />
          </motion.div>
          <div className="absolute inset-0 bg-linear-to-b from-ink/60 via-ink/70 to-ink" />

          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sun-light">
              Become a Triumph Holidays Franchise Partner
            </p>
            <h2 className="mx-auto mt-6 max-w-4xl font-display text-4xl font-bold leading-[1.02] tracking-tight text-white sm:text-7xl">
              Your Next Business Journey <span className="text-gradient">Starts Here.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-white/70">
              One brand. One opportunity. A business you can build for yourself.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4">
              <CtaButton href="#apply">Apply Now</CtaButton>
              <p className="text-sm text-white/60">Let&apos;s explore what&apos;s possible for you.</p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-ink/5 bg-white px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
        <Logo className="h-12 w-auto" />
        <p className="text-sm text-ink/50">
          © {new Date().getFullYear()} Triumph Holidays. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
