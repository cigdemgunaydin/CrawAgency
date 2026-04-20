import { Metadata } from "next";
import { notFound } from "next/navigation";
import { generatePageMetadata } from "@/lib/metadata";
import { getServiceBySlug } from "@/data/services";
import ServicePageContent from "@/components/services/ServicePageContent";

const service = getServiceBySlug("360-sanal-tur");

export const metadata: Metadata = service
  ? generatePageMetadata({
      title: service.metaTitle,
      description: service.metaDescription,
      path: "/hizmetler/360-sanal-tur",
    })
  : {};

const faqs = [
  {
    question: "360° sanal tur çekimi ne kadar sürer?",
    answer:
      "Mekan büyüklüğüne göre değişmekle birlikte, ortalama bir işletme için çekim 2-4 saat sürer. Düzenleme ve yayınlama dahil tüm süreç 3-5 iş günü içinde tamamlanır.",
  },
  {
    question: "Sanal tur Google Haritalar'da nasıl görünür?",
    answer:
      "Çektiğimiz 360° sanal turu Google Haritalar üzerindeki işletme profilinize entegre ediyoruz. Böylece kullanıcılar Google'da işletmenizi aradığında sanal turu doğrudan görebilir.",
  },
  {
    question: "Hangi tür işletmeler için uygundur?",
    answer:
      "Restoranlar, oteller, showroomlar, emlak ofisleri, güzellik salonları, spor salonları ve müşterilerinin mekanı önceden görmek isteyeceği her türlü işletme için idealdir.",
  },
  {
    question: "Sanal tur web siteme eklenebilir mi?",
    answer:
      "Evet, sanal turunuzu web sitenize kolayca yerleştirebileceğiniz bir embed kodu sağlıyoruz. Ayrıca sosyal medya paylaşımına uygun formatlar da hazırlıyoruz.",
  },
  {
    question: "Sanal tur güncelleme gerektirir mi?",
    answer:
      "Mekanınızda büyük değişiklikler (tadilat, dekorasyon yenileme vb.) yaptığınızda sanal turunuzu güncellemenizi öneriyoruz. Güncelleme çekimleri için özel fiyatlar sunuyoruz.",
  },
  {
    question: "Fiyatlandırma nasıl belirlenir?",
    answer:
      "Fiyat, mekan büyüklüğü ve çekim noktası sayısına göre belirlenir. Ücretsiz ön görüşme ile mekanınızı değerlendirip size özel teklif hazırlıyoruz.",
  },
];

export default function SanalTurPage() {
  if (!service) notFound();
  return (
    <ServicePageContent service={service}>
      <section className="mt-16 mb-8">
        <h2 className="font-body text-2xl font-bold text-text-primary mb-8 sm:text-3xl">
          Sıkça Sorulan Sorular
        </h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.question} className="rounded-card bg-cream-200 p-6">
              <h3 className="font-body text-lg font-semibold text-text-primary mb-2">
                {faq.question}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>
    </ServicePageContent>
  );
}
