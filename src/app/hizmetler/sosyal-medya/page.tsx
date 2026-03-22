import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { getServiceBySlug } from "@/data/services";
import ServicePageContent from "@/components/services/ServicePageContent";

const service = getServiceBySlug("sosyal-medya")!;

export const metadata: Metadata = generatePageMetadata({
  title: service.metaTitle,
  description: service.metaDescription,
  path: "/hizmetler/sosyal-medya",
});

export default function SosyalMedyaPage() {
  return <ServicePageContent service={service} />;
}
