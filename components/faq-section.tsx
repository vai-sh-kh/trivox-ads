"use client";

import { useState, useRef, useLayoutEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { FAQ_ITEMS } from "@/lib/constants";
import { ChevronDown } from "lucide-react";

export function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    if (!section || !heading) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heading,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 85%", once: true },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative bg-white overflow-hidden py-16 sm:py-20 md:py-24 lg:py-32 border-t border-zinc-100"
    >
      <div className="max-w-[1920px] mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
        <h2
          ref={headingRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-black uppercase mb-4 sm:mb-5"
        >
          <span className="text-brand-purple">Frequently Asked Questions</span>
        </h2>
        <p className="text-zinc-600 text-lg sm:text-xl md:text-2xl max-w-3xl mb-10 sm:mb-12 md:mb-16 leading-relaxed">
          Quick answers about TrivoxAds—who we are, what we offer, and how we
          can help your brand grow.
        </p>

        <ul className="space-y-3 sm:space-y-4">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <li
                key={item.id}
                className="border border-zinc-200 rounded-xl sm:rounded-2xl overflow-hidden bg-white"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="w-full flex items-center justify-between gap-3 sm:gap-4 px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6 text-left hover:bg-zinc-50 transition-colors min-h-14 sm:min-h-0"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-zinc-900 text-base sm:text-lg md:text-xl lg:text-2xl pr-2 sm:pr-4 text-left break-words">
                    {item.question}
                  </span>
                  <ChevronDown
                    size={24}
                    className={`shrink-0 text-zinc-500 transition-transform duration-200 w-6 h-6 sm:w-7 sm:h-7 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-4 pb-4 pt-0 sm:px-6 sm:pb-5 md:px-8 md:pb-6">
                      <p className="text-zinc-600 text-sm sm:text-base md:text-lg leading-relaxed sm:leading-relaxed md:leading-loose">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
