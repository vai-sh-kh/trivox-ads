import { IS_HERO_SECTION_FULL } from "@/lib/constants";
import { VideoHeroContainer } from "@/components/video-hero-container";
import { Hero } from "@/components/hero";
import { FeaturedSection } from "@/components/featured-section";
import { DefiningMomentsSection } from "@/components/defining-moments-section";
import { HowWeHelpSection } from "@/components/how-we-help-section";
import { ServicesSection } from "@/components/services-section";
import { StatsSection } from "@/components/stats-section";
import { Principles } from "@/components/principles";
import { HallOfFame } from "@/components/hall-of-fame";
import { FAQSection } from "@/components/faq-section";
import { GrowTodaySection } from "@/components/grow-today-section";
import { Footer } from "@/components/footer";
import { MotionPathScrollWithHomeCards } from "@/components/motion-path-scroll";

export default function Home() {
  return (
    <main className="selection:bg-black selection:text-white overflow-x-hidden w-full max-w-[100vw] min-h-dvh">
      {!IS_HERO_SECTION_FULL ? (
        <VideoHeroContainer />
      ) : (
        <>
          <Hero />
          <FeaturedSection />
        </>
      )}

      <MotionPathScrollWithHomeCards>
        <div data-motion-reveal="fade-up">
          <DefiningMomentsSection />
        </div>
        <div data-motion-reveal="fade-up">
          <HowWeHelpSection />
        </div>
        <div data-motion-reveal="fade-up">
          <ServicesSection />
        </div>
        <div data-motion-reveal="fade-up">
          <StatsSection />
        </div>
        <div data-motion-reveal="fade-up">
          <Principles />
        </div>
        <div data-motion-reveal="fade-up">
          <GrowTodaySection />
        </div>
      </MotionPathScrollWithHomeCards>

      <div data-motion-reveal="fade-up">
        <HallOfFame />
      </div>
      <div data-motion-reveal="fade-up">
        <FAQSection />
      </div>
      <div data-motion-reveal="fade-up">
        <Footer />
      </div>
    </main>
  );
}
