import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import ServicesGrid from "@/components/home/ServicesGrid";

export const metadata: Metadata = generatePageMetadata({
  title: "Hizmetlerimiz",
  description:
    "Dijital pazarlama, SEO, sosyal medya yönetimi, web tasarım, Google & Meta reklamları ve 360° sanal tur hizmetlerimizi keşfedin.",
  path: "/hizmetler",
});

export default function HizmetlerPage() {
  return <ServicesGrid />;
}
