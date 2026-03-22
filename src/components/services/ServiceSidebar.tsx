import Link from "next/link";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";

interface ServiceSidebarProps {
  currentSlug: string;
}

export default function ServiceSidebar({ currentSlug }: ServiceSidebarProps) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24">
        <h3 className="font-heading text-lg font-semibold text-text-primary mb-4">
          Tüm Hizmetler
        </h3>
        <nav className="space-y-1">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/hizmetler/${service.slug}`}
              className={cn(
                "flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm transition-colors",
                currentSlug === service.slug
                  ? "bg-terracotta-400/10 text-terracotta-500 font-medium"
                  : "text-text-secondary hover:bg-cream-200 hover:text-text-primary"
              )}
            >
              {service.title}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
