import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { PricingTier } from "@/types/pricing";
import { cn } from "@/lib/utils";

interface PricingTierCardProps {
  tier: PricingTier;
}

export default function PricingTierCard({ tier }: PricingTierCardProps) {
  return (
    <Card
      className={cn(
        tier.popular && "ring-2 ring-terracotta-400 relative"
      )}
    >
      {tier.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge variant="terracotta">En Popüler</Badge>
        </div>
      )}
      <div className="text-center">
        <h3 className="font-body text-xl font-semibold text-text-primary">
          {tier.name}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">{tier.description}</p>
        <div className="mt-4">
          <span className="font-body text-4xl font-bold text-text-primary">
            ₺{tier.price}
          </span>
          <span className="text-text-tertiary text-sm">/ay</span>
        </div>
      </div>

      <ul className="mt-6 space-y-3">
        {tier.features.map((feature) => (
          <li key={feature.text} className="flex items-start gap-2">
            {feature.included ? (
              <svg className="w-5 h-5 text-sage-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-text-tertiary/40 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            <span className={cn("text-sm", feature.included ? "text-text-secondary" : "text-text-tertiary")}>
              {feature.text}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <Button
          href="/iletisim"
          variant={tier.popular ? "primary" : "outline"}
          className="w-full"
        >
          {tier.cta}
        </Button>
      </div>
    </Card>
  );
}
