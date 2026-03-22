import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { CaseStudy } from "@/types/caseStudy";

interface CaseStudyCardProps {
  study: CaseStudy;
}

export default function CaseStudyCard({ study }: CaseStudyCardProps) {
  return (
    <Card>
      <Badge variant="terracotta">{study.categoryLabel}</Badge>
      <h3 className="mt-3 font-body text-xl font-semibold text-text-primary">
        {study.businessName}
      </h3>
      <p className="text-sm text-text-tertiary">{study.businessType}</p>

      <div className="mt-4 rounded-lg bg-cream-100 p-4 text-center">
        <div className="font-body text-2xl font-bold text-terracotta-400">
          {study.result.value}
        </div>
        <div className="text-sm text-text-secondary">{study.result.metric}</div>
      </div>

      <div className="mt-4">
        <p className="text-sm text-text-secondary leading-relaxed">
          <span className="font-medium text-text-primary">Zorluk: </span>
          {study.challenge}
        </p>
        <p className="mt-2 text-sm text-text-secondary leading-relaxed">
          <span className="font-medium text-text-primary">Çözüm: </span>
          {study.solution}
        </p>
      </div>

      {study.testimonial && (
        <blockquote className="mt-4 border-l-2 border-terracotta-400/30 pl-4 text-sm italic text-text-tertiary">
          &ldquo;{study.testimonial}&rdquo;
        </blockquote>
      )}
    </Card>
  );
}
