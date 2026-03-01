"use client";

import { motion } from "motion/react";
import { Menu } from "lucide-react";
import { SlidingText } from "@/components/sliding-text";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

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
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center relative gap-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 flex-1 justify-start"
        >
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Trivoxad Logo"
              width={540}
              height={45}
              className="w-auto h-12 md:h-14 lg:h-16 object-contain"
              priority
            />
          </Link>
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

        <div className="flex items-center gap-2 sm:gap-4 flex-1 justify-end min-w-0 shrink-0">
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="group bg-[#4A148C] text-white px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 rounded-full text-[10px] sm:text-[12px] font-black uppercase tracking-widest hover:scale-105 transition-transform whitespace-nowrap"
          >
            <SlidingText>WORK WITH US</SlidingText>
          </motion.button>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            onClick={onMenuClick}
            className="group bg-[#F2F2F2] text-[#4A148C] px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-full text-[10px] sm:text-[12px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-[#4A148C] hover:text-white transition-colors shrink-0"
          >
            <Menu size={14} className="sm:w-4 sm:h-4" strokeWidth={4} />
            <SlidingText>MENU</SlidingText>
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}
