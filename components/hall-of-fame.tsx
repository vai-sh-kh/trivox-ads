"use client";

import { motion } from "motion/react";
import { ArrowRight, ArrowLeft, Eye, Heart, Zap } from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatedText } from "@/components/animated-text";

const famers = [
  {
    id: "#109CHK",
    name: "Harry, Rory, & Elliot",
    company: "CHECKMATE",
    role: "FOUNDERS OF CHECKMATE",
    img: "https://picsum.photos/seed/checkmate_founders/800/800",
    badges: [
      { label: "VISIONARY TEAM", icon: <Eye size={16} /> },
      { label: "CUSTOMER OBSESSED", icon: <Heart size={16} /> },
      { label: "RISK-TAKERS", icon: <Zap size={16} /> },
    ],
    details: [
      "Personalized Discounts for saving money while shopping",
      "Funding Raised: $15m Series A (lead by Google)",
      "Brand Ambassador: Paris Hilton",
      "Putting money back in the consumer's pocket",
      "One of them is a ninja warrior...",
    ],
    link: "checkmate.com",
  },
  {
    id: "#327SEQ",
    name: "Greta & Anya",
    company: "SEQUEL",
    role: "FOUNDERS OF SEQUEL",
    img: "https://picsum.photos/seed/sequel_founders/800/800",
    badges: [
      { label: "INNOVATORS", icon: <Zap size={16} /> },
      { label: "PURPOSE DRIVEN", icon: <Heart size={16} /> },
      { label: "MARKET LEADERS", icon: <Eye size={16} /> },
    ],
    details: [
      "Revolutionizing feminine hygiene products",
      "Proprietary spiral design for better absorption",
      "Backed by top-tier venture capital",
      "Featured in Forbes and TechCrunch",
      "Changing the conversation around health",
    ],
    link: "sequel.com",
  },
  {
    id: "#327COL",
    name: "Kate",
    company: "COOLERHEADS",
    role: "FOUNDER OF COOLERHEADS",
    img: "https://picsum.photos/seed/coolerheads_founder/800/800",
    badges: [
      { label: "HEALTH TECH", icon: <Eye size={16} /> },
      { label: "PATIENT FIRST", icon: <Heart size={16} /> },
      { label: "PROBLEM SOLVER", icon: <Zap size={16} /> },
    ],
    details: [
      "Scalp cooling technology for chemo patients",
      "Reducing hair loss during cancer treatment",
      "FDA cleared medical device",
      "Empowering patients through their journey",
      "Scaling to hospitals nationwide",
    ],
    link: "coolerheads.com",
  },
];

const AUTO_SCROLL_INTERVAL_MS = 3000;

