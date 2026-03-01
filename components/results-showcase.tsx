"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useRef, useState, useLayoutEffect } from "react";
import { AnimatedText } from "@/components/animated-text";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const IMAGES = {
  discord_purple: "/images/discord-purple.jpg",
  sequel_blue: "/images/sequel-blue.jpg",
  woman_phone: "/images/woman-phone.jpg",
} as const;

export function ResultsShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const circleRef = useRef<HTMLDivElement>(null);
  const growGridRef = useRef<HTMLDivElement>(null);
  const growSectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const grid = growGridRef.current;
    const trigger = growSectionRef.current;
    if (!grid || !trigger) return;

    const ctx = gsap.context(() => {
      gsap.set(grid, {
        scaleX: 0.3,
        transformOrigin: "left center",
      });

      gsap.to(grid, {
        scaleX: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger,
          start: "top 80%",
          end: "top 30%",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = circleRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0.5, y: 0.5 });
    setIsHovered(false);
  };

  return (
    <section
      ref={sectionRef}
      id="results"
      className="relative bg-black text-white py-16 md:py-32 overflow-hidden"
    >
      <div className="sticky top-0 flex flex-col justify-center px-4 sm:px-6 overflow-x-hidden">
        <div className="max-w-[1800px] mx-auto w-full">
          {/* Wrapper so 67% vertical line extends down to the horizontal line */}
          <div className="relative">
            <div className="relative">
              <div className="flex flex-col pt-20 lg:grid lg:grid-cols-[68%_1fr] gap-12 items-start lg:items-stretch mb-20">
                <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-12 mb-16 lg:mb-0">
                  <motion.h2
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col text-white gap-4 text-[clamp(2.5rem,8vw,8rem)] font-black leading-[0.85] tracking-wide uppercase shrink-0"
                  >
                    OUR
                    <br />
                    RESULTS
                  </motion.h2>
                  <AnimatedText
                    sectionRef={sectionRef}
                    className="text-white text-sm lg:text-base font-normal uppercase tracking-widest max-w-xs leading-relaxed pt-1 overflow-visible"
                    as="p"
                  >
                    A few of the outcomes we&apos;re proud to have delivered
                    alongside our clients. We&apos;ve saved you a spot.
                  </AnimatedText>
                </div>

                {/* Right column - flex container for vertical centering of circular button */}
                <div className="hidden lg:flex items-center justify-center perspective-midrange">
                  <motion.div
                    ref={circleRef}
                    className="relative w-52 h-52 flex items-center justify-center cursor-pointer select-none"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={handleMouseLeave}
                    onMouseMove={handleMouseMove}
                    animate={{
                      scale: isHovered ? 1.05 : 1,
                      rotateX: (mousePos.y - 0.5) * 12,
                      rotateY: (mousePos.x - 0.5) * 12,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: isHovered ? 4 : 25,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute inset-0"
                    >
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <path
                          id="circlePath"
                          d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                          fill="none"
                          stroke="none"
                        />
                        <text className="text-[9px] font-black uppercase tracking-[0.2em] fill-white">
                          <textPath xlinkHref="#circlePath">
                            VIEW ALL RESULTS • VIEW ALL RESULTS •
                          </textPath>
                        </text>
                      </svg>
                    </motion.div>
                    <motion.div
                      className="w-20 h-20 bg-[#EF2935] rounded-full flex items-center justify-center shadow-lg"
                      whileHover={{
                        scale: 1.15,
                        boxShadow: "0 0 30px rgba(239, 41, 53, 0.5)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                    >
                      <motion.div
                        animate={isHovered ? { x: 2 } : { x: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowRight size={32} className="text-white" />
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </div>

                <div
                  className="relative w-52 h-52 flex items-center justify-center cursor-pointer mx-auto lg:hidden"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: isHovered ? 4 : 25,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0"
                  >
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <path
                        id="circlePathMobile"
                        d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                        fill="none"
                        stroke="none"
                      />
                      <text className="text-[9px] font-black uppercase tracking-[0.2em] fill-white">
                        <textPath xlinkHref="#circlePathMobile">
                          VIEW ALL RESULTS • VIEW ALL RESULTS •
                        </textPath>
                      </text>
                    </svg>
                  </motion.div>
                  <motion.div
                    className="w-20 h-20 bg-[#EF2935] rounded-full flex items-center justify-center shadow-lg"
                    whileHover={{
                      scale: 1.15,
                      boxShadow: "0 0 30px rgba(239, 41, 53, 0.5)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <ArrowRight size={32} className="text-white" />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Horizontal line - meets the 67% vertical line */}
            <div className="relative w-full h-px">
              <div className="absolute left-0 right-0 top-0 h-px bg-[#AAAAAA]" />
            </div>

            {/* Vertical divider at ~67% - extends from top to this horizontal line */}
            <div
              className="absolute top-0 bottom-0 left-[67%] w-px bg-[#AAAAAA] hidden lg:block -translate-x-1/2"
              aria-hidden
            />
          </div>

          {/* Wrapper so horizontal and vertical lines connect */}
          <div className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-p overflow-hidden pt-20 lg:pt-28">
              <div className="aspect-video rounded-2xl lg:rounded-[2.5rem] mr-0 lg:mr-20 bg-[#5865F2] relative overflow-hidden group">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source src="/videos/hone-second-1.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="p-6 sm:p-8 md:p-12 flex flex-col justify-center bg-black">
                <motion.h3
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-4xl md:text-5xl font-black leading-tight tracking-tighter uppercase mb-6"
                >
                  Redefining a beloved platform to acquire new audiences
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.8,
                    delay: 0.2,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-lg"
                >
                  We helped evolve the brand positioning to resonate with new
                  audiences while staying true to its core community. Strategic
                  creative work that expanded reach without losing what made it
                  special.
                </motion.p>
              </div>
            </div>
            {/* Vertical line - connects with horizontal line above, spans full height */}
            <div
              className="absolute top-0 bottom-0 left-1/2 w-px bg-[#AAAAAA] -translate-x-1/2 hidden lg:block"
              aria-hidden
            />
          </div>
        </div>
      </div>

      {/* Horizontal line separating headline block from showcase grid */}
      <div className="max-w-[1800px] mx-auto mt-30 px-6">
        <div className="w-full h-px bg-[#AAAAAA]" aria-hidden />
      </div>

      <div className="min-h-screen sticky top-0 flex flex-col justify-center px-6 bg-black">
        <div className="max-w-[1800px] mx-auto w-full">
          {/* Two sections separated by horizontal and vertical lines */}
          <div className="relative flex flex-col lg:flex-row rounded-[2.5rem] overflow-hidden bg-black px-8 md:px-12 lg:px-16">
            {/* Left section: CHECKMATE + LUMANU */}
            <div className="flex-1 flex flex-col min-h-[50vh] lg:min-h-[55vh] lg:max-w-[45%]">
              {/* CHECKMATE — top */}
              <div className="flex-1 py-8 md:py-12 flex flex-col justify-between relative overflow-hidden group">
                <div className="flex items-center justify-center flex-1 min-h-[200px]">
                  <motion.div
                    whileHover={{ rotate: 90 }}
                    className="w-32 h-32 bg-white flex items-center justify-center rounded-xl"
                  >
                    <div className="w-16 h-16 bg-[#2D2DFF] rounded-sm" />
                  </motion.div>
                </div>
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 border border-white px-4 py-2 rounded-full w-fit mb-4">
                    <span className="text-white">📄</span>
                    <span className="text-xs font-black uppercase tracking-widest text-white">
                      CHECKMATE
                    </span>
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white">
                    SECURING THE #1 SPOT IN THE APP STORE
                  </p>
                </div>
              </div>
              {/* Horizontal line between CHECKMATE and LUMANU */}
              <div className="w-full h-px bg-[#6B7280] shrink-0" aria-hidden />
              {/* LUMANU — bottom */}
              <div className="flex-1 py-8 md:py-12 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 border border-white px-4 py-2 rounded-full w-fit mb-8">
                  <span>📸</span>
                  <span className="text-xs font-black uppercase tracking-widest text-white">
                    LUMANU
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tighter uppercase">
                  Creating a bold B2B brand for even bolder creators
                </h3>
              </div>
            </div>

            {/* Vertical line between left section and right section */}
            <div
              className="hidden lg:block w-px shrink-0 bg-[#6B7280] self-stretch min-h-[55vh]"
              aria-hidden
            />
            {/* Mobile: horizontal line between left block and image */}
            <div
              className="lg:hidden w-full h-px shrink-0 bg-[#6B7280]"
              aria-hidden
            />

            {/* Right section: DEL MONTE - wider, shorter */}
            <div className="flex-[1.4] min-h-[35vh] lg:min-h-[50vh] bg-black overflow-hidden group relative p-8 md:p-12 lg:p-16">
              <div className="relative w-full h-full min-h-[240px] lg:min-h-[280px] rounded-lg overflow-hidden">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                >
                  <source src="/videos/home-second-2.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
