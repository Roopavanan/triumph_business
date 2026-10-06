"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, type HTMLMotionProps } from "motion/react";
import { ArrowRight } from "lucide-react";

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  ...rest
}: { delay?: number; y?: number } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function SectionLabel({
  index,
  children,
  dark = false,
  onRed = false,
}: {
  index: string;
  children: React.ReactNode;
  dark?: boolean;
  onRed?: boolean;
}) {
  return (
    <div
      className={`inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] ${
        onRed ? "text-white" : dark ? "text-sun-light" : "text-sea"
      }`}
    >
      <span
        className={`grid h-7 w-7 place-items-center rounded-full border text-[10px] ${
          onRed || dark ? "border-white/30" : "border-sea/30"
        }`}
      >
        {index}
      </span>
      {children}
    </div>
  );
}

export function CtaButton({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "light" | "ghost";
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 250, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 250, damping: 18 });

  const styles = {
    primary:
      "bg-linear-to-r from-sun to-coral text-white shadow-lg shadow-sun/30 hover:shadow-xl hover:shadow-sun/40",
    light: "bg-white text-ink shadow-lg shadow-black/10",
    ghost: "border border-white/30 text-white backdrop-blur hover:bg-white/10",
  }[variant];

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.25);
        y.set((e.clientY - r.top - r.height / 2) * 0.35);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileTap={{ scale: 0.96 }}
      className={`group relative inline-flex items-center gap-3 rounded-full px-7 py-4 text-base font-semibold transition-shadow focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sun ${styles} ${className}`}
    >
      {children}
      <span className="grid h-7 w-7 place-items-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-1">
        <ArrowRight className="h-4 w-4" />
      </span>
    </motion.a>
  );
}
