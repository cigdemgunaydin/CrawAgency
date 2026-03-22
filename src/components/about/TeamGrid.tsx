import { teamMembers } from "@/data/team";
import TeamMemberCard from "./TeamMemberCard";

export default function TeamGrid() {
  return (
    <section className="mb-16">
      <h2 className="font-heading text-3xl font-bold text-text-primary mb-8 sm:text-4xl">
        Ekibimiz
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member) => (
          <TeamMemberCard key={member.name} member={member} />
        ))}
      </div>
    </section>
  );
}
