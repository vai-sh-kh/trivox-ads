"use client";

import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

const HEADER_TEXTS = [
  "2X ADWEEK'S FASTEST GROWING AGENCY",
  "CREATIVE THAT DRIVES RESULTS",
  "YOUR GROWTH PARTNER IN ADS",
];

const NAV_LINKS = [
  { label: "Results", href: "#results" },
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "Behance", href: "#" },
];

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
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
  }, [isOpen, textIndex, displayText, isDeleting]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="menu-overlay"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.12 }}
          className="fixed inset-0 z-[100] overflow-y-auto bg-white font-sans"
        >
          {/* Header - matches reference: logo left, slogan center, buttons right */}
          <header className="relative max-w-[1920px] mx-auto px-8 md:px-12 py-6 flex justify-between items-center">
            <span className="text-[26px] md:text-[30px] font-black text-brand-red uppercase leading-[1.1] tracking-tight z-10">
              TRIVOXAD
            </span>

            <span className="hidden sm:block absolute left-1/2 -translate-x-1/2 text-[11px] md:text-xs font-black tracking-[0.12em] uppercase text-black pointer-events-none min-h-[1.2em]">
              {displayText}
              <span className="animate-pulse">|</span>
            </span>

            <div className="flex items-center gap-4 z-10">
              <a
                href="#contact"
                onClick={onClose}
                className="bg-brand-red text-white px-8 py-3.5 rounded-full text-[12px] font-black uppercase tracking-widest hover:scale-105 transition-transform"
              >
                WORK WITH US
              </a>
              <button
                onClick={onClose}
                className="bg-[#F2F2F2] text-black px-6 py-3.5 rounded-full text-[12px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-zinc-200 transition-colors"
                aria-label="Close menu"
              >
                <X size={16} strokeWidth={2.5} />
                EXIT
              </button>
            </div>
          </header>

          {/* Main content - two columns: left ~60% wider, right ~40% with whitespace */}
          <div className="max-w-[1920px] mx-auto px-8 md:px-12 pt-12 md:pt-20 pb-20 flex flex-col md:flex-row md:min-h-[calc(100vh-120px)]">
            {/* Left column - primary nav + CTA */}
            <div className="flex-1 md:max-w-[55%] flex flex-col justify-between">
              <nav className="flex flex-col gap-5 md:gap-7">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={onClose}
                    className="text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] font-black text-black hover:text-zinc-600 transition-colors uppercase tracking-[-0.02em] leading-[1.05]"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <a
                href="#contact"
                onClick={onClose}
                className="mt-12 md:mt-0 bg-brand-red text-white px-10 py-5 rounded-md text-sm font-black uppercase tracking-[0.15em] hover:bg-red-700 transition-colors w-fit"
              >
                WORK WITH US
              </a>
            </div>

            {/* Right column - Blog, social, contact (right-aligned) */}
            <div className="flex-1 md:max-w-[45%] flex flex-col items-end md:pt-0 pt-16">
              <a
                href="#blog"
                onClick={onClose}
                className="text-[2rem] md:text-[2.5rem] font-black text-black hover:text-zinc-600 transition-colors uppercase tracking-[-0.02em] leading-tight text-right"
              >
                Blog
              </a>
              <div className="flex flex-col gap-3 items-end mt-6 md:mt-8">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base md:text-lg font-normal text-black hover:text-zinc-600 transition-colors"
                  >
                    {link.label} →
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={onClose}
                  className="text-base md:text-lg font-normal text-black hover:text-zinc-600 transition-colors"
                >
                  Contact →
                </a>
                <a
                  href="mailto:hello@trivoxads.com"
                  className="text-sm text-black/80 hover:text-black transition-colors mt-1"
                >
                  hello@trivoxads.com
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
