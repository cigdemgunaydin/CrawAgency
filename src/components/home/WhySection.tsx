import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";

const reasons = [
  {
    title: "Sonuç Odaklı Yaklaşım",
    description:
      "Güzel raporlar değil, gerçek sonuçlar. Her stratejimiz ölçülebilir KPI'lara bağlıdır.",
  },
  {
    title: "Şeffaf İletişim",
    description:
      "Her adımda sizi bilgilendiriyoruz. Neye ne kadar harcandığını, ne sonuç verdiğini açıkça görürsünüz.",
  },
  {
    title: "Yerel Uzmanlık",
    description:
      "Türk pazarını ve yerel tüketici davranışlarını biliyoruz. Stratejilerimiz yerel dinamiklere uygun.",
  },
];

export default function WhySection() {
  return (
    <section className="py-20 bg-cream-200">
      <Container>
        <SectionHeading
          title="Neden CrawAgency?"
          subtitle="Yerel işletmelerin dijital başarısı için doğru partneriz."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {reasons.map((reason) => (
            <Card key={reason.title}>
              <h3 className="font-body text-xl font-semibold text-text-primary mb-2">
                {reason.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {reason.description}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
