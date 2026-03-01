"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { gsap } from "@/lib/gsap";
import { ArrowUpRight } from "lucide-react";

const CURSOR_RED = "#4A148C";
const CURSOR_WHITE = "#FFFFFF";

function isInteractive(el: Element | null): boolean {
  if (!el) return false;
  const tag = el.tagName.toLowerCase();
  const role = el.getAttribute("role");
  const isClickable =
    tag === "a" ||
    tag === "button" ||
    role === "button" ||
    el.closest("a, button, [role='button']");
  return !!isClickable;
}

function isOverWhiteCursor(el: Element | null): boolean {
  return !!el?.closest("[data-cursor-white]");
}

export function GlobalCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const xToRing = useRef<((v: number) => void) | null>(null);
  const yToRing = useRef<((v: number) => void) | null>(null);
  const xToDot = useRef<((v: number) => void) | null>(null);
  const yToDot = useRef<((v: number) => void) | null>(null);
  const xToArrow = useRef<((v: number) => void) | null>(null);
  const yToArrow = useRef<((v: number) => void) | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isPointer, setIsPointer] = useState(true);

  const handleMove = useCallback((e: MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;
    xToRing.current?.(x);
    yToRing.current?.(y);
    xToDot.current?.(x);
    yToDot.current?.(y);
    xToArrow.current?.(x);
    yToArrow.current?.(y);

    const el = document.elementFromPoint(x, y);
    const interactive = isInteractive(el);
    const useWhite = isOverWhiteCursor(el);
    const color = useWhite ? CURSOR_WHITE : CURSOR_RED;

    if (ringRef.current) {
      gsap.to(ringRef.current, {
        scale: interactive ? 1.5 : 1,
        borderColor: color,
        duration: 0.25,
        ease: "power2.out",
      });
    }
    if (dotRef.current && arrowRef.current) {
      gsap.to(dotRef.current, {
        opacity: interactive ? 0 : 1,
        backgroundColor: color,
        duration: 0.2,
      });
      gsap.to(arrowRef.current, {
        opacity: interactive ? 1 : 0,
        color,
        duration: 0.2,
      });
    }
  }, []);

  useEffect(() => {
    const prefersCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (prefersCoarse) {
      setIsPointer(false);
      return;
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !ringRef.current || !dotRef.current || !arrowRef.current)
      return;

    gsap.set(ringRef.current, {
      xPercent: -50,
      yPercent: -50,
      opacity: 0,
      borderColor: CURSOR_RED,
    });
    gsap.set(dotRef.current, {
      xPercent: -50,
      yPercent: -50,
      backgroundColor: CURSOR_RED,
    });
    gsap.set(arrowRef.current, {
      xPercent: -50,
      yPercent: -50,
      opacity: 0,
      color: CURSOR_RED,
    });

    xToRing.current = gsap.quickTo(ringRef.current, "x", {
      duration: 0.45,
      ease: "power2.out",
    });
    yToRing.current = gsap.quickTo(ringRef.current, "y", {
      duration: 0.45,
      ease: "power2.out",
    });
    xToDot.current = gsap.quickTo(dotRef.current, "x", {
      duration: 0.12,
      ease: "power2.out",
    });
    yToDot.current = gsap.quickTo(dotRef.current, "y", {
      duration: 0.12,
      ease: "power2.out",
    });
    xToArrow.current = gsap.quickTo(arrowRef.current, "x", {
      duration: 0.12,
      ease: "power2.out",
    });
    yToArrow.current = gsap.quickTo(arrowRef.current, "y", {
      duration: 0.12,
      ease: "power2.out",
    });

    gsap.to(ringRef.current, { opacity: 1, duration: 0.3 });
    gsap.to(dotRef.current, { opacity: 1, duration: 0.2 });

    document.body.classList.add("cursor-custom-active");

    window.addEventListener("mousemove", handleMove, { passive: true });

    return () => {
      document.body.classList.remove("cursor-custom-active");
      window.removeEventListener("mousemove", handleMove);
    };
  }, [mounted, handleMove]);

  if (!isPointer) return null;

  return (
    /* Full-page overlay so cursor shows in all sections (above ScrollSmoother wrapper) */
    <div
      className="fixed inset-0 w-full min-w-full h-full min-h-full pointer-events-none z-[9998]"
      style={{ top: 0, left: 0, right: 0, bottom: 0 }}
      aria-hidden
    >
      <div
        ref={ringRef}
        className="absolute top-0 left-0 w-10 h-10 rounded-full border-2 border-brand-purple pointer-events-none z-[1] will-change-transform"
        style={{ opacity: 0 }}
        aria-hidden
      />
      <div
        ref={dotRef}
        className="absolute top-0 left-0 w-2 h-2 rounded-full bg-brand-purple pointer-events-none z-[2] will-change-transform"
        style={{ opacity: 0 }}
        aria-hidden
      />
      <div
        ref={arrowRef}
        className="absolute top-0 left-0 pointer-events-none z-[3] will-change-transform flex items-center justify-center"
        style={{ opacity: 0 }}
        aria-hidden
      >
        <ArrowUpRight size={20} className="text-inherit" strokeWidth={2.5} />
      </div>
    </div>
  );
}
