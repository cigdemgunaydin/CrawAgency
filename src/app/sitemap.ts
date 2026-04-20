import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { COMPANY } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = COMPANY.website;
  const lastModified = new Date();

  const staticRoutes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/hakkimizda", priority: 0.7, changeFrequency: "monthly" },
    { path: "/hizmetler", priority: 0.9, changeFrequency: "monthly" },
    { path: "/fiyatlandirma", priority: 0.8, changeFrequency: "monthly" },
    { path: "/referanslar", priority: 0.7, changeFrequency: "monthly" },
    { path: "/iletisim", priority: 0.6, changeFrequency: "monthly" },
  ];

  const serviceRoutes = services.map((s) => ({
    path: `/hizmetler/${s.slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  }));

  return [...staticRoutes, ...serviceRoutes].map((r) => ({
    url: `${base}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
