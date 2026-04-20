export type ServiceSlug =
  | "meta-reklamlari"
  | "google-reklamlari"
  | "seo"
  | "web-tasarim"
  | "sosyal-medya"
  | "360-sanal-tur";

export interface ServiceFeature {
  title: string;
  description: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface Service {
  slug: ServiceSlug;
  title: string;
  shortTitle: string;
  description: string;
  longDescription: string;
  icon?: string;
  problem: string;
  resultStat: string;
  features: ServiceFeature[];
  benefits: string[];
  targetAudience: string[];
  process: ProcessStep[];
  metaTitle: string;
  metaDescription: string;
}
