"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface ScrollRevealSectionProps {
  children: React.ReactNode;
  className?: string;
  /** Outer element. Use "div" when wrapping components that already render a section (avoids nested sections). */
  as?: "section" | "article" | "div";
  /** Background color of the sliding reveal panels (default white). */
  revealBg?: "white" | "black";
  /** When the section reveal starts (trigger position). */
  start?: string;
  /** When the section reveal ends (for scrub range). */
  end?: string;
  /** Scrub: true = tied to scroll, number = catch-up time in seconds, false = play once. */
  scrub?: number | boolean;
}

/**
 * Section reveal using the same animation as index.html:
 * outer/inner wrappers slide (yPercent 100 / -100 → 0), content reveals (yPercent 15 → 0, opacity).
 * Triggered by ScrollTrigger when section enters viewport.
 */
export function ScrollRevealSection({
  children,
  className = "",
  as: Component = "div",
  revealBg = "white",
  start = "top 85%",
  end = "top 40%",
  scrub = 1,
}: ScrollRevealSectionProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const outer = outerRef.current;
    const inner = innerRef.current;
    const content = contentRef.current;
    if (!root || !outer || !inner || !content) return;

    const ctx = gsap.context(() => {
      // Initial state matching index.html: outer pushed down, inner pulled up, content offset + hidden
      // Must run before paint to avoid flash of unrevealed content
      gsap.set(outer, { yPercent: 100 });
      gsap.set(inner, { yPercent: -100 });
      gsap.set(content, { yPercent: 15, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start,
          end,
          scrub,
          invalidateOnRefresh: true,
        },
      });

      // Index.html: outer/inner and image all start at 0; heading chars at 0.2
      tl.fromTo(
        [outer, inner],
        {
          yPercent: (i: number) => (i === 0 ? 100 : -100),
        },
        {
          yPercent: 0,
          duration: 1.25,
          ease: "power1.inOut",
        },
        0,
      ).fromTo(
        content,
        { yPercent: 15, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.25,
          ease: "power1.inOut",
        },
        0, // same start as outer/inner (index: fromTo(images[index], ..., 0))
      );
    }, root);

    return () => ctx.revert();
  }, [start, end, scrub]);

  const bgClass = revealBg === "black" ? "bg-black" : "bg-white";

  return (
    <Component
      ref={rootRef as React.Ref<HTMLDivElement>}
      className={`overflow-hidden ${className}`.trim()}
    >
      <div
        ref={outerRef}
        className={`w-full overflow-hidden ${bgClass}`}
        style={{ willChange: "transform" }}
      >
        <div
          ref={innerRef}
          className={`w-full overflow-hidden ${bgClass}`}
          style={{ willChange: "transform" }}
        >
          <div ref={contentRef}>{children}</div>
        </div>
      </div>
    </Component>
  );
}
