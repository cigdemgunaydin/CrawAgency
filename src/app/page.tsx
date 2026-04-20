import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import Hero from "@/components/home/Hero";
import MarqueeStrip from "@/components/home/MarqueeStrip";
import ServicesGrid from "@/components/home/ServicesGrid";
import MidCTA from "@/components/home/MidCTA";
import VirtualTourShowcase from "@/components/home/VirtualTourShowcase";
import StatsSection from "@/components/home/StatsSection";
import WhySection from "@/components/home/WhySection";
import CTABanner from "@/components/home/CTABanner";

export const metadata: Metadata = generatePageMetadata({
  title: "Yerel İşletmenizi Dijitalde Büyütüyoruz",
  description:
    "CrawAgency ile dijital pazarlama, SEO, sosyal medya yönetimi, web tasarım ve Google & Meta reklamlarıyla işletmenizi büyütün.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <Hero />
      <MarqueeStrip />
      <ServicesGrid />
      <MidCTA />
      <VirtualTourShowcase />
      <StatsSection />
      <WhySection />
      <CTABanner />
    </>
  );
}
