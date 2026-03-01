"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Image from "next/image";
import { SlidingText } from "@/components/sliding-text";

const services = [
  "Market Research",
  "Brand Strategy",
  "Brand Messaging",
  "Brand Identity",
  "Campaigns",
  "Go-To-Market",
  "Website Design",
  "Web Development",
  "Communications",
  "Content & SEO",
  "Performance Marketing",
  "Social Media & UGC",
];

const serviceImages = [
  "/images/futuristic-brain.jpg",
  "/images/go-to-market.jpg",
  "/images/discord-purple.jpg",
  "/images/sequel-blue.jpg",
  "/images/woman-phone.jpg",
  "/images/del-monte-fruits.jpg",
  "/images/cyberpunk-group.jpg",
  "/images/yellow-pitchfork.jpg",
  "/images/futuristic-brain.jpg",
  "/images/discord-purple.jpg",
  "/images/sequel-blue.jpg",
  "/images/woman-phone.jpg",
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

      // Headline: y + opacity
      gsap.fromTo(
        headline,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger,
            start: "top 85%",
            once: true,
          },
        },
      );

      // Grid cells: stagger reveal (opacity + y)
      const cells = gsap.utils.toArray<HTMLElement>(
        grid.querySelectorAll("[data-service-cell]"),
      );
      const directions = [
        { y: 30, x: 0 },
        { y: 30, x: 0 },
        { y: 30, x: 0 },
        { y: 30, x: 0 },
      ];
      cells.forEach((el, i) => {
        const d = directions[i % 4];
        gsap.set(el, { opacity: 0, y: d.y, x: d.x });
      });
      gsap.to(cells, {
        opacity: 1,
        y: 0,
        x: 0,
        duration: 0.6,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: {
          trigger,
          start: "top 85%",
          once: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="bg-white py-24 md:py-32 min-h-screen border-t border-zinc-100 relative overflow-hidden"
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={headlineRef}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-24 gap-12 relative"
        >
          <h2 className="text-4xl md:text-[4.5vw] lg:text-[3vw] font-medium tracking-tight max-w-4xl leading-[1.15] text-black">
            <span className="text-[#4A148C]">Our services</span> have been
            developed to <span className="font-semibold">Ignite</span> your next
            leap forward
          </h2>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 border-t border-l border-zinc-200"
        >
          {services.map((service, i) => (
            <div
              key={i}
              data-service-cell
              className="h-[140px] sm:h-[160px] flex items-center justify-center p-6 bg-white border-r border-b border-zinc-200 text-center group cursor-pointer relative overflow-hidden hover:scale-[1.02] hover:z-20 transition-transform duration-200"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0">
                <Image
                  src={serviceImages[i]}
                  alt={service}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/50" />
              </div>
              <span className="text-lg sm:text-xl font-medium text-zinc-800 group-hover:text-white group-hover:drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] relative z-10 transition-colors duration-300">
                <SlidingText>{service}</SlidingText>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
