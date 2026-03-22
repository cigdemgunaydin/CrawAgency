export type CaseStudyCategory =
  | "meta-reklamlari"
  | "google-reklamlari"
  | "seo"
  | "web-tasarim"
  | "sosyal-medya"
  | "360-sanal-tur";

export interface CaseStudyResult {
  metric: string;
  value: string;
}

export interface CaseStudy {
  id: number;
  businessName: string;
  businessType: string;
  category: CaseStudyCategory;
  categoryLabel: string;
  challenge: string;
  solution: string;
  result: CaseStudyResult;
  testimonial?: string;
}
