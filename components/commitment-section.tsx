"use client";

import { motion } from "motion/react";

export function CommitmentSection() {
  return (
    <section
      id="contact"
      className="bg-white py-24 md:py-32 min-h-screen border-t border-zinc-200 relative overflow-hidden"
    >
      <div className="max-w-[1800px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-16 md:mb-20 gap-10">
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] md:text-[clamp(2.25rem,5.5vw,4rem)] font-black leading-[0.85] tracking-tighter uppercase max-w-2xl">
            READY FOR
            <br />
            COMMITMENT?
          </h2>
          <p className="text-zinc-600 max-w-[400px] text-lg font-medium leading-relaxed pt-4">
            We believe in building long-term, high-impact relationships. Whether
            you&apos;re testing the waters or ready to go all-in, we&apos;ve got
            the right setup to meet you where you are.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#F8F8F8] p-8 md:p-12 rounded-2xl flex flex-col items-center text-center">
            <div className="flex gap-4 mb-8">
              <div className="bg-white px-4 py-2 rounded-full shadow-sm flex items-center gap-2">
                <span>💋</span> <span className="text-xs font-black">4</span>
              </div>
              <div className="bg-white px-4 py-2 rounded-full shadow-sm flex items-center gap-2">
                <span>😍</span> <span className="text-xs font-black">19</span>
              </div>
              <div className="bg-white px-4 py-2 rounded-full shadow-sm flex items-center gap-2">
                <span>🔥</span> <span className="text-xs font-black">20</span>
              </div>
            </div>

            <h3 className="text-2xl md:text-3xl font-semibold mb-6">Project</h3>

            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {[
                "Rebrand",
                "GTM Launch",
                "Website",
                "Large Defined Deliverables",
              ].map((tag) => (
                <span
                  key={tag}
                  className="bg-zinc-200 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-zinc-600 text-base mb-2">
              A great way to try us out — clear scope, no pressure.
            </p>
            <a
              href="#"
              className="text-black font-black underline underline-offset-4 mb-8"
            >
              Let&apos;s go to dinner, see if we click
            </a>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-brand-red text-white px-12 py-5 rounded-full font-black text-sm uppercase tracking-widest"
            >
              START A PROJECT
            </motion.button>
          </div>

          <div className="bg-black text-white p-8 md:p-12 rounded-2xl flex flex-col items-center text-center">
            <div className="flex gap-4 mb-8">
              <div className="bg-zinc-900 px-4 py-2 rounded-full border border-zinc-800 flex items-center gap-2">
                <span>💋</span> <span className="text-xs font-black">4</span>
              </div>
              <div className="bg-zinc-900 px-4 py-2 rounded-full border border-zinc-800 flex items-center gap-2">
                <span>💍</span> <span className="text-xs font-black">19</span>
              </div>
              <div className="bg-zinc-900 px-4 py-2 rounded-full border border-zinc-800 flex items-center gap-2">
                <span>💒</span> <span className="text-xs font-black">20</span>
              </div>
            </div>

            <h3 className="text-2xl md:text-3xl font-semibold mb-6">
              Retainer
            </h3>

            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {[
                "Social Media",
                "Campaigns",
                "Performance Ads",
                "Ongoing Flexible Needs",
              ].map((tag) => (
                <span
                  key={tag}
                  className="bg-zinc-800 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-zinc-400 text-base mb-2">
              Ready to go steady? This is for the real ones.
            </p>
            <a
              href="#"
              className="text-white font-black underline underline-offset-4 mb-8"
            >
              Let&apos;s make it a regular thing
            </a>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-brand-red text-white px-12 py-5 rounded-full font-black text-sm uppercase tracking-widest"
            >
              BEGIN RETAINER
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
