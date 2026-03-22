import Card from "@/components/ui/Card";
import { companyValues } from "@/data/company";

export default function ValuesSection() {
  return (
    <section className="mb-16">
      <h2 className="font-heading text-3xl font-bold text-text-primary mb-8 sm:text-4xl">
        Değerlerimiz
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {companyValues.map((value) => (
          <Card key={value.title}>
            <div className="text-3xl mb-4">{value.icon}</div>
            <h3 className="font-heading text-xl font-semibold text-text-primary mb-2">
              {value.title}
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              {value.description}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}
