"use client";

import { useRef, useEffect, useCallback, ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * GSAP MotionPath scroll animation - matches CodePen:
 * https://codepen.io/GreenSock/pen/raerLaK
 *
 * A floating box travels along a curved path through section markers
 * as the user scrolls from the first section to the last.
 */
export function MotionPathScroll({ children }: { children: ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ctxRef = useRef<ReturnType<typeof gsap.context> | null>(null);

  const createTimeline = useCallback(() => {
    ctxRef.current?.revert();

    const box = boxRef.current;
    const wrapper = wrapperRef.current;
    if (!box || !wrapper) return;
    if (typeof window !== "undefined" && window.innerWidth < 1024) return;

    const sections = sectionRefs.current.filter(Boolean);
    if (sections.length < 2) return;

    const firstSection = sections[0];
    const lastSection = sections[sections.length - 1];

    ctxRef.current = gsap.context(() => {
      const boxStartRect = box.getBoundingClientRect();

      // All sections except the first (markers for the path)
      const markerSections = sections.slice(1);

      // Zigzag: alternate left/right per section, stay at vertical center of each
      const points = markerSections.map((section, i) => {
        const r = section!.getBoundingClientRect();
        const isRight = i % 2 === 0; // section 1→right, 2→left, 3→right...
        const xOffset = isRight ? r.width * 0.75 : r.width * 0.25; // 25%/75% - zigzag but centered
        return {
          x: r.left + xOffset - (boxStartRect.left + boxStartRect.width / 2),
          y:
            r.top + r.height / 2 - (boxStartRect.top + boxStartRect.height / 2),
        };
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: firstSection,
          start: "clamp(top center)",
          endTrigger: lastSection,
          end: "clamp(top center)",
          scrub: 0.5, // Snappy sync for both top→bottom and bottom→top scroll
          invalidateOnRefresh: true,
        },
      });

      tl.to(box, {
        duration: 1,
        ease: "none",
        motionPath: {
          path: points,
          curviness: 1.5,
        },
      });
    }, wrapper);

    return () => {
      ctxRef.current?.revert();
    };
  }, []);

  useEffect(() => {
    createTimeline();
    // Refresh ScrollTrigger after ScrollSmoother/layout is ready (works both scroll directions)
    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 100);
    window.addEventListener("resize", createTimeline);
    return () => {
      clearTimeout(refreshTimer);
      window.removeEventListener("resize", createTimeline);
      ctxRef.current?.revert();
    };
  }, [createTimeline]);

  const childArray = Array.isArray(children)
    ? (children as ReactNode[])
    : [children];

  return (
    <div ref={wrapperRef} className="relative">
      {/* Floating box: visible only on desktop (lg+) so mobile gets same design without the ornament */}
      <div
        ref={boxRef}
        className="hidden lg:flex absolute top-0 left-0 w-4 h-4 rounded-full bg-brand-purple border-2 border-white shadow-lg pointer-events-none z-10"
        aria-hidden
      />
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
