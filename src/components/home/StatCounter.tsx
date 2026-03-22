"use client";

import { useCountUp } from "@/hooks/useCountUp";
import { useInView } from "@/hooks/useInView";

interface StatCounterProps {
  end: number;
  suffix: string;
  prefix?: string;
  label: string;
}

export default function StatCounter({ end, suffix, prefix = "", label }: StatCounterProps) {
  const { ref, inView } = useInView(0.3);
  const count = useCountUp(end, 2000, inView);

  return (
    <div ref={ref} className="text-center">
      <div className="font-heading text-4xl font-bold text-terracotta-400 sm:text-5xl">
        {prefix}{count}{suffix}
      </div>
      <div className="mt-2 text-sm text-text-secondary font-medium">{label}</div>
    </div>
  );
}
