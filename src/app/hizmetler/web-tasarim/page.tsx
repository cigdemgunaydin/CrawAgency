import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { getServiceBySlug } from "@/data/services";
import ServicePageContent from "@/components/services/ServicePageContent";

const service = getServiceBySlug("web-tasarim")!;

export const metadata: Metadata = generatePageMetadata({
  title: service.metaTitle,
  description: service.metaDescription,
  path: "/hizmetler/web-tasarim",
});

export default function WebTasarimPage() {
  return <ServicePageContent service={service} />;
}
