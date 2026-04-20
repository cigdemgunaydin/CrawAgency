import { Metadata } from "next";
import { notFound } from "next/navigation";
import { generatePageMetadata } from "@/lib/metadata";
import { getServiceBySlug } from "@/data/services";
import ServicePageContent from "@/components/services/ServicePageContent";

const service = getServiceBySlug("web-tasarim");

export const metadata: Metadata = service
  ? generatePageMetadata({
      title: service.metaTitle,
      description: service.metaDescription,
      path: "/hizmetler/web-tasarim",
    })
  : {};

export default function WebTasarimPage() {
  if (!service) notFound();
  return <ServicePageContent service={service} />;
}
