"use client";

import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { useState, useCallback, useRef, useLayoutEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { TESTIMONIALS } from "@/lib/constants";
import Link from "next/link";

const AUTO_SCROLL_INTERVAL_MS = 6000;

function cardCode(id: string, index: number) {
  const num = String(index + 1).padStart(2, "0");
  const letters = id.replace("t", "").toUpperCase();
  return `#${num}${letters}`;
}

export function HallOfFame() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const next = useCallback(
    () => setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length),
    [],
  );
  const prev = useCallback(
    () =>
      setActiveIndex(
        (prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length,
      ),
    [],
  );
  const current = TESTIMONIALS[activeIndex];

  useLayoutEffect(() => {
    const id = setInterval(next, AUTO_SCROLL_INTERVAL_MS);
    return () => clearInterval(id);
  }, [next]);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const carousel = carouselRef.current;
    const panel = panelRef.current;
    if (!section || !heading) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heading,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 85%", once: true },
        },
      );
      if (carousel) {
        gsap.fromTo(
          carousel,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: 0.15,
            ease: "power2.out",
            scrollTrigger: { trigger: section, start: "top 85%", once: true },
          },
        );
      }
      if (panel) {
        gsap.fromTo(
          panel,
          { x: 24, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            delay: 0.3,
            ease: "power2.out",
            scrollTrigger: { trigger: section, start: "top 85%", once: true },
          },
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-black text-white py-20 md:py-28 lg:py-32 border-t border-zinc-800 overflow-hidden"
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
        <h2
          ref={headingRef}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[0.9] tracking-tighter uppercase mb-2 sm:mb-3"
        >
          Our Clients Say
        </h2>
        <p className="text-zinc-400 max-w-2xl text-sm sm:text-base md:text-lg mb-8 sm:mb-12 md:mb-16">
          We&apos;ve been privileged to work with brands doing great things.
          Here&apos;s how they&apos;re growing with TrivoxAds.
        </p>

        <div className="flex flex-col lg:flex-row lg:items-stretch gap-8 sm:gap-10 lg:gap-12">
          {/* Carousel: cards with circuit-style border */}
          <div ref={carouselRef} className="flex-1 min-w-0">
            <div className="relative flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={prev}
                className="hidden lg:flex w-14 h-14 border border-white/30 rounded-full items-center justify-center hover:bg-white hover:text-black transition-all shrink-0"
                aria-label="Previous"
              >
                <ArrowLeft size={24} />
              </button>

              <div className="flex-1 flex justify-center overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, x: 48 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -48 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="w-full max-w-2xl mx-auto"
                  >
                    <div
                      className="relative rounded-2xl border-2 border-white/20 bg-white/5 p-1.5"
                      style={{
                        boxShadow:
                          "inset 0 0 0 1px rgba(255,255,255,0.08), 0 0 0 1px rgba(255,255,255,0.1)",
                      }}
                    >
                      {/* Circuit-style corners */}
                      <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-brand-purple/60 rounded-tl" />
                      <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-brand-purple/60 rounded-tr" />
                      <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-brand-purple/60 rounded-bl" />
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-brand-purple/60 rounded-br" />

                      <div className="p-5 sm:p-8 md:p-10 lg:p-12 rounded-xl">
                        <div className="flex items-center gap-3 sm:gap-5 mb-5 sm:mb-8">
                          <div className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-brand-purple flex items-center justify-center text-lg sm:text-2xl md:text-3xl font-black text-white shrink-0">
                            {current.initials}
                          </div>
                          <div className="min-w-0">
                            <div className="font-bold text-white text-base sm:text-xl md:text-2xl truncate">
                              {current.authorName}
                            </div>
                            {current.company && (
                              <div className="text-sm sm:text-base md:text-lg text-zinc-400 truncate">
                                {current.company}
                              </div>
                            )}
                            <div className="text-xs sm:text-sm text-zinc-500 mt-1.5 font-mono">
                              {cardCode(current.id, activeIndex)}
                            </div>
                          </div>
                        </div>
                        <div className="h-px bg-white/10 mb-5 sm:mb-8" />
                        <blockquote className="text-zinc-300 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed">
                          &ldquo;{current.text}&rdquo;
                        </blockquote>
                        <div className="mt-8 h-2 w-32 md:w-40 rounded-full bg-linear-to-r from-brand-purple to-logo-pink" />
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <button
                type="button"
                onClick={next}
                className="hidden lg:flex w-14 h-14 border border-white/30 rounded-full items-center justify-center hover:bg-white hover:text-black transition-all shrink-0"
                aria-label="Next"
              >
                <ArrowRight size={24} />
              </button>
            </div>

            {/* Dots + arrows (mobile: arrows visible) */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                type="button"
                onClick={prev}
                className="lg:hidden w-10 h-10 border border-white/30 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all"
                aria-label="Previous"
              >
                <ArrowLeft size={18} />
              </button>
              <div className="flex items-center gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    className={`rounded-full transition-all duration-300 ${
                      i === activeIndex
                        ? "bg-white h-2.5 w-10"
                        : "bg-zinc-600 h-2 w-2 hover:bg-zinc-500"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={next}
                className="lg:hidden w-10 h-10 border border-white/30 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all"
                aria-label="Next"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* Right panel: active client details */}
          <div
            ref={panelRef}
            className="lg:w-[380px] xl:w-[420px] shrink-0 border border-white/10 rounded-xl bg-white/5 p-4 sm:p-6 md:p-8 flex flex-col justify-center"
          >
            <p className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-zinc-500 mb-1.5 sm:mb-2">
              Client spotlight
            </p>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-3 sm:mb-4 break-words">
              {current.company || current.authorName}
            </h3>
            <p className="text-white font-semibold mb-6">
              {current.company ? current.authorName : current.date}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1.5 rounded-full border border-white/20 text-xs font-bold uppercase">
                Results-Driven
              </span>
              <span className="px-3 py-1.5 rounded-full border border-white/20 text-xs font-bold uppercase">
                Trusted Partner
              </span>
              <span className="px-3 py-1.5 rounded-full border border-white/20 text-xs font-bold uppercase">
                Growth Focused
              </span>
            </div>
            <ul className="space-y-3 text-sm text-zinc-400 border-t border-white/10 pt-6">
              <li className="flex items-start gap-2">
                <Quote className="w-4 h-4 shrink-0 mt-0.5 text-brand-purple/70" />
                <span>{current.text}</span>
              </li>
              <li className="text-zinc-500 text-xs">{current.date}</li>
            </ul>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16 md:mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-xl md:text-2xl font-bold text-white mb-4">
            Ready to be one of them?
          </p>
          <Link
            href="/contact"
            className="inline-block bg-brand-purple text-white px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest hover:bg-purple-900 transition-colors"
          >
            Let&apos;s work together
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
