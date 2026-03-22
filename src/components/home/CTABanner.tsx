import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function CTABanner() {
  return (
    <section className="py-20 bg-gradient-to-br from-terracotta-400 to-terracotta-500">
      <Container>
        <div className="text-center">
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            İşletmenizi Büyütmeye Hazır Mısınız?
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
            Ücretsiz danışmanlık görüşmesiyle dijital pazarlama stratejinizi birlikte planlayalım.
          </p>
          <div className="mt-8">
            <Button
              href="/iletisim"
              className="!bg-white !text-terracotta-400 hover:!bg-cream-100"
              size="lg"
            >
              Hemen İletişime Geçin
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
