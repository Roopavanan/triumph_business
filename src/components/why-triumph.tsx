"use client";

import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import {
  BadgeCheck,
  GraduationCap,
  LifeBuoy,
  Luggage,
  Megaphone,
  MonitorSmartphone,
  type LucideIcon,
} from "lucide-react";
import { Reveal, SectionLabel } from "./ui";

const features: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: BadgeCheck, title: "Brand", text: "A professional travel brand to build customer confidence." },
  { icon: Luggage, title: "Products", text: "Domestic and international holidays ready to take to your customers." },
  { icon: MonitorSmartphone, title: "Technology", text: "Digital tools to help manage your travel business efficiently." },
  { icon: Megaphone, title: "Marketing", text: "Strategies and support to help you attract and convert customers." },
  { icon: GraduationCap, title: "Training", text: "Practical guidance to help you understand and operate the business." },
  { icon: LifeBuoy, title: "Ongoing Support", text: "A team to support you as your business grows." },
];

const struggles = ["Suppliers", "Destinations", "Pricing", "Technology", "Marketing", "Operations", "Customer acquisition"];

function SpotlightCard({ icon: Icon, title, text, index }: (typeof features)[number] & { index: number }) {
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const bg = useMotionTemplate`radial-gradient(320px circle at ${mx}px ${my}px, rgba(245,0,7,0.22), transparent 70%)`;

  return (
    <Reveal delay={(index % 3) * 0.1} className="h-full">
      <motion.div
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          mx.set(e.clientX - r.left);
          my.set(e.clientY - r.top);
        }}
        onPointerLeave={() => {
          mx.set(-200);
          my.set(-200);
        }}
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-ink-soft p-7"
      >
        <motion.div style={{ background: bg }} className="pointer-events-none absolute inset-0" />
        <span className="absolute right-6 top-6 font-display text-5xl font-bold text-white/5 transition-colors group-hover:text-sun/15">
          0{index + 1}
        </span>
        <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-linear-to-br from-sun to-coral text-white shadow-lg shadow-sun/20 transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110">
          <Icon className="h-6 w-6" />
        </span>
        <h3 className="relative mt-6 font-display text-2xl font-semibold text-white">{title}</h3>
        <p className="relative mt-2 leading-relaxed text-white/65">{text}</p>
      </motion.div>
    </Reveal>
  );
}

export function WhyTriumph() {
  return (
    <section id="why" className="grain relative overflow-hidden bg-ink py-24 text-white sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-sea/30 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <div>
            <Reveal>
              <SectionLabel index="03" dark>
                Why Triumph
              </SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
                Don&apos;t Build Everything <span className="text-gradient">From Scratch.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="text-lg leading-relaxed text-white/70">
              Starting a travel business alone means figuring out all of this on your own:
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {struggles.map((s, i) => (
                <motion.span
                  key={s}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.06 }}
                  className="rounded-full border border-white/15 px-3.5 py-1.5 text-sm text-white/60 line-through decoration-coral/70"
                >
                  {s}
                </motion.span>
              ))}
            </div>
            <p className="mt-5 text-lg font-medium text-white">
              With Triumph Holidays, you start with a stronger foundation.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <SpotlightCard key={f.title} {...f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
