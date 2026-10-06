"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";

/** Sticky "Apply" bar on small screens, shown after the hero and hidden while the form is on screen. */
export function MobileCta() {
  const { scrollY } = useScroll();
  const [pastHero, setPastHero] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => setPastHero(v > window.innerHeight * 0.8));

  useEffect(() => {
    const el = document.getElementById("apply");
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setFormVisible(e.isIntersecting), { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {pastHero && !formVisible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed inset-x-3 bottom-3 z-40 sm:hidden"
        >
          <a
            href="#apply"
            className="flex items-center justify-between rounded-2xl bg-ink/95 p-2 pl-5 text-white shadow-2xl backdrop-blur-xl"
          >
            <span className="text-sm font-medium">Start your travel business</span>
            <span className="rounded-xl bg-linear-to-r from-sun to-coral px-4 py-2.5 text-sm font-semibold">
              Apply Now
            </span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
