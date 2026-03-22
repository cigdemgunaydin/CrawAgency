import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="py-32">
      <Container>
        <div className="text-center">
          <div className="font-heading text-8xl font-bold text-terracotta-400/20">404</div>
          <h1 className="mt-4 font-heading text-3xl font-bold text-text-primary sm:text-4xl">
            Sayfa Bulunamadı
          </h1>
          <p className="mt-4 text-text-secondary max-w-md mx-auto">
            Aradığınız sayfa mevcut değil veya taşınmış olabilir. Ana sayfaya dönerek devam edebilirsiniz.
          </p>
          <div className="mt-8">
            <Button href="/">Ana Sayfaya Dön</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
