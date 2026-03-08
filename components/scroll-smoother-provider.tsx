"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { MenuOverlay } from "@/components/menu-overlay";
import { LenisProvider } from "@/components/lenis-provider";
import { MotionRevealProvider } from "@/components/motion-reveal-provider";

export function ScrollSmootherProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <LenisProvider>
      <Navbar onMenuClick={() => setIsMenuOpen(true)} />
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <div
        className={`scroll-container-touch overflow-x-hidden min-h-full w-full max-w-[100vw] ${isMenuOpen ? "overflow-y-hidden max-h-dvh" : ""}`}
      >
        <MotionRevealProvider>{children}</MotionRevealProvider>
      </div>
    </LenisProvider>
  );
}
