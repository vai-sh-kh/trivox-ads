"use client";

import { motion } from "motion/react";

export function FeaturedSection() {
  return (
    <section className="px-4 pb-24">
      <div className="max-w-[1920px] mx-auto px-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-[21/9] w-full rounded-[1rem] overflow-hidden flex items-center justify-center bg-zinc-900"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/home-banner.mp4" type="video/mp4" />
          </video>
          <div className="flex items-center gap-8 text-white scale-110 md:scale-150 relative z-10">
            <div className="flex gap-3 items-end h-24">
              {[0.5, 0.8, 1, 0.9, 0.6].map((h, i) => (
                <div
                  key={i}
                  className="w-3 bg-white rounded-full"
                  style={{ height: `${h * 100}%` }}
                />
              ))}
            </div>
            <span className="text-8xl md:text-9xl font-medium tracking-tighter">
              vividly
            </span>
          </div>
          <div className="absolute inset-0 bg-black/30 pointer-events-none z-[1]" />
        </motion.div>
      </div>
    </section>
  );
}
