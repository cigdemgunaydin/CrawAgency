import Card from "@/components/ui/Card";
import { ServiceFeature } from "@/types/service";

interface ServiceFeatureListProps {
  features: ServiceFeature[];
}

export default function ServiceFeatureList({ features }: ServiceFeatureListProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {features.map((feature) => (
        <Card key={feature.title}>
          <h3 className="font-body text-lg font-semibold text-text-primary mb-2">
            {feature.title}
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed">
            {feature.description}
          </p>
        </Card>
      ))}
    </div>
  );
}
