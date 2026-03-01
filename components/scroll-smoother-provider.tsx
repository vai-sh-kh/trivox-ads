"use client";

import { useEffect, useState } from "react";
import { ScrollSmoother } from "@/lib/gsap";
import { Navbar } from "@/components/navbar";
import { MenuOverlay } from "@/components/menu-overlay";

function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState<boolean | null>(null);
  useEffect(() => {
    const prefersCoarse = window.matchMedia("(pointer: coarse)").matches;
    setIsTouch(prefersCoarse);
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
    if (isTouch === true) return;
    if (isTouch === null) return;

    ScrollSmoother.create({
      smooth: 2,
      effects: true,
      normalizeScroll: true,
    });

    return () => {
      ScrollSmoother.get()?.kill();
    };
  }, [isTouch]);

  return (
    <>
      <Navbar onMenuClick={() => setIsMenuOpen(true)} />
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <div id="smooth-wrapper" className={isTouch ? "overflow-x-hidden" : ""}>
        <div id="smooth-content">{children}</div>
      </div>
    </>
  );
}
