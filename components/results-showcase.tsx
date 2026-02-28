"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import { AnimatedText } from "@/components/animated-text";

const IMAGES = {
  discord_purple: "/images/discord-purple.jpg",
  sequel_blue: "/images/sequel-blue.jpg",
  woman_phone: "/images/woman-phone.jpg",
  del_monte_fruits: "/images/del-monte-fruits.jpg",
} as const;

export function ResultsShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const circleRef = useRef<HTMLDivElement>(null);

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
      className="relative bg-black text-white py-24 md:py-32 overflow-hidden"
    >
      <div className="sticky top-0 flex flex-col justify-center px-6 overflow-x-hidden">
        <div className="max-w-[1800px] mx-auto w-full">
          <div className="relative">
            <div className="grid pt-30 grid-cols-1 flex flex-col lg:grid-cols-[68%_1fr] gap-12 items-start lg:items-stretch mb-20">
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
              <div className="hidden lg:flex items-center justify-center [perspective:800px]">
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
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
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

            {/* Full-height vertical divider at ~67% */}
            <div
              className="absolute top-0 bottom-0 left-[67%] w-px bg-[#AAAAAA] hidden lg:block -translate-x-1/2"
              aria-hidden
            />

            <div className="relative w-full mb-10 h-20 lg:h-28 overflow-visible">
              <div className="absolute left-0 right-0 bottom-0 h-px bg-[#AAAAAA]" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-p overflow-hidden relative mt-0">
            <div className="lg:col-span-2 aspect-video rounded-[2.5rem] bg-[#5865F2] relative overflow-hidden group">
              <img
                src={IMAGES.discord_purple}
                alt="Discord"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-[#5865F2] rounded-full" />
                    <div className="w-3 h-3 bg-[#5865F2] rounded-full" />
                  </div>
                </div>
              </div>
            </div>
            <div className="p-12 flex flex-col justify-center bg-black">
              <div className="inline-flex items-center gap-2 border border-white px-4 py-2 rounded-full w-fit mb-8">
                <span>🎮</span>
                <span className="text-xs font-black uppercase tracking-widest text-white">
                  DISCORD
                </span>
              </div>
              <h3 className="text-4xl md:text-5xl font-black leading-tight tracking-tighter uppercase">
                Redefining a beloved platform to acquire new audiences
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="min-h-screen sticky top-0 flex flex-col justify-center px-6 py-20 bg-black border-b border-white">
        <div className="max-w-[1800px] mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-white border border-white rounded-[2.5rem] overflow-hidden">
            <div className="p-12 flex flex-col justify-center bg-black">
              <div className="inline-flex items-center gap-2 border border-white px-4 py-2 rounded-full w-fit mb-8">
                <span className="text-red-500">💧</span>
                <span className="text-xs font-black uppercase tracking-widest text-white">
                  SEQUEL
                </span>
              </div>
              <h3 className="text-4xl md:text-5xl font-black leading-tight tracking-tighter uppercase">
                Launching the First Tampon Redesign in 80 Years
              </h3>
            </div>
            <div className="aspect-square bg-[#0066FF] flex items-center justify-center p-12 relative overflow-hidden group">
              <img
                src={IMAGES.sequel_blue}
                alt="Sequel"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square bg-black overflow-hidden group">
              <img
                src={IMAGES.woman_phone}
                alt="Lifestyle"
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>
      </div> */}

      {/* <div className="min-h-screen sticky top-0 flex flex-col justify-center px-6 py-20 bg-black">
        <div className="max-w-[1800px] mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-white border border-white rounded-[2.5rem] overflow-hidden">
            <div className="aspect-square bg-black p-12 flex flex-col justify-between relative overflow-hidden group">
              <div className="flex-1 flex items-center justify-center">
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
                <p className="text-[10px] font-black uppercase tracking-widest">
                  SECURING THE #1 SPOT IN THE APP STORE
                </p>
              </div>
            </div>

            <div className="aspect-square bg-black p-12 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 border border-white px-4 py-2 rounded-full w-fit mb-8">
                <span>📸</span>
                <span className="text-xs font-black uppercase tracking-widest text-white">
                  LUMANU
                </span>
              </div>
              <h3 className="text-4xl md:text-5xl font-black leading-tight tracking-tighter uppercase">
                Creating a bold B2B brand for even bolder creators
              </h3>
            </div>

            <div className="aspect-square bg-black overflow-hidden group relative">
              <img
                src={IMAGES.del_monte_fruits}
                alt="Del Monte"
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
              />
              <div className="absolute bottom-12 left-12">
                <div className="inline-flex items-center gap-2 border border-white px-4 py-2 rounded-full w-fit mb-4">
                  <span>🍍</span>
                  <span className="text-xs font-black uppercase tracking-widest text-white">
                    DEL MONTE
                  </span>
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white">
                  GROWING THE MOST PROFITABLE PRODUCT IN DEL MONTE HISTORY
                </p>
              </div>
            </div>
          </div>

          <div className="mt-20 text-center max-w-4xl mx-auto">
            <blockquote className="text-3xl md:text-5xl font-black leading-tight tracking-tight uppercase mb-8">
              &quot;IF IT MAKES YOUR LEGAL TEAM NERVOUS AND YOUR COMPETITORS
              JEALOUS, WE&apos;RE IN.&quot;
            </blockquote>
            <cite className="not-italic text-sm font-black uppercase tracking-widest text-zinc-500">
              - BORN & BRED TEAM
            </cite>
          </div>
        </div>
      </div> */}
    </section>
  );
}
