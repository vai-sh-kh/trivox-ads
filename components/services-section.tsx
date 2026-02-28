"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const services = [
  "Market Research",
  "Brand Strategy",
  "Brand Messaging",
  "Brand Identity",
  "Campaigns",
  "Go-To-Market",
  "Website Design",
  "Web Development",
  "Communications",
  "Content & SEO",
  "Performance Marketing",
  "Social Media & UGC",
];

const serviceImages = [
  "/images/futuristic-brain.jpg",
  "/images/go-to-market.jpg",
  "/images/discord-purple.jpg",
  "/images/sequel-blue.jpg",
  "/images/woman-phone.jpg",
  "/images/del-monte-fruits.jpg",
  "/images/cyberpunk-group.jpg",
  "/images/yellow-pitchfork.jpg",
  "/images/futuristic-brain.jpg",
  "/images/discord-purple.jpg",
  "/images/sequel-blue.jpg",
  "/images/woman-phone.jpg",
];

export function ServicesSection() {
  return (
    <section
      id="services"
      className="bg-white py-24 md:py-32 min-h-screen border-t border-zinc-100 relative overflow-hidden"
    >
      <div className="max-w-[1920px] mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-24 gap-12 relative">
          <h2 className="text-4xl md:text-[4.5vw] lg:text-[3vw] font-medium tracking-tight max-w-4xl leading-[1.15] text-black">
            <span className="text-[#FF0000]">Our services</span> have been
            developed to <span className="font-semibold">Ignite</span> your next
            leap forward
          </h2>

          {/* <div className="relative w-28 h-28 md:w-32 md:h-32 flex items-center justify-center group cursor-pointer shrink-0">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path
                  id="servicesPath"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  fill="none"
                />
                <text className="text-[7px] font-black uppercase tracking-[0.2em] fill-black">
                  <textPath xlinkHref="#servicesPath">
                    VIEW ALL SERVICES • VIEW ALL SERVICES •
                  </textPath>
                </text>
              </svg>
            </motion.div>
            <div className="w-14 h-14 bg-[#FF0000] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
              <ArrowRight size={24} className="text-white" />
            </div>
          </div> */}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 border-t border-l border-zinc-200">
          {services.map((service, i) => (
            <motion.div
              key={i}
              className="h-[140px] sm:h-[160px] flex items-center justify-center p-6 bg-white border-r border-b border-zinc-200 text-center group cursor-pointer relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0">
                <Image
                  src={serviceImages[i]}
                  alt={service}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/50" />
              </div>
              <span className="text-base sm:text-lg font-normal text-zinc-800 group-hover:text-white group-hover:drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] relative z-10 transition-all duration-300">
                {service}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
