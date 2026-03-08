"use client";

import { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Image from "next/image";
import { SlidingText } from "@/components/sliding-text";
import { SERVICES } from "@/lib/constants";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const serviceImages = [
  "/images/futuristic-brain.jpg",
  "/images/go-to-market.jpg",
  "/images/discord-purple.jpg",
  "/images/sequel-blue.jpg",
  "/images/woman-phone.jpg",
  "/images/del-monte-fruits.jpg",
];

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const grid = gridRef.current;
    if (!section || !headline || !grid) return;

    const ctx = gsap.context(() => {
      const trigger = section;

      gsap.fromTo(
        headline,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger, start: "top 85%", once: true },
        },
      );

      const cells = gsap.utils.toArray<HTMLElement>(
        grid.querySelectorAll("[data-service-cell]"),
      );
      cells.forEach((el, i) => {
        const col = i % 3;
        const fromX = col === 0 ? -24 : col === 1 ? 0 : 24;
        gsap.set(el, { opacity: 0, y: 40, x: fromX, scale: 0.96 });
        gsap.to(el, {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            end: "top 60%",
            once: true,
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="bg-white py-20 sm:py-24 md:py-28 lg:py-32 border-t border-zinc-200 relative overflow-hidden"
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        {/* Header: title + View All CTA aligned with title */}
        <div
          ref={headlineRef}
          className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 lg:gap-10 mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] text-black max-w-4xl">
            <span className="text-brand-purple">Our services</span>
            <span> have been developed to drive your next leap forward.</span>
          </h2>

          <motion.div
            className="shrink-0 self-start"
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Link
              href="/digital-marketing"
              className="group relative inline-flex items-center gap-2 sm:gap-2.5 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full border-2 border-brand-purple bg-transparent text-brand-purple overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2"
              aria-label="Explore our services"
            >
              <span
                className="absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-purple scale-0 transition-transform duration-500 ease-out group-hover:scale-[2] origin-center"
                aria-hidden
              />
              <span className="relative z-10 text-xs sm:text-sm font-bold uppercase tracking-widest transition-colors duration-300 group-hover:text-white">
                Explore our services
              </span>
              <span className="relative z-10 flex items-center justify-center transition-colors duration-300 group-hover:text-white text-brand-purple">
                <ArrowRight
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  strokeWidth={2.5}
                />
              </span>
            </Link>
          </motion.div>
        </div>

        {/* 3 per row grid: image on hover, SlidingText for service name */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border border-zinc-200 overflow-hidden rounded-lg mt-10 sm:mt-12 md:mt-16"
        >
          {SERVICES.map((service, i) => {
            const imageSrc = serviceImages[i % serviceImages.length];
            return (
              <motion.div
                key={service.id}
                data-service-cell
                className="group relative flex items-center justify-center min-h-[160px] sm:min-h-[180px] md:min-h-[200px] lg:min-h-[220px] border-r border-b border-zinc-200 nth-[3n]:border-r-0 nth-[n+4]:border-b-0 bg-white overflow-hidden cursor-pointer"
                whileHover={{ y: -8 }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0">
                  <Image
                    src={imageSrc}
                    alt=""
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-brand-purple/70" />
                </div>
                <span className="text-lg sm:text-xl md:text-2xl font-bold text-zinc-800 group-hover:text-white text-center relative z-10 transition-colors duration-300 px-4 group-hover:drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                  <SlidingText>{service.name}</SlidingText>
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
