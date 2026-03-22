import Link from "next/link";
import Card from "@/components/ui/Card";
import { Service } from "@/types/service";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card>
      <h3 className="font-body text-xl font-semibold text-text-primary mb-2">
        {service.title}
      </h3>
      <p className="text-text-secondary text-sm leading-relaxed mb-4">
        {service.description}
      </p>
      <Link
        href={`/hizmetler/${service.slug}`}
        className="inline-flex items-center text-sm font-medium text-terracotta-400 hover:text-terracotta-500 transition-colors"
      >
        Detaylı Bilgi
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </Link>
    </Card>
  );
}
