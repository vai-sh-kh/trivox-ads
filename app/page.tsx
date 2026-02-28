import { Hero } from "@/components/hero";
import { FeaturedSection } from "@/components/featured-section";
import { DefiningMomentsSection } from "@/components/defining-moments-section";
import { ResultsShowcase } from "@/components/results-showcase";
import { ServicesSection } from "@/components/services-section";
import { StatsSection } from "@/components/stats-section";
import { Principles } from "@/components/principles";
import { HallOfFame } from "@/components/hall-of-fame";
import { CommitmentSection } from "@/components/commitment-section";
import { GrowTodaySection } from "@/components/grow-today-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="selection:bg-black selection:text-white overflow-x-hidden">
      <Hero />
      <FeaturedSection />
      <DefiningMomentsSection />
      <ResultsShowcase />
      <ServicesSection />
      <StatsSection />
      <Principles />
      <HallOfFame />
      <CommitmentSection />
      <GrowTodaySection />
      <Footer />
    </main>
  );
}