export function HallOfFame() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const next = useCallback(
    () => setActiveIndex((prev) => (prev + 1) % famers.length),
    [],
  );
  const prev = () =>
    setActiveIndex((prev) => (prev - 1 + famers.length) % famers.length);
  const current = famers[activeIndex];

  useEffect(() => {
    const id = setInterval(next, AUTO_SCROLL_INTERVAL_MS);
    return () => clearInterval(id);
  }, [next]);

  return (
    <section
      ref={sectionRef}
      className="bg-black text-white min-h-screen flex flex-col justify-center py-24 md:py-32 border-t border-zinc-800"
    >
      <div className="max-w-[1800px] mx-auto px-6 w-full">
        <div className="flex flex-col md:flex-row items-start gap-6 mb-8 md:mb-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[0.8] tracking-tighter uppercase">
            <span className="block text-brand-red mb-2">THE HALL OF</span>
            FAMERS
          </h2>
          <AnimatedText
            sectionRef={sectionRef}
            completeWhenSectionAtTop
            as="p"
            className="text-zinc-400 max-w-[360px] text-base md:text-lg font-medium leading-relaxed pt-1"
          >
            We&apos;ve been privileged to work with some really good people
            doing really good things. Here&apos;s how they&apos;re changing the
            world.
          </AnimatedText>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="relative h-[min(380px,45vh)] lg:h-[min(420px,50vh)] flex items-center justify-center">
            <div className="relative w-full max-w-sm h-full">
              {famers.map((famer, i) => {
                const isCurrent = i === activeIndex;
                const offset = i - activeIndex;
                return (
                  <motion.div
                    key={famer.company}
                    initial={false}
                    animate={{
                      x: offset * 100,
                      scale: isCurrent ? 1 : 0.8,
                      opacity: isCurrent ? 1 : 0.3,
                      zIndex: isCurrent ? 10 : 0,
                      filter: isCurrent ? "grayscale(0%)" : "grayscale(100%)",
                    }}
                    transition={{
                      duration: 0.85,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className="absolute inset-0"
                  >
                    <div className="relative w-full h-full p-4 md:p-5 border border-white/20 rounded-2xl bg-zinc-900/50 backdrop-blur overflow-hidden">
                      <svg
                        className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
                        viewBox="0 0 400 600"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 20H380V580H20V20Z"
                          stroke="white"
                          strokeWidth="0.5"
                        />
                        <path
                          d="M40 10V30M360 10V30M10 40H30M10 560H30M370 40H390M370 560H390M40 570V590M360 570V590"
                          stroke="white"
                          strokeWidth="1"
                        />
                        <circle cx="200" cy="20" r="2" fill="white" />
                        <circle cx="200" cy="580" r="2" fill="white" />
                        <rect
                          x="150"
                          y="15"
                          width="100"
                          height="10"
                          rx="5"
                          stroke="white"
                          strokeWidth="0.5"
                        />
                        <text
                          x="200"
                          y="23"
                          textAnchor="middle"
                          fontSize="6"
                          fill="white"
                          className="font-black uppercase tracking-widest"
                        >
                          {famer.company}
                        </text>
                        <path
                          d="M50 50 L350 50 L350 350 L50 350 Z"
                          stroke="white"
                          strokeWidth="0.5"
                          strokeDasharray="4 4"
                        />
                        <rect
                          x="60"
                          y="370"
                          width="80"
                          height="40"
                          rx="4"
                          stroke="white"
                          strokeWidth="0.5"
                        />
                        <text
                          x="100"
                          y="395"
                          textAnchor="middle"
                          fontSize="10"
                          fill="white"
                          className="font-black"
                        >
                          {famer.id}
                        </text>
                        <rect
                          x="260"
                          y="370"
                          width="80"
                          height="40"
                          rx="4"
                          stroke="white"
                          strokeWidth="0.5"
                          fill="url(#grad1)"
                        />
                        <defs>
                          <linearGradient
                            id="grad1"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop
                              offset="0%"
                              stopColor="#FF0000"
                              stopOpacity="0.2"
                            />
                            <stop
                              offset="100%"
                              stopColor="#0066FF"
                              stopOpacity="0.2"
                            />
                          </linearGradient>
                        </defs>
                      </svg>

                      <div className="relative z-10 w-full aspect-square rounded-lg overflow-hidden mb-4 md:mb-6 border border-white/10">
                        <img
                          src={famer.img}
                          alt={famer.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="relative z-10 flex justify-between items-end">
                        <div className="space-y-2">
                          <div className="w-6 h-6 border border-white/20 rounded-full flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-[8px] font-black uppercase tracking-widest opacity-50 mb-1">
                            AUTHENTICATED
                          </div>
                          <div className="w-12 h-1 bg-white/20 rounded-full overflow-hidden">
                            <motion.div
                              animate={{ x: ["-100%", "100%"] }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                              className="w-full h-full bg-white"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="space-y-6 md:space-y-8">
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">
                {current.role}
              </div>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter uppercase mb-6 md:mb-8">
                {current.name}
              </h3>

              <div className="flex flex-wrap gap-4 md:gap-6 mb-6 md:mb-8">
                {current.badges.map((badge, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-2 group cursor-default"
                  >
                    <div className="relative w-14 h-14 md:w-16 md:h-16 flex items-center justify-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="absolute inset-0"
                      >
                        <svg
                          viewBox="0 0 100 100"
                          className="w-full h-full opacity-40"
                        >
                          <path
                            id={`badgePath-${i}`}
                            d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                            fill="none"
                          />
                          <text className="text-[8px] font-black uppercase tracking-[0.2em] fill-white">
                            <textPath xlinkHref={`#badgePath-${i}`}>
                              {badge.label} • {badge.label} •
                            </textPath>
                          </text>
                        </svg>
                      </motion.div>
                      <div className="w-8 h-8 md:w-9 md:h-9 bg-zinc-900 rounded-full flex items-center justify-center border border-white/10 group-hover:border-brand-red transition-colors">
                        <div className="text-white group-hover:text-brand-red transition-colors">
                          {badge.icon}
                        </div>
                      </div>
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-red rounded-full" />
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-red rounded-full" />
                    </div>
                  </div>
                ))}
              </div>

              <ul className="space-y-2 md:space-y-3 border-t border-zinc-800 pt-4 md:pt-6">
                {current.details.map((detail, i) => (
                  <li
                    key={i}
                    className="text-sm md:text-base font-medium border-b border-zinc-900 pb-2 md:pb-3 last:border-0"
                  >
                    {detail}
                  </li>
                ))}
                <li className="pt-2 md:pt-3">
                  <a
                    href={`https://${current.link}`}
                    className="text-brand-red font-black uppercase tracking-widest text-xs hover:underline"
                  >
                    Find them at {current.link}
                  </a>
                </li>
              </ul>
            </div>

            <div className="flex items-center gap-4 md:gap-6 pt-6 md:pt-8">
              <button
                type="button"
                onClick={prev}
                className="w-10 h-10 md:w-12 md:h-12 border border-zinc-800 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all"
              >
                <ArrowLeft size={20} />
              </button>
              <div className="flex gap-3">
                {famers.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all ${i === activeIndex ? "bg-white w-6" : "bg-zinc-800"}`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={next}
                className="w-10 h-10 md:w-12 md:h-12 border border-zinc-800 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
