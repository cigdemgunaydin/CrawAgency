import type { Metadata } from "next";
import { COMPANY } from "./constants";

interface PageMetaOptions {
  title: string;
  description: string;
  path?: string;
}

export function generatePageMetadata({
  title,
  description,
  path = "",
}: PageMetaOptions): Metadata {
  const fullTitle = `${title} | ${COMPANY.name}`;
  const url = `${COMPANY.website}${path}`;

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: COMPANY.name,
      locale: "tr_TR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}
