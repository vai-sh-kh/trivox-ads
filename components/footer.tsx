"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRef, useLayoutEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SlidingText } from "@/components/sliding-text";
import {
  CONTACT,
  MEDIA_LINKS,
  NAV_LINKS,
  SERVICE_NAMES,
} from "@/lib/constants";

const SERVICES_COL1 = SERVICE_NAMES.slice(0, 3);
const SERVICES_COL2 = SERVICE_NAMES.slice(3, 6);

const SOCIAL_LINKS = [
  { label: "Instagram", href: CONTACT.instagram },
  { label: "Facebook", href: CONTACT.facebook },
];

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const topSectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const footer = footerRef.current;
    const topSection = topSectionRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footer,
          start: "top 92%",
          once: true,
        },
      });

      // Footer wrapper: opacity + y on enter
      tl.fromTo(
        footer,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      );

      // Stagger the three top columns (starts before footer animation ends)
      if (topSection) {
        const cols = gsap.utils.toArray<HTMLElement>(
          topSection.querySelectorAll("[data-footer-col]"),
        );
        if (cols.length) {
          gsap.set(cols, { opacity: 0, y: 20 });
          tl.to(
            cols,
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.1,
              ease: "power2.out",
            },
            "-=0.4",
          );
        }
      }
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="text-white overflow-hidden font-sans footer-gradient"
      data-cursor-white
    >
      <div className="w-full max-w-[1920px] mx-auto">
        {/* Top section: 3 columns with two 1px vertical white lines */}
        <div
          ref={topSectionRef}
          className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)_1px_minmax(0,1fr)] gap-0 px-8 sm:px-10 lg:px-14 pt-28 lg:pt-36 pb-0"
        >
          {/* ——— Column 1: Get in touch & Contact (from docs/constants) ——— */}
          <div
            data-footer-col
            className="pt-0 pb-20 lg:pb-28 border-b border-white/50 lg:border-b-0"
          >
            <h3
              className="uppercase font-bold tracking-[0.06em] mb-6"
              style={{ fontSize: "24px", lineHeight: 1.2 }}
            >
              GET IN TOUCH
            </h3>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 border border-white rounded-[6px] px-5 py-3.5 text-white hover:bg-white/10 transition-colors max-w-[280px] mb-10 uppercase tracking-wide"
              style={{ fontSize: "16px" }}
            >
              <SlidingText>Start a project</SlidingText>
              <ArrowRight size={18} strokeWidth={2} className="shrink-0" />
            </Link>
            <div className="flex gap-16">
              <div className="space-y-4">
                {MEDIA_LINKS.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-white hover:opacity-90 transition-opacity"
                    style={{ fontSize: "16px", letterSpacing: "0.01em" }}
                  >
                    <SlidingText>{label}</SlidingText>
                    <span>→</span>
                  </a>
                ))}
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-1.5 text-white hover:opacity-90 transition-opacity"
                  style={{ fontSize: "16px", letterSpacing: "0.01em" }}
                >
                  <SlidingText>Contact</SlidingText>
                  <span>→</span>
                </Link>
              </div>
              <div className="space-y-2">
                <p style={{ fontSize: "16px" }}>Start A Project</p>
                <a
                  href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                  className="block text-white hover:underline"
                  style={{ fontSize: "16px" }}
                >
                  {CONTACT.phone}
                </a>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="uppercase hover:underline block"
                  style={{ fontSize: "16px" }}
                >
                  {CONTACT.email}
                </a>
              </div>
            </div>
          </div>

          {/* Vertical line 1 — 1px white, full height of top section */}
          <div
            className="hidden lg:block bg-white/50 min-h-full w-px self-stretch"
            style={{ width: "1px" }}
          />

          {/* ——— Column 2: Navigation + Services (first half) ——— */}
          <div
            data-footer-col
            className="px-0 lg:px-10 pt-10 lg:pt-0 pb-20 lg:pb-28 flex flex-col border-b border-white/50 lg:border-b-0"
          >
            <h3
              className="uppercase font-bold tracking-[0.06em] mb-6"
              style={{ fontSize: "24px", lineHeight: 1.2 }}
            >
              NAVIGATION
            </h3>
            <div className="flex gap-12 lg:gap-14">
              <ul className="space-y-5">
                {NAV_LINKS.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="group inline-block text-white hover:opacity-90 transition-opacity"
                      style={{ fontSize: "18px" }}
                    >
                      <SlidingText>{label}</SlidingText>
                    </Link>
                  </li>
                ))}
              </ul>
              <div>
                <p
                  className="font-bold uppercase mb-4 tracking-wide"
                  style={{ fontSize: "15px" }}
                >
                  SERVICES
                </p>
                <ul className="space-y-5">
                  {SERVICES_COL1.map((name) => (
                    <li key={name}>
                      <Link
                        href="/digital-marketing"
                        className="group inline-block text-white hover:opacity-90 transition-opacity"
                        style={{ fontSize: "18px" }}
                      >
                        <SlidingText>{name}</SlidingText>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Vertical line 2 — 1px, reduced opacity */}
          <div
            className="hidden lg:block bg-white/50 min-h-full w-px self-stretch"
            style={{ width: "1px" }}
          />

          {/* ——— Column 3: Copyright + Services (second half) ——— */}
          <div
            data-footer-col
            className="pl-0 lg:pl-10 pt-10 lg:pt-0 pb-20 lg:pb-28 flex flex-col"
          >
            <p
              className="uppercase mb-6 tracking-wide"
              style={{ fontSize: "18px", letterSpacing: "0.04em" }}
            >
              ©TRIVOXADS 2026
            </p>
            <div className="flex gap-12 lg:gap-14 flex-wrap">
              <div>
                <p
                  className="font-bold uppercase mb-4 tracking-wide"
                  style={{ fontSize: "15px" }}
                >
                  SERVICES
                </p>
                <ul className="space-y-5">
                  {SERVICES_COL2.map((name) => (
                    <li key={name}>
                      <Link
                        href="/digital-marketing"
                        className="group inline-block text-white hover:opacity-90 transition-opacity"
                        style={{ fontSize: "18px" }}
                      >
                        <SlidingText>{name}</SlidingText>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal divider — full width, 1px, reduced opacity */}
        <div
          className="w-full shrink-0 bg-white/50"
          style={{ height: "1px" }}
          aria-hidden
        />

        {/* Bottom: legal links + large wordmark */}
        <div className="px-8 sm:px-10 lg:px-14 pt-14 pb-14">
          <div className="flex flex-wrap gap-8 lg:gap-12 mb-6">
            <a
              href="#"
              className="group inline-block uppercase font-medium hover:opacity-90 transition-opacity"
              style={{
                fontSize: "12px",
                letterSpacing: "0.14em",
              }}
            >
              <SlidingText>PRIVACY POLICY</SlidingText>
            </a>
            <a
              href="#"
              className="group inline-block uppercase font-medium hover:opacity-90 transition-opacity"
              style={{
                fontSize: "12px",
                letterSpacing: "0.14em",
              }}
            >
              <SlidingText>COOKIES</SlidingText>
            </a>
            <a
              href="#"
              className="group inline-block uppercase font-medium hover:opacity-90 transition-opacity"
              style={{
                fontSize: "12px",
                letterSpacing: "0.14em",
              }}
            >
              <SlidingText>TERMS AND CONDITIONS</SlidingText>
            </a>
          </div>
          <p
            className="font-black uppercase text-white leading-[0.82] select-none"
            style={{
              fontSize: "clamp(4.5rem, 14vw, 12rem)",
              letterSpacing: "0.02em",
            }}
            aria-hidden
          >
            TRIVOXADS
          </p>
        </div>
      </div>
    </footer>
  );
}
