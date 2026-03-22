export interface PricingFeature {
  text: string;
  included: boolean;
}

export interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: PricingFeature[];
  popular?: boolean;
  cta: string;
}

export interface PricingCategory {
  id: string;
  name: string;
  tiers: PricingTier[];
}
