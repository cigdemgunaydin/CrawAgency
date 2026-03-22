import Button from "@/components/ui/Button";

interface ServiceCTAProps {
  title?: string;
}

export default function ServiceCTA({ title = "Bu hizmet için teklif alın" }: ServiceCTAProps) {
  return (
    <div className="mt-16 rounded-card bg-cream-200 p-8 sm:p-12 text-center">
      <h3 className="font-body text-2xl font-bold text-text-primary sm:text-3xl">
        {title}
      </h3>
      <p className="mt-3 text-text-secondary max-w-lg mx-auto">
        İşletmenize özel bir teklif hazırlamamız için bizimle iletişime geçin. Ücretsiz danışmanlık görüşmesi sunuyoruz.
      </p>
      <div className="mt-6">
        <Button href="/iletisim" size="lg">
          Ücretsiz Teklif Alın
        </Button>
      </div>
    </div>
  );
}
