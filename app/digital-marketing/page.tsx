"use client";

import { Footer } from "@/components/footer";
import { InnerPageLayout } from "@/components/inner-page-layout";
import { SERVICES, SERVICE_DESCRIPTIONS } from "@/lib/constants";
import { motion } from "motion/react";

const INTRO_COPY =
  "TrivoxAds is a performance-driven digital marketing agency focused on creating impactful online strategies that help brands grow, engage, and convert. We blend data, creativity, and technology to deliver measurable results across digital platforms. We specialize in end-to-end digital marketing solutions—executed with real-world market insights and industry best practices.";

export default function DigitalMarketingPage() {
  return (
    <>
      <InnerPageLayout
        contentClassName="w-full"
        centerContent={true}
        showDecorativeCircle={false}
      >
        <div className="space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24">
          {/* Centered hero: title + description, larger font (mobile-first) */}
          <header className="text-center max-w-6xl mx-auto w-full">
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-black uppercase tracking-tight leading-[0.95] mt-6 sm:mt-8 mb-6 sm:mb-8"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              Digital Marketing
            </motion.h1>
            <motion.p
              className="text-sm sm:text-base md:text-lg lg:text-xl text-zinc-600 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {INTRO_COPY}
            </motion.p>
          </header>

          {/* Service cards: matching home page (HowWeHelp / ServicesSection) */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {SERVICES.map((service, i) => (
              <motion.article
                key={service.id}
                className="group relative p-6 sm:p-8 md:p-10 rounded-xl sm:rounded-2xl border border-zinc-200 bg-white hover:border-brand-purple/30 hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.15 + i * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -6 }}
              >
                <h2 className="text-brand-purple font-black text-xl md:text-2xl uppercase tracking-tight mb-6">
                  {service.name}
                </h2>
                <p className="text-zinc-600 leading-relaxed text-base md:text-lg">
                  {SERVICE_DESCRIPTIONS[service.name] ??
                    `Our ${service.name} services are designed to help your brand reach the right audience and achieve measurable growth.`}
                </p>
              </motion.article>
            ))}
          </section>
        </div>
      </InnerPageLayout>
      <Footer />
    </>
  );
}
