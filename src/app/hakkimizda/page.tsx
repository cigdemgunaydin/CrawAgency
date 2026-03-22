import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import CompanyStory from "@/components/about/CompanyStory";
import ValuesSection from "@/components/about/ValuesSection";
import TeamGrid from "@/components/about/TeamGrid";
import Timeline from "@/components/about/Timeline";

export const metadata: Metadata = generatePageMetadata({
  title: "Hakkımızda",
  description:
    "CrawAgency hakkında bilgi edinin. Hikayemiz, değerlerimiz, ekibimiz ve yerel işletmelerin dijital başarısı için misyonumuz.",
  path: "/hakkimizda",
});

export default function HakkimizdaPage() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          title="Hakkımızda"
          subtitle="Yerel işletmelerin dijital başarı hikayelerini yazan ekip."
        />
        <CompanyStory />
        <ValuesSection />
        <TeamGrid />
        <Timeline />
      </Container>
    </section>
  );
}
