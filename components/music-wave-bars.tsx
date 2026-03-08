"use client";

import { motion } from "motion/react";

const BAR_COUNT = 5;
const WAVE_DURATION = 1.4;

interface MusicWaveBarsProps {
  /** Tailwind color class, e.g. bg-white, bg-[#FF0000] */
  className?: string;
  /** Bar width class */
  barWidth?: string;
  /** Bar/container height class */
  height?: string;
  /** Gap between bars */
  gap?: string;
  /** Animation duration in seconds (default 0.8) */
  duration?: number;
  /** Number of bars (default 5). Use 4 to skip the first. */
  barCount?: number;
}

export function MusicWaveBars({
  className = "bg-white",
  barWidth = "w-3",
  height = "h-24",
  gap = "gap-3",
  duration = WAVE_DURATION,
  barCount = BAR_COUNT,
}: MusicWaveBarsProps) {
  return (
    <div className={`flex ${gap} items-end ${height}`}>
      {Array.from({ length: barCount }).map((_, i) => (
        <motion.div
          key={i}
          className={`${barWidth} ${height} ${className} rounded-full origin-bottom shrink-0`}
          initial={{ scaleY: 0.4 }}
          animate={{
            scaleY: [0.4, 1, 0.5, 0.9, 0.4],
          }}
          transition={{
            duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );
}
