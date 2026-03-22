import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { caseStudies } from "@/data/caseStudies";

export default function ReferencesPreview() {
  const featured = caseStudies.slice(0, 3);

  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          title="Başarı Hikayeleri"
          subtitle="Müşterilerimizin gerçek sonuçlarına göz atın."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((study) => (
            <Card key={study.id}>
              <Badge variant="terracotta">{study.categoryLabel}</Badge>
              <h3 className="mt-3 font-body text-xl font-semibold text-text-primary">
                {study.businessName}
              </h3>
              <p className="text-sm text-text-tertiary">{study.businessType}</p>
              <div className="mt-4 rounded-lg bg-cream-100 p-4 text-center">
                <div className="font-body text-2xl font-bold text-terracotta-400">
                  {study.result.value}
                </div>
                <div className="text-sm text-text-secondary">{study.result.metric}</div>
              </div>
              <p className="mt-4 text-sm text-text-secondary leading-relaxed">
                {study.challenge}
              </p>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button href="/referanslar" variant="outline">
            Tüm Referansları Gör
          </Button>
        </div>
      </Container>
    </section>
  );
}
