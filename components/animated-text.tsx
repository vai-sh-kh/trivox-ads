"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";

interface AnimatedTextProps {
  children: string;
  className?: string;
  as?: "p" | "span" | "h2" | "h3";
  /** When provided, animation spans the full section scroll and completes when section is fully scrolled */
  sectionRef?: React.RefObject<HTMLElement | null>;
  /** When true (and sectionRef set), animation completes when section top reaches viewport top */
  completeWhenSectionAtTop?: boolean;
}

/**
 * React component that replicates the GSAP text animation from index.html:
 * - Splits text into characters using SplitText
 * - Animates each character with random yPercent and rotation on scroll
 * - Uses back.out easing for a bouncy entrance
 */
export function AnimatedText({
  children,
  className = "",
  as: Component = "p",
  sectionRef,
  completeWhenSectionAtTop = false,
}: AnimatedTextProps) {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const split = SplitText.create(el, {
        type: "chars",
        charsClass: "animated-text-char",
      });

      const trigger = sectionRef?.current ?? el;

      const useSectionAtTop = completeWhenSectionAtTop && sectionRef?.current;
      const start = useSectionAtTop
        ? "top bottom"
        : sectionRef
          ? "top 88%"
          : "top 100%";
      const end = useSectionAtTop
        ? "top top"
        : sectionRef
          ? "top 28%"
          : "top 30%";

      split.chars.forEach((char) => {
        gsap.from(char, {
          yPercent: "random(-200, 200)",
          rotation: "random(-20, 20)",
          opacity: 0,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger,
            start,
            end,
            scrub: 1.2,
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, [children, sectionRef, completeWhenSectionAtTop]);

  return (
    <Component className={className}>
      <span ref={textRef}>{children}</span>
    </Component>
  );
}
