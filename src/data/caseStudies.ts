import { CaseStudy } from "@/types/caseStudy";

export const caseStudies: CaseStudy[] = [
  {
    id: 1,
    businessName: "Alaçatı Boutique Hotel",
    businessType: "Butik Otel",
    category: "meta-reklamlari",
    categoryLabel: "Meta Reklamları",
    challenge: "Sezon dışında doluluk oranı %30'un altına düşüyor, reklam bütçesi verimli kullanılamıyordu.",
    solution: "Hedef kitle segmentasyonu ve sezonluk kreatif stratejisi ile Meta reklam kampanyaları optimize edildi.",
    result: { value: "%43", metric: "Rezervasyon Artışı" },
    testimonial: "Sezon dışında bile odalarımız doluyor. CrawAgency ile çalışmak işimizi tamamen değiştirdi. — Ayşe K., Genel Müdür",
  },
  {
    id: 2,
    businessName: "Urla Bağ Evi Restaurant",
    businessType: "Restoran",
    category: "google-reklamlari",
    categoryLabel: "Google Reklamları",
    challenge: "Google aramalarında rakiplerin gerisinde kalıyor, potansiyel müşteriler restoranı bulamıyordu.",
    solution: "Anahtar kelime araştırması ve lokal reklam kampanyaları ile Google'da üst sıralara çıkıldı.",
    result: { value: "%67", metric: "Arama Görünürlüğü Artışı" },
    testimonial: "Artık 'Urla restoran' arayan herkes bizi buluyor. Rezervasyonlarımız katlandı. — Mehmet D., İşletme Sahibi",
  },
  {
    id: 3,
    businessName: "Çeşme Marina Hotel",
    businessType: "Otel",
    category: "360-sanal-tur",
    categoryLabel: "360° Sanal Tur",
    challenge: "Web sitesindeki statik fotoğraflar misafirlere güven vermiyordu, dönüşüm oranı düşüktü.",
    solution: "360° sanal tur ile odalar ve ortak alanlar online gezilebilinir hale getirildi, Google Maps'e entegre edildi.",
    result: { value: "%35", metric: "Site Ziyaretinden Rezervasyona Dönüşüm" },
    testimonial: "Misafirler odayı önceden geziyor ve güvenle rezervasyon yapıyor. Harika bir yatırım. — Deniz A., Pazarlama Müdürü",
  },
  {
    id: 4,
    businessName: "Foça Sahil Kafe",
    businessType: "Kafe & Restaurant",
    category: "sosyal-medya",
    categoryLabel: "Sosyal Medya",
    challenge: "Sosyal medya hesapları düzensiz yönetiliyor, takipçi etkileşimi neredeyse sıfırdı.",
    solution: "Profesyonel içerik planı, düzenli paylaşım takvimi ve topluluk yönetimi ile hesaplar canlandırıldı.",
    result: { value: "340K+", metric: "Aylık Erişim" },
    testimonial: "Sosyal medyamız artık gerçekten çalışıyor. Müşteriler bizi Instagram'dan keşfedip geliyor. — Selin T., İşletme Sahibi",
  },
];

export const caseStudyCategories = [
  { id: "all", label: "Tümü" },
  { id: "meta-reklamlari", label: "Meta Reklamları" },
  { id: "google-reklamlari", label: "Google Reklamları" },
  { id: "seo", label: "SEO" },
  { id: "web-tasarim", label: "Web Tasarım" },
  { id: "sosyal-medya", label: "Sosyal Medya" },
  { id: "360-sanal-tur", label: "360° Sanal Tur" },
];
