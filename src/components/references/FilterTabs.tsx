"use client";

import { cn } from "@/lib/utils";

interface FilterTabsProps {
  categories: { id: string; label: string }[];
  active: string;
  onChange: (id: string) => void;
}

export default function FilterTabs({ categories, active, onChange }: FilterTabsProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-12">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          className={cn(
            "rounded-full px-5 py-2 text-sm font-medium transition-all",
            active === cat.id
              ? "bg-terracotta-400 text-white"
              : "bg-cream-200 text-text-secondary hover:bg-cream-300"
          )}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
