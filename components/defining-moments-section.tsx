"use client";

import { motion } from "motion/react";
import { useRef } from "react";
import { LineRevealText } from "@/components/line-reveal-text";

export function DefiningMomentsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white py-32 overflow-hidden"
    >
      {/* Grid: 3 vertical + 3 horizontal lines */}
      <div className="absolute inset-0 pointer-events-none max-w-[1400px] mx-auto px-6">
        <div className="w-full h-full relative">
          {[1, 2, 3].map((i) => (
            <div
              key={`v-${i}`}
              className="absolute top-0 bottom-0 w-px bg-zinc-300"
              style={{ left: `${(i / 4) * 100}%` }}
            />
          ))}
          {[1, 2, 3].map((i) => (
            <div
              key={`h-${i}`}
              className="absolute left-0 right-0 h-px bg-zinc-300"
              style={{ top: `${(i / 4) * 100}%` }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative">
        <div className="flex flex-col items-center pt-14 text-center max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-4 text-[clamp(2.5rem,8vw,7rem)] font-black leading-[0.85] tracking-wide mb-16 uppercase text-zinc-900"
          >
            <span>THE CREATIVE</span>
            <span>MARKETING</span>
            <span>AGENCY FOR</span>
            <span>DEFINING</span>
            <span>MOMENTS</span>
          </motion.h2>

          <LineRevealText
            className="text-lg md:text-2xl text-zinc-800 mb-16 leading-relaxed max-w-3xl font-medium block"
            as="p"
          >
            Companies call us when everything&apos;s on the line, from Series A
            launches to global repositioning. We move brands through their most
            critical inflection points.
          </LineRevealText>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-brand-red text-white px-12 py-6 rounded-full font-black text-sm uppercase tracking-widest hover:bg-red-700 transition-all shadow-xl shadow-red-500/20"
          >
            GROW YOUR BUSINESS
          </motion.button>
        </div>
      </div>
    </section>
  );
}
