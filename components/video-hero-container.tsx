"use client";

import { useRef } from "react";
import { Hero } from "@/components/hero";
import { FeaturedSection } from "@/components/featured-section";

export function VideoHeroContainer() {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="relative min-h-screen overflow-hidden bg-black isolate">
      {/* Video as full background */}
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

      {/* Content: Hero + FeaturedSection - video runs through hero text */}
      <div className="relative z-10">
        <Hero />
        <FeaturedSection embedded />
      </div>
    </section>
  );
}
