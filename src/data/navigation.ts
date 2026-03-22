import { NavItem } from "@/types/navigation";

export const navItems: NavItem[] = [
  { label: "Ana Sayfa", href: "/" },
  {
    label: "Hizmetler",
    href: "/hizmetler",
    dropdown: [
      { label: "Meta Reklamları", href: "/hizmetler/meta-reklamlari" },
      { label: "Google Reklamları", href: "/hizmetler/google-reklamlari" },
      { label: "SEO", href: "/hizmetler/seo" },
      { label: "Web Tasarım", href: "/hizmetler/web-tasarim" },
      { label: "Sosyal Medya", href: "/hizmetler/sosyal-medya" },
      { label: "360° Sanal Tur", href: "/hizmetler/360-sanal-tur" },
    ],
  },
  { label: "Referanslar", href: "/referanslar" },
  { label: "İletişim", href: "/iletisim" },
];
