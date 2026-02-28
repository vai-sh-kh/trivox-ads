"use client";

import { motion } from "motion/react";
import { FlipModalGrid } from "@/components/flip-modal-grid";

const IMAGES = {
  futuristic_brain: "/images/futuristic-brain.jpg",
  del_monte_fruits: "/images/del-monte-fruits.jpg",
  cyberpunk_group: "/images/cyberpunk-group.jpg",
  yellow_pitchfork: "/images/yellow-pitchfork.jpg",
} as const;

const CARD_BASE =
  "w-full h-full min-h-0 rounded-xl overflow-hidden flex flex-col";

const GRID_ITEMS = [
  <div key="0" className={`${CARD_BASE} bg-black`}>
    <img
      src={IMAGES.futuristic_brain}
      alt="Futuristic Brain"
      className="w-full h-full min-h-[120px] object-cover object-center"
    />
  </div>,
  <div
    key="1"
    className={`${CARD_BASE} bg-white border border-zinc-200/80 p-3.5 justify-between shadow-sm`}
  >
    <p className="text-xs font-black leading-snug text-zinc-900 uppercase flex-1 flex items-center">
      &quot;Partnering with Born & Bred feels like having a high-performing
      internal growth team.&quot;
    </p>
    <div className="flex gap-1.5 shrink-0 mt-2">
      <span className="bg-zinc-100 border border-zinc-200 px-2 py-1 rounded-full text-[9px] font-black flex items-center gap-0.5">
        🧠 29
      </span>
      <span className="bg-zinc-100 border border-zinc-200 px-2 py-1 rounded-full text-[9px] font-black flex items-center gap-0.5">
        🥰 43
      </span>
    </div>
  </div>,
  <div
    key="2"
    className={`${CARD_BASE} bg-zinc-100/80 p-3.5 items-center justify-center border border-zinc-200/80`}
  >
    <div className="text-[8px] font-black leading-tight tracking-widest text-zinc-900/40 uppercase text-center">
      <p>L O V E W H A T Y O U S A V E</p>
      <p>L O V E W H A T Y O U S A V E</p>
      <p>S A V E W H A T Y O U L O V E</p>
    </div>
  </div>,
  <div key="3" className={`${CARD_BASE} bg-black`}>
    <img
      src={IMAGES.del_monte_fruits}
      alt="Del Monte"
      className="w-full h-full min-h-[120px] object-cover object-center"
    />
  </div>,
  <div
    key="4"
    className={`${CARD_BASE} bg-[#00AEEF] items-center justify-center p-4`}
  >
    <h3 className="text-white text-lg md:text-xl font-black italic tracking-tighter text-center">
      eaze
    </h3>
  </div>,
  <div key="5" className={`${CARD_BASE} bg-black`}>
    <img
      src={IMAGES.cyberpunk_group}
      alt="Cyberpunk Group"
      className="w-full h-full min-h-[120px] object-cover object-center"
    />
  </div>,
  <div
    key="6"
    className={`${CARD_BASE} bg-black items-center justify-center p-4 relative`}
  >
    <div className="absolute inset-0 opacity-20">
      <div className="w-full h-full bg-linear-to-br from-blue-500 to-transparent" />
    </div>
    <div className="relative z-10 flex items-center gap-1.5">
      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shrink-0">
        <div className="w-3 h-3 bg-black rounded-sm rotate-45" />
      </div>
      <span className="text-white text-base md:text-lg font-black tracking-tighter">
        Pfizer
      </span>
    </div>
  </div>,
  <div
    key="7"
    className={`${CARD_BASE} bg-[#2D2DFF] items-center justify-center p-4`}
  >
    <h3 className="text-white text-base md:text-lg font-black tracking-tighter uppercase text-center">
      SEQUEL
    </h3>
  </div>,
  <div key="8" className={`${CARD_BASE} bg-[#FFD700]`}>
    <img
      src={IMAGES.yellow_pitchfork}
      alt="Pitchfork"
      className="w-full h-full min-h-[120px] object-cover object-center"
    />
  </div>,
  <div
    key="9"
    className={`${CARD_BASE} bg-white p-3.5 justify-between border border-zinc-200/80 shadow-sm`}
  >
    <p className="text-xs font-black leading-snug text-zinc-900 uppercase flex-1 flex items-center">
      &quot;Your team took us to a whole new level.&quot;
    </p>
    <div className="flex gap-1.5 flex-wrap shrink-0 mt-2">
      <span className="bg-zinc-100 border border-zinc-200 px-2 py-1 rounded-full text-[9px] font-black flex items-center gap-0.5">
        🚀 23
      </span>
      <span className="bg-zinc-100 border border-zinc-200 px-2 py-1 rounded-full text-[9px] font-black flex items-center gap-0.5">
        🦄 11
      </span>
      <span className="bg-zinc-100 border border-zinc-200 px-2 py-1 rounded-full text-[9px] font-black flex items-center gap-0.5">
        💰 43
      </span>
    </div>
  </div>,
  <div
    key="10"
    className={`${CARD_BASE} bg-[#5865F2] items-center justify-center p-4`}
  >
    <div className="flex flex-col items-center gap-1.5">
      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shrink-0">
        <div className="flex gap-0.5">
          <div className="w-1 h-1 bg-[#5865F2] rounded-full" />
          <div className="w-1 h-1 bg-[#5865F2] rounded-full" />
        </div>
      </div>
      <span className="text-white text-sm font-black tracking-tighter text-center">
        Discord
      </span>
    </div>
  </div>,
  <div
    key="11"
    className={`${CARD_BASE} bg-zinc-100/60 border border-zinc-200/80 opacity-50`}
  />,
];

