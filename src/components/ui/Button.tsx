import { cn } from "@/lib/utils";
import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
  href?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-terracotta-400 text-white hover:bg-terracotta-500 shadow-sm",
  secondary:
    "bg-sage-400 text-white hover:bg-sage-500 shadow-sm",
  outline:
    "border-2 border-terracotta-400 text-terracotta-400 hover:bg-terracotta-400 hover:text-white",
  ghost:
    "text-text-secondary hover:text-text-primary hover:bg-cream-200",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-2.5 text-base",
  lg: "px-8 py-3 text-lg",
};

export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  type = "button",
  onClick,
  disabled,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-terracotta-400/50",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
