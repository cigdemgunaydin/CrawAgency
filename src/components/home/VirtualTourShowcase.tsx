import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

const features = [
  {
    title: "Google Haritalar Entegrasyonu",
    description:
      "Sanal turunuz doğrudan Google Haritalar'da görünür. İşletmenizi arayan müşteriler, mekanınızı kapınızdan girmeden 360° keşfedebilir.",
  },
  {
    title: "Web Sitenize Yerleştirme",
    description:
      "Sanal turunuzu web sitenize kolayca entegre ediyoruz. Ziyaretçiler sitenizden ayrılmadan mekanınızı gezebilir.",
  },
  {
    title: "Müşteri Güveni & Şeffaflık",
    description:
      "Potansiyel müşteriler mekanınızı önceden görerek güven duyar. Fiziksel ziyaret öncesi karar verme sürecini hızlandırır.",
  },
  {
    title: "Profesyonel 360° Çekim",
    description:
      "Yüksek çözünürlüklü 360° kameralarla profesyonel çekim yapıyoruz. Restoranlar, oteller, showroomlar ve daha fazlası.",
  },
];

export default function VirtualTourShowcase() {
  return (
    <section className="py-20 bg-cream-200">
      <Container>
        <SectionHeading
          title="360° Sanal Tur"
          subtitle="İşletmenizi müşterilerinize kapılarınızdan girmeden gösterin. Google Haritalar entegrasyonuyla görünürlüğünüzü katbekat artırın."
        />

        <div className="max-w-3xl mx-auto">
          <p className="text-text-secondary leading-relaxed mb-8">
            360° sanal tur, işletmenizin iç mekanını interaktif olarak gezdiren dijital bir deneyimdir.
            Müşterileriniz bilgisayar veya telefonlarından mekanınızın her köşesini keşfedebilir,
            atmosferi hissedebilir ve size ulaşmadan önce işletmenizi detaylı olarak tanıyabilir.
            Google Haritalar üzerinden yapılan aramalarda sanal turunuz otomatik olarak görüntülenir
            ve işletmenizin profesyonel imajını güçlendirir.
          </p>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 mb-10">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-card bg-white p-5 shadow-card"
              >
                <h3 className="font-body text-base font-semibold text-text-primary mb-1.5">
                  {f.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-text-secondary mb-5">
              İşletmeniz için profesyonel 360° sanal tur çekimi yaptırmak ister misiniz?
            </p>
            <Button href="/iletisim" size="lg">
              Sanal Tur Teklifi Alın
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
