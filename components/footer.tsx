"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";

const HOME_LINKS = [
  { label: "Home", href: "#" },
  { label: "Results", href: "#results" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
  { label: "Blog", href: "#" },
];

const SERVICES_COL1 = [
  "Market Research",
  "Brand Messaging",
  "Campaigns",
  "Website Design",
  "Communications",
  "Performance Marketing",
];

const SERVICES_COL2 = [
  "Brand Strategy",
  "Brand Identity",
  "Go-To-Market",
  "Web Development",
  "Content & SEO",
  "Social Media & UGC",
];

const INDUSTRIES_COL1 = [
  "AI",
  "Alt Medicine",
  "B2B",
  "Clinics & Hospitals",
  "Consumer Health",
  "Financial Services",
];

const INDUSTRIES_COL2 = ["Fintech", "HealthTech", "Real Estate", "Tech"];

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "Behance", href: "#" },
];

export function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-brand-red text-white overflow-hidden font-sans">
      <div className="w-full max-w-[1920px] mx-auto">
        {/* Top section: 3 columns with two 1px vertical white lines */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)_1px_minmax(0,1fr)] gap-0 px-8 sm:px-10 lg:px-14 pt-28 lg:pt-36 pb-0">
          {/* ——— Column 1: Subscribe & Contact ——— */}
          <div className="pt-0 pb-20 lg:pb-28 border-b border-white/50 lg:border-b-0">
            <h3
              className="uppercase font-bold tracking-[0.06em] mb-6"
              style={{ fontSize: "24px", lineHeight: 1.2 }}
            >
              SUBSCRIBE TO STAY IN TOUCH.
            </h3>
            <div className="flex items-center border border-white rounded-[6px] overflow-hidden bg-transparent max-w-[420px] mb-10">
              <input
                type="email"
                placeholder="ENTER EMAIL ADDRESS.."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent px-4 py-3.5 text-white placeholder:text-white/90 outline-none min-w-0 uppercase tracking-wide"
                style={{ fontSize: "16px" }}
              />
              <button
                type="button"
                className="shrink-0 w-12 h-12 flex items-center justify-center border-l border-white text-white hover:bg-white/10 transition-colors"
                aria-label="Subscribe"
              >
                <ArrowRight size={20} strokeWidth={2} />
              </button>
            </div>
            <div className="flex gap-16">
              <div className="space-y-4">
                {SOCIAL_LINKS.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="flex items-center gap-1.5 text-white hover:opacity-90 transition-opacity"
                    style={{ fontSize: "16px", letterSpacing: "0.01em" }}
                  >
                    {label} →
                  </a>
                ))}
              </div>
              <div className="space-y-2">
                <p style={{ fontSize: "16px" }}>Start A Project</p>
                <p style={{ fontSize: "16px" }}>
                  Text or Call: +1 (415) 840 4427
                </p>
                <a
                  href="mailto:hello@trivoxad.com"
                  className="uppercase hover:underline block"
                  style={{ fontSize: "16px" }}
                >
                  HELLO@TRIVOXAD.COM
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
          <div className="px-0 lg:px-10 pt-10 lg:pt-0 pb-20 lg:pb-28 flex flex-col border-b border-white/50 lg:border-b-0">
            <h3
              className="uppercase font-bold tracking-[0.06em] mb-6"
              style={{ fontSize: "24px", lineHeight: 1.2 }}
            >
              NAVIGATION
            </h3>
            <div className="flex gap-12 lg:gap-14">
              <ul className="space-y-5">
                {HOME_LINKS.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-white hover:opacity-90 transition-opacity"
                      style={{ fontSize: "18px" }}
                    >
                      {label}
                    </a>
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
                      <a
                        href="#"
                        className="text-white hover:opacity-90 transition-opacity"
                        style={{ fontSize: "18px" }}
                      >
                        {name}
                      </a>
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

          {/* ——— Column 3: Copyright + Services (second half) + Industries ——— */}
          <div className="pl-0 lg:pl-10 pt-10 lg:pt-0 pb-20 lg:pb-28 flex flex-col">
            <p
              className="uppercase mb-6 tracking-wide"
              style={{ fontSize: "18px", letterSpacing: "0.04em" }}
            >
              ©TRIVOXAD 2026
            </p>
            <div className="flex gap-12 lg:gap-14 flex-wrap">
              <div>
                <ul className="space-y-5">
                  {SERVICES_COL2.map((name) => (
                    <li key={name}>
                      <a
                        href="#"
                        className="text-white hover:opacity-90 transition-opacity"
                        style={{ fontSize: "18px" }}
                      >
                        {name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-12 lg:gap-14">
                <div>
                  <p
                    className="font-bold uppercase mb-4 tracking-wide"
                    style={{ fontSize: "15px" }}
                  >
                    INDUSTRIES
                  </p>
                  <ul className="space-y-5">
                    {INDUSTRIES_COL1.map((name) => (
                      <li key={name}>
                        <a
                          href="#"
                          className="text-white hover:opacity-90 transition-opacity"
                          style={{ fontSize: "18px" }}
                        >
                          {name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <ul className="space-y-5 pt-7">
                  {INDUSTRIES_COL2.map((name) => (
                    <li key={name}>
                      <a
                        href="#"
                        className="text-white hover:opacity-90 transition-opacity"
                        style={{ fontSize: "18px" }}
                      >
                        {name}
                      </a>
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
              className="uppercase font-medium hover:opacity-90 transition-opacity"
              style={{
                fontSize: "12px",
                letterSpacing: "0.14em",
              }}
            >
              PRIVACY POLICY
            </a>
            <a
              href="#"
              className="uppercase font-medium hover:opacity-90 transition-opacity"
              style={{
                fontSize: "12px",
                letterSpacing: "0.14em",
              }}
            >
              COOKIES
            </a>
            <a
              href="#"
              className="uppercase font-medium hover:opacity-90 transition-opacity"
              style={{
                fontSize: "12px",
                letterSpacing: "0.14em",
              }}
            >
              TERMS AND CONDITIONS
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
            Trivoxad
          </p>
        </div>
      </div>
    </footer>
  );
}
