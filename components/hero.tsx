"use client";

import { motion } from "motion/react";
import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { HeroSwoosh } from "./hero-swoosh";

const CONTAINER_CLASS = "max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8";
const CONTAINER_VIDEO_CLASS = "max-w-[1920px] mx-auto px-3 sm:px-6";

export function Hero({ videoBackground }: { videoBackground?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement | HTMLDivElement>(null);

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
      className={`relative overflow-hidden flex flex-col justify-center ${videoBackground ? "flex-1 min-h-0 py-2" : "pt-20 sm:pt-24 lg:pt-28"} ${!videoBackground ? "bg-gradient-to-b from-[#5D3FD3]/[0.06] via-transparent to-[#E0115F]/[0.04]" : ""}`}
    >
      <div className={videoBackground ? CONTAINER_VIDEO_CLASS : CONTAINER_CLASS}>
        <motion.div
          className={`w-full flex items-center justify-center ${videoBackground ? "h-full" : ""}`}
          initial={{ opacity: 0, y: videoBackground ? 30 : 100, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: videoBackground ? 0.8 : 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {videoBackground ? (
            /* Video-through-text: compact for 60vh panel – smaller text, correct placement */
            <div
              ref={titleRef}
              className="flex w-full items-stretch justify-between gap-0 leading-none font-black uppercase hero-title-fit text-hero-size-video bg-black mix-blend-multiply [&_span]:text-white"
            >
              {["T", "R", "I", "V", "O", "X", "A", "D", "S"].map(
                (letter, i) => (
                  <span
                    key={i}
                    className="flex-1 flex items-center justify-center min-w-0"
                  >
                    {letter}
                  </span>
                ),
              )}
            </div>
          ) : (
            <h1
              ref={titleRef}
              className="flex w-full items-stretch justify-between gap-0 leading-none font-black uppercase hero-title-fit text-gradient text-hero-size"
            >
              {["T", "R", "I", "V", "O", "X", "A", "D", "S"].map(
                (letter, i) => (
                  <span
                    key={i}
                    className="flex-1 flex items-center justify-center min-w-0"
                  >
                    {letter}
                  </span>
                ),
              )}
            </h1>
          )}
        </motion.div>
      </div>
    </section>
  );
}
