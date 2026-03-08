"use client";

import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CONTACT, MEDIA_LINKS, HEADER_TEXTS, NAV_LINKS } from "@/lib/constants";

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  const router = useRouter();
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleNavClick = useCallback(
    (href: string) => {
      onClose();
      router.push(href);
    },
    [onClose, router],
  );

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
          className="fixed inset-0 z-100 overflow-y-auto bg-white font-sans"
        >
          {/* Header – fixed height to match main navbar (mobile-first) */}
          <header className="relative h-16 sm:h-[72px] lg:h-[88px] flex items-center max-w-[1920px] mx-auto w-full px-4 sm:px-6 lg:px-8 gap-2 shrink-0">
            <Link
              href="/"
              onClick={onClose}
              className="flex items-center h-10 sm:h-12 lg:h-14 shrink-0 min-h-[44px]"
            >
              <Image
                src="/logo.png"
                alt="TrivoxAds"
                width={200}
                height={56}
                className="h-8 sm:h-10 lg:h-14 w-auto max-w-[120px] sm:max-w-[160px] lg:max-w-[200px] object-contain object-left z-10"
                priority
              />
            </Link>

            <span className="hidden lg:flex flex-1 justify-center absolute left-1/2 -translate-x-1/2 w-full max-w-4xl px-4 text-center text-[0.875rem] min-[1200px]:text-[1rem] font-black tracking-[0.12em] uppercase text-black pointer-events-none min-h-[1.2em] font-sans">
              {displayText}
              <span className="animate-pulse">|</span>
            </span>

            <div className="flex items-center gap-2 sm:gap-4 flex-1 justify-end shrink-0 z-10">
              <Link
                href="/contact"
                onClick={onClose}
                className="inline-block bg-brand-purple text-white px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 rounded-full text-[10px] sm:text-[12px] font-black uppercase tracking-widest hover:scale-105 transition-transform whitespace-nowrap"
              >
                WORK WITH US
              </Link>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onClose();
                }}
                className="bg-[#F2F2F2] text-brand-purple border border-zinc-300/80 px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-full text-[10px] sm:text-[12px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-brand-purple hover:text-white hover:border-brand-purple/50 transition-colors shrink-0"
                aria-label="Close menu"
              >
                <X size={14} className="sm:w-4 sm:h-4" strokeWidth={4} />
                EXIT
              </button>
            </div>
          </header>

          {/* Main content - two columns: left ~60% wider, right ~40% with whitespace */}
          <div className="max-w-[1920px] mx-auto px-4 sm:px-8 md:px-12 pt-16 sm:pt-24 md:pt-32 pb-16 sm:pb-20 flex flex-col md:flex-row md:min-h-[calc(100vh-120px)]">
            {/* Left column - primary nav + CTA */}
            <div className="flex-1 md:max-w-[55%] flex flex-col justify-between">
              <nav className="flex flex-col gap-3 sm:gap-5 md:gap-7 mt-4 md:mt-0">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.label}
                    type="button"
                    onClick={() => handleNavClick(link.href)}
                    className="group relative w-fit text-left text-2xl sm:text-3xl md:text-[3.5rem] lg:text-[4rem] font-bold text-black hover:text-zinc-600 transition-colors duration-300 uppercase tracking-[-0.02em] leading-[1.05] pb-2 min-h-[44px] flex items-center"
                  >
                    <span className="whitespace-nowrap">{link.label}</span>
                    <span
                      className="absolute left-0 bottom-0 h-[3px] w-0 rounded-full bg-current group-hover:w-full transition-[width] duration-300 ease-out"
                      aria-hidden
                    />
                  </button>
                ))}
              </nav>
              <Link
                href="/contact"
                onClick={onClose}
                className="mt-10 sm:mt-16 md:mt-0 mb-16 sm:mb-24 md:mb-16 inline-flex items-center gap-2 bg-brand-purple text-white px-6 sm:px-10 py-4 sm:py-5 rounded-md text-xs sm:text-sm font-black uppercase tracking-[0.15em] hover:bg-purple-900 transition-colors w-fit min-h-[44px] items-center"
              >
                WORK WITH US
                <ArrowRight size={18} strokeWidth={2.5} className="shrink-0" />
              </Link>
            </div>

            {/* Right column - social, contact (right-aligned) */}
            <div className="flex-1 md:max-w-[45%] flex flex-col items-end md:pt-0 pt-16">
              <div className="flex flex-col gap-3 items-end mt-6 md:mt-8">
                {MEDIA_LINKS.map((link) => (
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
                <Link
                  href="/contact"
                  onClick={onClose}
                  className="text-base md:text-lg font-normal text-black hover:text-zinc-600 transition-colors"
                >
                  Contact →
                </Link>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-sm text-black/80 hover:text-black transition-colors mt-1"
                >
                  {CONTACT.email}
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
