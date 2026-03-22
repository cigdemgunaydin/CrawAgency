export interface ServiceFeature {
  title: string;
  description: string;
}

export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  longDescription: string;
  icon?: string;
  features: ServiceFeature[];
  benefits: string[];
  targetAudience: string[];
  process: { step: string; title: string; description: string }[];
  metaTitle: string;
  metaDescription: string;
}
