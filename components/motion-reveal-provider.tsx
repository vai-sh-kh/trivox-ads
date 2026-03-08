"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "@/lib/gsap";

type RevealType = "fade-up" | "fade-down" | "fade" | "scale-up";

const REVEAL_DEFAULT = {
  y: 40,
  opacity: 0,
  duration: 0.7,
  ease: "power3.out",
  stagger: 0.08,
  start: "top 88%",
};

export function MotionRevealProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const ctxRef = useRef<ReturnType<typeof gsap.context> | null>(null);

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-motion-reveal]");
    if (!els.length) return;

    ctxRef.current = gsap.context(() => {
      els.forEach((el) => {
        const kind =
          (el.getAttribute("data-motion-reveal") as RevealType) || "fade-up";
        const delay = parseFloat(el.getAttribute("data-motion-delay") || "0");
        const once = el.getAttribute("data-motion-once") !== "false";

        let from: gsap.TweenVars = { opacity: 0 };
        if (kind === "fade-up") from = { y: REVEAL_DEFAULT.y, opacity: 0 };
        if (kind === "fade-down") from = { y: -REVEAL_DEFAULT.y, opacity: 0 };
        if (kind === "scale-up") from = { scale: 0.96, opacity: 0 };

        gsap.set(el, from);

        gsap.to(el, {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: REVEAL_DEFAULT.duration,
          ease: REVEAL_DEFAULT.ease,
          delay,
          scrollTrigger: {
            trigger: el,
            start: REVEAL_DEFAULT.start,
            toggleActions: once
              ? "play none none none"
              : "play none none reverse",
          },
        });
      });
    });

    return () => {
      ctxRef.current?.revert();
    };
  }, []);

  return <>{children}</>;
}
