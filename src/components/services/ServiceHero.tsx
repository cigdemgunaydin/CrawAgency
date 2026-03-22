import Container from "@/components/ui/Container";
import Link from "next/link";

interface ServiceHeroProps {
  title: string;
  description: string;
}

export default function ServiceHero({ title, description }: ServiceHeroProps) {
  return (
    <section className="py-12 bg-cream-200">
      <Container>
        <nav className="flex items-center gap-2 text-sm text-text-tertiary mb-6">
          <Link href="/" className="hover:text-terracotta-400 transition-colors">Ana Sayfa</Link>
          <span>/</span>
          <Link href="/hizmetler/meta-reklamlari" className="hover:text-terracotta-400 transition-colors">Hizmetler</Link>
          <span>/</span>
          <span className="text-text-primary">{title}</span>
        </nav>
        <h1 className="font-heading text-3xl font-bold text-text-primary sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="mt-4 text-lg text-text-secondary max-w-2xl">
          {description}
        </p>
      </Container>
    </section>
  );
}
