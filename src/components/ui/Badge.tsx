import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "terracotta" | "sage";
  className?: string;
}

const variantStyles = {
  default: "bg-cream-300 text-text-secondary",
  terracotta: "bg-terracotta-300/30 text-terracotta-500",
  sage: "bg-sage-300/30 text-sage-500",
};

export default function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-full px-3 py-1 text-xs font-medium",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
