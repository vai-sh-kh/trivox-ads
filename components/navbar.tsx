"use client";

import { motion } from "motion/react";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";

const HEADER_TEXTS = [
  "2X ADWEEK'S FASTEST GROWING AGENCY",
  "CREATIVE THAT DRIVES RESULTS",
  "YOUR GROWTH PARTNER IN ADS",
];

interface NavbarProps {
  onMenuClick?: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  useEffect(() => {
    const fullText = HEADER_TEXTS[textIndex];
    const typeSpeed = isDeleting ? 40 : 80;
    const pauseAtEnd = 2000;

    if (!isDeleting && displayText === fullText) {
      const timeout = setTimeout(() => setIsDeleting(true), pauseAtEnd);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setTextIndex((i) => (i + 1) % HEADER_TEXTS.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        if (isDeleting) {
          setDisplayText(fullText.slice(0, displayText.length - 1));
        } else {
          setDisplayText(fullText.slice(0, displayText.length + 1));
        }
      },
      isDeleting ? typeSpeed : displayText.length === 0 ? 0 : typeSpeed,
    );

    return () => clearTimeout(timeout);
  }, [textIndex, displayText, isDeleting]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full z-50 py-5 bg-transparent"
    >
      <div className="max-w-[1920px] mx-auto px-8 flex justify-between items-center relative">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 flex-1 justify-start"
        >
          <span className="text-[32px] font-black text-[#FF0000] uppercase leading-none">
            TRIVOXAD
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:flex flex-1 justify-center absolute left-1/2 -translate-x-1/2 w-full max-w-4xl px-4 text-center"
        >
          <span className="text-[0.875rem] min-[1200px]:text-[1rem] font-black tracking-[0.12em] uppercase text-black min-h-[1.2em] font-sans">
            {displayText}
            <span className="animate-pulse">|</span>
          </span>
        </motion.div>

        <div className="flex items-center gap-4 flex-1 justify-end">
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#FF0000] text-white px-8 py-3.5 rounded-full text-[12px] font-black uppercase tracking-widest hover:scale-105 transition-transform"
          >
            WORK WITH US
          </motion.button>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            onClick={onMenuClick}
            className="bg-[#F2F2F2] text-black px-6 py-3.5 rounded-full text-[12px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-zinc-200 transition-colors"
          >
            <Menu size={16} strokeWidth={4} />
            MENU
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}
