import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import PricingTabs from "@/components/pricing/PricingTabs";

export const metadata: Metadata = generatePageMetadata({
  title: "Fiyatlandırma",
  description:
    "CrawAgency dijital pazarlama hizmet fiyatları. Meta reklamları, Google Ads, SEO, sosyal medya ve web tasarım paketleri.",
  path: "/fiyatlandirma",
});

export default function FiyatlandirmaPage() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          title="Fiyatlandırma"
          subtitle="İşletmenizin ihtiyaçlarına uygun, şeffaf ve net fiyatlandırma."
        />
        <PricingTabs />
        <p className="mt-12 text-center text-sm text-text-tertiary">
          360° Sanal Tur fiyatlandırması için bizimle{" "}
          <a href="/iletisim" className="text-terracotta-400 hover:underline">
            iletişime geçin
          </a>
          . Fiyatlar KDV hariçtir. Tüm paketler aylık faturalandırılır.
        </p>
      </Container>
    </section>
  );
}
