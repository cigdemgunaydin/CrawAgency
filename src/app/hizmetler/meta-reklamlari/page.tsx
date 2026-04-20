import { Metadata } from "next";
import { notFound } from "next/navigation";
import { generatePageMetadata } from "@/lib/metadata";
import { getServiceBySlug } from "@/data/services";
import ServicePageContent from "@/components/services/ServicePageContent";

const service = getServiceBySlug("meta-reklamlari");

export const metadata: Metadata = service
  ? generatePageMetadata({
      title: service.metaTitle,
      description: service.metaDescription,
      path: "/hizmetler/meta-reklamlari",
    })
  : {};

export default function MetaReklamlariPage() {
  if (!service) notFound();
  return <ServicePageContent service={service} />;
}
