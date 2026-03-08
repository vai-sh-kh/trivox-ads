"use client";

import { useRef, useEffect, useCallback, ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * A card config defines one floating WhiteCard that travels along
 * its own curved GSAP MotionPath between two section markers.
 *
 * fromSection / toSection are indices into the children array.
 *
 * positionHint lets you nudge which horizontal side the card starts on
 * within the fromSection:
 *   "left"  → card starts at ~25% of the section width
 *   "right" → card starts at ~75% of the section width (default)
 */
export type MotionCardConfig = {
  /** The card JSX to render (e.g. <WhiteCard ... />) */
  card: ReactNode;
  /** Section index where the card animation starts (0-based, matches children order) */
  fromSection: number;
  /** Section index where the card animation ends */
  toSection: number;
  /** Which side of the fromSection the card starts on */
  positionHint?: "left" | "right";
};

interface MotionPathScrollProps {
  children: ReactNode;
  /** Cards that travel along curved paths between sections */
  cards?: MotionCardConfig[];
}

/**
 * MotionPathScroll
 *
 * Wraps an arbitrary number of page sections and drives N floating cards
 * along individual curved GSAP MotionPaths.  Each card has its own
 * ScrollTrigger that scrubs across the span of its assigned sections.
 *
 * On viewports < 1024 px wide the animated cards are hidden entirely
 * (they are decorative / desktop-only).
 */
export function MotionPathScroll({
  children,
  cards = [],
}: MotionPathScrollProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  // One ref per card element
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ctxRef = useRef<ReturnType<typeof gsap.context> | null>(null);

  const buildTimelines = useCallback(() => {
    ctxRef.current?.revert();

    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    if (typeof window !== "undefined" && window.innerWidth < 1024) return;

    const sections = sectionRefs.current.filter(Boolean);
    if (sections.length < 2) return;

    ctxRef.current = gsap.context(() => {
      const wrapperRect = wrapper.getBoundingClientRect();

      cards.forEach((cfg, cardIdx) => {
        const cardEl = cardRefs.current[cardIdx];
        if (!cardEl) return;

        const fromSec = sections[cfg.fromSection];
        const toSec = sections[cfg.toSection];
        if (!fromSec || !toSec) return;

        const cardSize = cardEl.getBoundingClientRect();
        const hint = cfg.positionHint ?? "right";

        // ── Compute the start position (inside fromSection) ──────────────
        const fromRect = fromSec.getBoundingClientRect();
        const startX =
          fromRect.left +
          (hint === "left" ? fromRect.width * 0.1 : fromRect.width * 0.7) -
          wrapperRect.left -
          cardSize.width / 2;
        const startY =
          fromRect.top +
          fromRect.height * 0.45 -
          wrapperRect.top -
          cardSize.height / 2;

        // ── Snap card to its starting coordinates ────────────────────────
        gsap.set(cardEl, { x: startX, y: startY });

        // ── Build path waypoints (fromSection centre → intermediate → toSection centre) ──
        const toRect = toSec.getBoundingClientRect();

        // Alternate horizontal side for the destination
        const toHint = hint === "left" ? "right" : "left";
        const endX =
          toRect.left +
          (toHint === "left" ? toRect.width * 0.1 : toRect.width * 0.7) -
          wrapperRect.left -
          cardSize.width / 2;
        const endY =
          toRect.top +
          toRect.height * 0.45 -
          wrapperRect.top -
          cardSize.height / 2;

        // Mid-point: horizontal opposite side, vertically between the two sections
        const midX =
          hint === "left"
            ? wrapperRect.width * 0.72 - cardSize.width / 2
            : wrapperRect.width * 0.08;
        const midY = (startY + endY) / 2;

        const points = [
          { x: midX, y: midY },
          { x: endX, y: endY },
        ];

        // ── ScrollTrigger that spans fromSection → toSection ─────────────
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: fromSec,
            start: "clamp(top center)",
            endTrigger: toSec,
            end: "clamp(top center)",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        tl.to(cardEl, {
          duration: 1,
          ease: "none",
          motionPath: {
            path: points,
            curviness: 1.4,
            type: "cubic",
          },
        });
      });
    }, wrapper);
  }, [cards]);

  useEffect(() => {
    buildTimelines();
    // Wrap in void arrow so the callback satisfies GSAP's Callback type (no return value)
    const onRefresh = () => {
      buildTimelines();
    };
    ScrollTrigger.addEventListener("refresh", onRefresh);
    const t = setTimeout(() => ScrollTrigger.refresh(), 500);
    window.addEventListener("resize", onRefresh);
    return () => {
      clearTimeout(t);
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      window.removeEventListener("resize", onRefresh);
      ctxRef.current?.revert();
    };
  }, [buildTimelines]);

  const childArray = Array.isArray(children)
    ? (children as ReactNode[])
    : [children];

  return (
    <div ref={wrapperRef} className="relative">
      {/* Render each card as an absolutely positioned layer inside the wrapper */}
      {cards.map((cfg, i) => (
        <div
          key={i}
          ref={(el) => {
            cardRefs.current[i] = el;
          }}
          className="hidden lg:flex absolute top-0 left-0 w-[300px] min-w-[300px] pointer-events-none z-20 items-center justify-center"
          aria-hidden
        >
          <div className="pointer-events-auto w-full">{cfg.card}</div>
        </div>
      ))}

      {/* Section wrappers — each gets a ref for path calculation */}
      {childArray.map((child, i) => (
        <div
          key={i}
          ref={(el) => {
            sectionRefs.current[i] = el;
          }}
          className="relative"
          data-motion-marker
        >
          {child}
        </div>
      ))}
    </div>
  );
}

/** Client-only wrapper for the home page. No floating cards. */
export function MotionPathScrollWithHomeCards({
  children,
}: {
  children: ReactNode;
}) {
  return <MotionPathScroll>{children}</MotionPathScroll>;
}
