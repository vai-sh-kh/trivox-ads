"use client";

import { useRef } from "react";
import { Hero } from "@/components/hero";
import { FeaturedSection } from "@/components/featured-section";

export function VideoHeroContainer() {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="relative h-[60vh] min-h-[320px] overflow-hidden bg-black isolate">
      {/* Video as background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/home-banner.mp4" type="video/mp4" />
      </video>

      {/* Content: Hero + optional embedded – text and animation sized for 60% panel */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center">
        <Hero videoBackground />
        <FeaturedSection embedded />
      </div>
    </section>
  );
}
