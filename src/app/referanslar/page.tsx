import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import CaseStudyGrid from "@/components/references/CaseStudyGrid";

export const metadata: Metadata = generatePageMetadata({
  title: "Referanslar",
  description:
    "CrawAgency müşterilerinin başarı hikayeleri. Meta reklamları, Google Ads, SEO, web tasarım ve sosyal medya projelerinden gerçek sonuçlar.",
  path: "/referanslar",
});

export default function ReferanslarPage() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          title="Referanslarımız"
          subtitle="Müşterilerimizin dijital dönüşüm hikayelerini keşfedin. Her biri gerçek sonuçlar, gerçek işletmeler."
        />
        <CaseStudyGrid />
      </Container>
    </section>
  );
}
