import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import ServiceHero from "@/components/services/ServiceHero";
import ServiceFeatureList from "./ServiceFeatureList";
import ServiceCTA from "./ServiceCTA";
import { Service } from "@/types/service";

interface ServicePageContentProps {
  service: Service;
  children?: React.ReactNode;
}

export default function ServicePageContent({ service, children }: ServicePageContentProps) {
  return (
    <>
      <ServiceHero
        title={service.title}
        description={service.longDescription}
      />
      <Container className="py-16">
        <div className="max-w-3xl mx-auto">
          {/* What is this service */}
          <section className="mb-16">
            <h2 className="font-body text-2xl font-bold text-text-primary mb-4 sm:text-3xl">
              Bu hizmet nedir?
            </h2>
            <p className="text-text-secondary leading-relaxed">
              {service.longDescription}
            </p>
          </section>

          {/* 3-step process */}
          <section className="mb-16">
            <h2 className="font-body text-2xl font-bold text-text-primary mb-8 sm:text-3xl">
              Nasıl Çalışıyoruz?
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {service.process.map((step) => (
                <Card key={step.step} hover={false}>
                  <div className="font-body text-3xl font-bold text-terracotta-400/30 mb-2">
                    {step.step}
                  </div>
                  <h3 className="font-body text-lg font-semibold text-text-primary mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-text-secondary">{step.description}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* Features */}
          <section className="mb-16">
            <h2 className="font-body text-2xl font-bold text-text-primary mb-8 sm:text-3xl">
              Neler Sunuyoruz?
            </h2>
            <ServiceFeatureList features={service.features} />
          </section>

          {/* Benefits */}
          <section className="mb-16">
            <h2 className="font-body text-2xl font-bold text-text-primary mb-6 sm:text-3xl">
              Avantajlar
            </h2>
            <ul className="space-y-3">
              {service.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-sage-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-text-secondary">{benefit}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Extra content (e.g., FAQ for 360 sanal tur) */}
          {children}

          <ServiceCTA />
        </div>
      </Container>
    </>
  );
}
