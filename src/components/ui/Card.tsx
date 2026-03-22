import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-card bg-white p-6 shadow-card",
        hover && "transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1",
        className
      )}
    >
      {children}
    </div>
  );
}
