import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { getServiceBySlug } from "@/data/services";
import ServicePageContent from "@/components/services/ServicePageContent";

const service = getServiceBySlug("seo")!;

export const metadata: Metadata = generatePageMetadata({
  title: service.metaTitle,
  description: service.metaDescription,
  path: "/hizmetler/seo",
});

export default function SEOPage() {
  return <ServicePageContent service={service} />;
}
