import Card from "@/components/ui/Card";
import { TeamMember } from "@/types/team";

interface TeamMemberCardProps {
  member: TeamMember;
}

export default function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <Card>
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-terracotta-400/10 mx-auto mb-4">
        <span className="font-heading text-xl font-bold text-terracotta-400">
          {member.initials}
        </span>
      </div>
      <div className="text-center">
        <h3 className="font-heading text-lg font-semibold text-text-primary">
          {member.name}
        </h3>
        <p className="text-sm text-terracotta-400 font-medium">{member.role}</p>
        <p className="mt-3 text-sm text-text-secondary leading-relaxed">
          {member.bio}
        </p>
      </div>
    </Card>
  );
}
