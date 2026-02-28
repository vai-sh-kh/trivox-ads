"use client";

import { useRef, useEffect } from "react";
import { gsap, SplitText } from "@/lib/gsap";

interface LineRevealTextProps {
  children: string;
  className?: string;
  as?: "p" | "span" | "div";
}

/**
 * React component that replicates the line reveal effect from test.html:
 * - Splits text into words and lines using SplitText
 * - Masks lines for overflow
 * - Each line animates up (yPercent: 100 -> 0) with stagger on page load
 */
export function LineRevealText({
  children,
  className = "",
  as: Component = "p",
}: LineRevealTextProps) {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.set(el, { opacity: 1 });

      const split = SplitText.create(el, {
        type: "words,lines",
        linesClass: "line-reveal-line",
        autoSplit: true,
        mask: "lines",
      });

      gsap.from(split.lines, {
        duration: 0.6,
        yPercent: 100,
        opacity: 0,
        stagger: 0.1,
        ease: "expo.out",
        delay: 0.2,
      });
    }, el);

    return () => ctx.revert();
  }, [children]);

  return (
    <Component className={className}>
      <span ref={textRef} style={{ opacity: 0 }} className="block">
        {children}
      </span>
    </Component>
  );
}
