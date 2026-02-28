"use client";

/**
 * BouncyWave - Reusable morphing SVG wave component
 * Scroll-triggered animation: curved path morphs to flat when entering viewport.
 * Uses GSAP MorphSVGPlugin + ScrollTrigger.
 * To use: import from @/components/bouncy-wave and add to any section.
 * Props: gradientStart, gradientEnd, className, showNoise
 */
import { useRef, useEffect, useId } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const PATH_DOWN = "M0-0.3C0-0.3,464,156,1139,156S2278-0.3,2278-0.3V683H0V-0.3z";
const PATH_CENTER = "M0-0.3C0-0.3,464,0,1139,0s1139-0.3,1139-0.3V683H0V-0.3z";

export interface BouncyWaveProps {
  /** Gradient start color (default: #fec5fb) */
  gradientStart?: string;
  /** Gradient end color (default: #00bae2) */
  gradientEnd?: string;
  /** Additional class names for the wrapper */
  className?: string;
  /** Whether to show noise overlay (default: true) */
  showNoise?: boolean;
}

export function BouncyWave({
  gradientStart = "#fec5fb",
  gradientEnd = "#00bae2",
  className = "",
  showNoise = true,
}: BouncyWaveProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const gradId = useId().replace(/:/g, "-");

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const path = pathRef.current;
    if (!wrapper || !path) return;

    const scrollTrigger = ScrollTrigger.create({
      trigger: wrapper,
      start: "top bottom",
      toggleActions: "play pause resume reverse",
      onEnter: (self) => {
        const velocity = self.getVelocity();
        const variation = Math.min(Math.max(velocity / 10000, -0.5), 0.5);

        gsap.fromTo(
          path,
          { morphSVG: PATH_DOWN },
          {
            duration: 2,
            morphSVG: PATH_CENTER,
            ease: `elastic.out(${1 + variation}, ${1 - variation})`,
            overwrite: "auto",
          },
        );
      },
    });

    return () => {
      scrollTrigger.kill();
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={`absolute left-0 right-0 bottom-0 w-full ${className}`}
    >
      <svg
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 2278 683"
        className="h-full w-full block overflow-visible"
      >
        <defs>
          <linearGradient
            id={gradId}
            x1="0"
            y1="0"
            x2="2278"
            y2="683"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.2" stopColor={gradientStart} />
            <stop offset="0.8" stopColor={gradientEnd} />
          </linearGradient>
        </defs>
        <path ref={pathRef} fill={`url(#${gradId})`} d={PATH_DOWN} />
      </svg>
      {showNoise && (
        <div
          className="absolute inset-0 top-0 pointer-events-none mix-blend-color-dodge"
          style={{
            backgroundImage: 'url("https://assets.codepen.io/16327/noise.png")',
          }}
        />
      )}
    </div>
  );
}
