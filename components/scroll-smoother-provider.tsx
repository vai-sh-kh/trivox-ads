"use client";

import { useEffect, useState } from "react";
import { ScrollSmoother } from "@/lib/gsap";
import { Navbar } from "@/components/navbar";
import { MenuOverlay } from "@/components/menu-overlay";

function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState<boolean | null>(null);
  useEffect(() => {
    const prefersCoarse = window.matchMedia("(pointer: coarse)").matches;
    const isNarrow = typeof window !== "undefined" && window.innerWidth < 1024;
    setIsTouch(prefersCoarse || isNarrow);
  }, []);
  return isTouch;
}

export function ScrollSmootherProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isTouch = useIsTouchDevice();

  useEffect(() => {
    if (isTouch !== false) return;

    ScrollSmoother.create({
      smooth: 2,
      effects: true,
      normalizeScroll: true,
    });

    return () => {
      ScrollSmoother.get()?.kill();
    };
  }, [isTouch]);

  // On touch/narrow: use plain wrapper (no smooth-* ids) so document scroll works.
  // ScrollSmoother never runs on these devices and can't apply overflow/height locks.
  const useNativeScroll = isTouch === true || isTouch === null;

  return (
    <>
      <Navbar onMenuClick={() => setIsMenuOpen(true)} />
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      {useNativeScroll ? (
        <div className="scroll-container-touch overflow-x-hidden min-h-full">
          {children}
        </div>
      ) : (
        <div id="smooth-wrapper">
          <div id="smooth-content">{children}</div>
        </div>
      )}
    </>
  );
}