export function GrowTodaySection() {
  return (
    <section
      id="grow"
      className="bg-white py-24 md:py-32 min-h-screen overflow-hidden relative"
    >
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-10 gap-8">
          <div className="flex-1">
            <h2 className="text-[clamp(2rem,6vw,4.5rem)] font-black leading-[0.85] tracking-wide uppercase text-zinc-900">
              Grow Today
            </h2>
          </div>

          <div className="flex flex-col items-end gap-6">
            <div className="relative">
              <div className="text-[10px] font-black uppercase tracking-widest mb-1.5 text-zinc-900">
                WARNING: This button changes lives
              </div>
              <svg
                width="50"
                height="32"
                viewBox="0 0 60 40"
                className="absolute -right-10 top-4"
              >
                <path
                  d="M10 5 Q 30 5, 45 25"
                  stroke="black"
                  fill="none"
                  strokeWidth="1.5"
                />
                <path
                  d="M40 20 L45 25 L50 20"
                  stroke="black"
                  fill="none"
                  strokeWidth="1.5"
                />
              </svg>
            </div>

            <motion.div
              whileHover={{ scale: 0.98 }}
              className="bg-brand-red w-full lg:w-[320px] aspect-[2/1] flex items-center justify-center cursor-pointer rounded-xl shadow-lg"
            >
              <span className="text-white font-black uppercase tracking-widest text-xs">
                WORK WITH US
              </span>
            </motion.div>
          </div>
        </div>

        <FlipModalGrid
          gridClassName="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-4 gap-3 md:gap-4"
          boxClassName="min-w-0 aspect-square"
          boxContentClassName="aspect-square w-full h-full min-h-[100px] sm:min-h-0 rounded-xl overflow-hidden cursor-pointer flex items-center justify-center [&>div]:min-h-full [&>div]:min-w-0 [&>div]:w-full [&>div]:h-full"
          itemWrapperClassNames={undefined}
          modalContentClassName="[&>*]:w-full [&>*]:h-full [&>*]:min-h-0 [&>*]:rounded-xl [&>*]:overflow-hidden"
        >
          {GRID_ITEMS}
        </FlipModalGrid>
      </div>
    </section>
  );
}
