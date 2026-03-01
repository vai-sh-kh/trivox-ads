"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";

interface TiltButtonWrapperProps {
  children: React.ReactNode;
  className?: string;
  /** Max tilt in degrees (default: 15) */
  maxTilt?: number;
}

/**
 * Wraps any button/element with the same GSAP tilt animation from index.html.
 * Does not control the child's styles - use purely as a wrapper.
 */
export function TiltButtonWrapper({
  children,
  className = "",
  maxTilt = 15,
}: TiltButtonWrapperProps) {
  const wrapperRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    gsap.set(el, { perspective: 650 });

    const rotationX = gsap.quickTo(el, "rotationX", { ease: "power3" });
    const rotationY = gsap.quickTo(el, "rotationY", { ease: "power3" });

    const handlePointerMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      rotationX(gsap.utils.interpolate(maxTilt, -maxTilt, y));
      rotationY(gsap.utils.interpolate(-maxTilt, maxTilt, x));
    };

    const handlePointerLeave = () => {
      rotationX(0);
      rotationY(0);
    };

    el.addEventListener("pointermove", handlePointerMove);
    el.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      el.removeEventListener("pointermove", handlePointerMove);
      el.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [maxTilt]);

  return (
    <span ref={wrapperRef} className={`inline-block transform-3d ${className}`}>
      {children}
    </span>
  );
}
