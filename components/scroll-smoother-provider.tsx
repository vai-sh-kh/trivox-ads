"use client";

import { useEffect, useState } from "react";
import { ScrollSmoother } from "@/lib/gsap";
import { Navbar } from "@/components/navbar";
import { MenuOverlay } from "@/components/menu-overlay";

export function ScrollSmootherProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    ScrollSmoother.create({
      smooth: 2,
      effects: true,
      normalizeScroll: true,
    });

    return () => {
      ScrollSmoother.get()?.kill();
    };
  }, []);

  return (
    <>
      <Navbar onMenuClick={() => setIsMenuOpen(true)} />
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <div id="smooth-wrapper">
        <div id="smooth-content">{children}</div>
      </div>
    </>
  );
}
