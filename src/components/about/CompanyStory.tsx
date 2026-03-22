import { companyStory } from "@/data/company";

export default function CompanyStory() {
  return (
    <section className="mb-16">
      <h2 className="font-heading text-3xl font-bold text-text-primary mb-6 sm:text-4xl">
        {companyStory.title}
      </h2>
      <div className="prose max-w-none">
        {companyStory.content.split("\n\n").map((paragraph, i) => (
          <p key={i} className="text-text-secondary leading-relaxed mb-4">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
