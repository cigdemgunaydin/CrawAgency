import Hero from "@/components/home/Hero";
import MarqueeStrip from "@/components/home/MarqueeStrip";
import ServicesGrid from "@/components/home/ServicesGrid";
import VirtualTourShowcase from "@/components/home/VirtualTourShowcase";
import WhySection from "@/components/home/WhySection";
import CTABanner from "@/components/home/CTABanner";

export default function Home() {
  return (
    <>
      <Hero />
      <MarqueeStrip />
      <ServicesGrid />
      <VirtualTourShowcase />
      <WhySection />
      <CTABanner />
    </>
  );
}
