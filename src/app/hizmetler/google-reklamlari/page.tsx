import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { getServiceBySlug } from "@/data/services";
import ServicePageContent from "@/components/services/ServicePageContent";

const service = getServiceBySlug("google-reklamlari")!;

export const metadata: Metadata = generatePageMetadata({
  title: service.metaTitle,
  description: service.metaDescription,
  path: "/hizmetler/google-reklamlari",
});

export default function GoogleReklamlariPage() {
  return <ServicePageContent service={service} />;
}
