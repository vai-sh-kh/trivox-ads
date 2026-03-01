import { IS_HERO_SECTION_FULL } from "@/lib/constants";
import { VideoHeroContainer } from "@/components/video-hero-container";
import { Hero } from "@/components/hero";
import { FeaturedSection } from "@/components/featured-section";
import { DefiningMomentsSection } from "@/components/defining-moments-section";
import { ResultsShowcase } from "@/components/results-showcase";
import { ServicesSection } from "@/components/services-section";
import { StatsSection } from "@/components/stats-section";
import { Principles } from "@/components/principles";
import { HallOfFame } from "@/components/hall-of-fame";
import { GrowTodaySection } from "@/components/grow-today-section";
import { Footer } from "@/components/footer";
import { MotionPathScroll } from "@/components/motion-path-scroll";

export default function Home() {
  return (
    <main className="selection:bg-black selection:text-white overflow-x-hidden">
      {!IS_HERO_SECTION_FULL ? (
        <VideoHeroContainer />
      ) : (
        <>
          <Hero />
          <FeaturedSection />
        </>
      )}
      <MotionPathScroll>
        <DefiningMomentsSection />
        <ResultsShowcase />
        </MotionPathScroll>

        <ServicesSection />
        <StatsSection />
        <Principles />
        <HallOfFame />
        <GrowTodaySection />
      <Footer />
    </main>
  );
}
