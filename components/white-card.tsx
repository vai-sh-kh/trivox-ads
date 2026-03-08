"use client";

import { motion } from "motion/react";
import { type ReactNode } from "react";

export type CardVariant = "white" | "yellow" | "pink" | "mint";

const VARIANT_STYLES: Record<
  CardVariant,
  { card: string; tab: string; heading: string; body: string }
> = {
  white: {
    card: "bg-white/95",
    tab: "bg-emerald-400/95",
    heading: "text-brand-green",
    body: "text-gray-600",
  },
  yellow: {
    card: "bg-amber-200/95",
    tab: "bg-emerald-500/95",
    heading: "text-brand-green",
    body: "text-gray-700",
  },
  pink: {
    card: "bg-rose-200/95",
    tab: "bg-rose-400/95",
    heading: "text-brand-green",
    body: "text-gray-700",
  },
  mint: {
    card: "bg-emerald-100/95",
    tab: "bg-teal-400/95",
    heading: "text-brand-green",
    body: "text-gray-700",
  },
};

export interface WhiteCardProps {
  /** Small tab label above the card (e.g. "Individuals") */
  tabLabel?: string;
  /** Icon or logo shown at top of card */
  icon?: ReactNode;
  heading: string;
  body: string;
  /** Button label; if set, card shows a CTA button */
  buttonLabel?: string;
  onButtonClick?: () => void;
  /** Optional className for the card container */
  className?: string;
  /** Compact mode for embedding in hero (smaller padding, text) */
  compact?: boolean;
  /** When true, skip entrance animation (e.g. when card is driven by scroll/motion path) */
  noEntranceAnimation?: boolean;
  /** Card color variant (white, yellow, pink, mint) */
  variant?: CardVariant;
}

export function WhiteCard({
  tabLabel,
  icon,
  heading,
  body,
  buttonLabel,
  onButtonClick,
  className = "",
  compact = false,
  noEntranceAnimation = false,
  variant = "white",
}: WhiteCardProps) {
  const styles = VARIANT_STYLES[variant];
  return (
    <motion.div
      className={`relative ${className}`}
      initial={noEntranceAnimation ? false : { opacity: 0, y: 24, rotate: -2 }}
      animate={
        noEntranceAnimation ? undefined : { opacity: 1, y: 0, rotate: 0 }
      }
      transition={
        noEntranceAnimation
          ? undefined
          : {
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }
      }
      whileHover={{
        y: -4,
        rotate: 0.5,
        transition: { duration: 0.25 },
      }}
    >
      {tabLabel && (
        <motion.div
          className={`absolute -top-1 -left-2 z-10 flex items-center gap-1.5 rounded-md ${styles.tab} px-2.5 py-1 shadow-md`}
          style={{ transform: "rotate(-4deg)" }}
          initial={noEntranceAnimation ? false : { opacity: 0, x: -8 }}
          animate={noEntranceAnimation ? undefined : { opacity: 1, x: 0 }}
          transition={
            noEntranceAnimation ? undefined : { delay: 0.2, duration: 0.4 }
          }
        >
          <span className="text-[10px] font-semibold uppercase tracking-wide text-black">
            {tabLabel}
          </span>
        </motion.div>
      )}

      <div
        className={`relative overflow-hidden rounded-2xl ${styles.card} shadow-xl backdrop-blur-sm ${
          compact ? "px-4 py-5 sm:px-5 sm:py-6" : "px-6 py-8 sm:px-8 sm:py-10"
        }`}
        style={{ transform: "rotate(-1deg)" }}
      >
        {icon && (
          <motion.div
            className="mb-4 flex justify-center"
            initial={noEntranceAnimation ? false : { scale: 0.8, opacity: 0 }}
            animate={noEntranceAnimation ? undefined : { scale: 1, opacity: 1 }}
            transition={
              noEntranceAnimation ? undefined : { delay: 0.15, duration: 0.4 }
            }
          >
            {icon}
          </motion.div>
        )}

        <h3
          className={`font-bold ${styles.heading} ${
            compact ? "text-lg sm:text-xl" : "text-xl sm:text-2xl"
          } text-center`}
        >
          {heading}
        </h3>

        <p
          className={`mt-3 ${styles.body} ${
            compact ? "text-xs sm:text-sm" : "text-sm sm:text-base"
          } leading-relaxed`}
        >
          {body}
        </p>

        {buttonLabel && (
          <motion.button
            type="button"
            onClick={onButtonClick}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-logo-purple px-4 py-3 font-semibold text-white shadow-md transition-colors hover:opacity-90"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {buttonLabel}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
