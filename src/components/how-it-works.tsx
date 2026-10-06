"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { MessageSquareText, Rocket, Settings2, Sprout, UsersRound, type LucideIcon } from "lucide-react";
import { Reveal, SectionLabel } from "./ui";

const steps: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: MessageSquareText, title: "Tell Us About Yourself", text: "Share your details, location and business goals." },
  { icon: UsersRound, title: "Meet Our Franchise Team", text: "Understand the opportunity, model and support available." },
  { icon: Settings2, title: "Set Up Your Business", text: "Get the required onboarding, training and business guidance." },
  { icon: Rocket, title: "Launch & Start Selling", text: "Take Triumph Holidays to your market and start building your customer base." },
  { icon: Sprout, title: "Grow With Us", text: "Continue your journey with ongoing support and access to our travel ecosystem." },
];

export function HowItWorks() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.6"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="how" className="relative overflow-x-clip bg-sand py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center">
          <Reveal>
            <SectionLabel index="07">How it works</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              From First Enquiry to <span className="text-sea">Your First Customer</span>
            </h2>
          </Reveal>
        </div>

        <ol ref={ref} className="relative mt-20">
          <div className="absolute bottom-0 left-6 top-0 w-0.5 bg-ink/10 md:left-1/2 md:-translate-x-1/2" />
          <motion.div
            style={{ scaleY }}
            className="absolute bottom-0 left-6 top-0 w-0.5 origin-top bg-linear-to-b from-sun to-coral md:left-1/2 md:-translate-x-1/2"
          />

          {steps.map(({ icon: Icon, title, text }, i) => {
            const right = i % 2 === 1;
            return (
              <li key={title} className="relative mb-12 last:mb-0 md:mb-16">
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-120px" }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  className="absolute left-6 top-6 z-10 grid h-12 w-12 -translate-x-1/2 place-items-center rounded-full border-4 border-sand bg-linear-to-br from-sun to-coral text-white shadow-lg md:left-1/2"
                >
                  <Icon className="h-5 w-5" />
                </motion.span>
                <motion.div
                  initial={{ opacity: 0, x: right ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-120px" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className={`ml-16 md:ml-0 md:w-[calc(50%-3rem)] ${right ? "md:ml-auto" : ""}`}
                >
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="rounded-3xl border border-ink/5 bg-white p-6 shadow-sm transition-shadow hover:shadow-xl sm:p-8"
                  >
                    <span className="font-display text-sm font-bold text-sun">
                      STEP 0{i + 1}
                    </span>
                    <h3 className="mt-2 font-display text-2xl font-semibold">{title}</h3>
                    <p className="mt-2 leading-relaxed text-ink/65">{text}</p>
                  </motion.div>
                </motion.div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
