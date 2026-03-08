"use client";

import { useRef, useState, useCallback } from "react";
import { ParticleBackground } from "@/components/particle-background";

/**
 * Shared layout for inner pages (about, contact, digital-marketing):
 * - White background with subtle grid pattern
 * - Scattered dots (particle) annotation
 * - Optional decorative circle (bottom-right)
 * - Children rendered as floating left-aligned content block
 */
export function InnerPageLayout({
  children,
  className = "",
  showDecorativeCircle = true,
  centerContent = false,
  contentClassName = "",
}: {
  children: React.ReactNode;
  className?: string;
  /** Set false to hide the purple circle annotation (e.g. on about page) */
  showDecorativeCircle?: boolean;
  /** Center the content block (e.g. for about page) */
  centerContent?: boolean;
  /** Extra class for the content wrapper (e.g. max-w-7xl for wider) */
  contentClassName?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);

  const updateCursor = useCallback((clientX: number, clientY: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setCursor({
      x: clientX - rect.left,
      y: clientY - rect.top,
    });
  }, []);

  return (
    <main
      ref={sectionRef}
      className={`selection:bg-black selection:text-white overflow-x-hidden bg-white min-h-screen relative ${className}`}
      onMouseMove={(e) => updateCursor(e.clientX, e.clientY)}
      onMouseLeave={() => setCursor(null)}
      onTouchMove={(e) => {
        const t = e.touches[0];
        if (t) updateCursor(t.clientX, t.clientY);
      }}
      onTouchEnd={() => setCursor(null)}
    >
      {/* Grid pattern — same as about hero */}
      <div
        className="absolute inset-0 section-grid-pattern section-grid-fade opacity-70 pointer-events-none z-0"
        aria-hidden
      />
      {/* Scattered dots annotation */}
      <ParticleBackground
        className="opacity-[0.5]"
        cursor={cursor}
        chaseSpeed={0.14}
        pullStrength={0.03}
      />
      {showDecorativeCircle && (
        <div
          className="absolute bottom-[15%] right-[12%] w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-brand-purple/40 flex items-center justify-center pointer-events-none z-0"
          aria-hidden
        >
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-brand-purple" />
        </div>
      )}

      {/* Floating content block — left-aligned or centered, constrained width (mobile-first) */}
      <div className="relative z-10 max-w-[1920px] mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-12 sm:pb-16 md:pb-24 min-h-[85vh] flex flex-col justify-center">
        <div
          className={`${contentClassName || "max-w-4xl"} ${centerContent ? "mx-auto text-center" : ""}`}
        >
          {children}
        </div>
      </div>
    </main>
  );
}
