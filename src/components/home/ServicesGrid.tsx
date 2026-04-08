import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ServiceCard from "./ServiceCard";
import { services } from "@/data/services";

export default function ServicesGrid() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeading
          title="Hizmetlerimiz"
          subtitle="İşletmenizin dijital büyümesi için ihtiyacınız olan tüm hizmetler tek çatı altında."
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </Container>
    </section>
  );
}
