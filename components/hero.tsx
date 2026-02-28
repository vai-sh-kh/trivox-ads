"use client";

import { motion } from "motion/react";
import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { HeroSwoosh } from "./hero-swoosh";

const CONTAINER_CLASS = "max-w-[1920px] mx-auto px-8";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!titleRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 80, opacity: 0.6 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative pt-28 sm:pt-32 pb-0 overflow-hidden bg-white"
    >
      {/* Same container as navbar: start and end fit inside same bounds */}
      <div className={CONTAINER_CLASS}>
        <motion.div
          className="w-full flex items-center justify-center"
          initial={{ opacity: 0, y: 100, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1
            ref={titleRef}
            className="flex w-full items-stretch justify-between gap-0 leading-none font-black uppercase hero-title-fit text-gradient text-[280px]!"
          >
            {["T", "R", "I", "V", "O", "X", "A", "D", "S"].map((letter, i) => (
              <span
                key={i}
                className="flex-1 flex items-center justify-center min-w-0"
              >
                {letter}
              </span>
            ))}
          </h1>
        </motion.div>
      </div>
    </section>
  );
}
