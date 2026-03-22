"use client";

import { useState } from "react";
import { pricingCategories } from "@/data/pricing";
import PricingTierCard from "./PricingTierCard";
import { cn } from "@/lib/utils";

export default function PricingTabs() {
  const [activeTab, setActiveTab] = useState(pricingCategories[0].id);
  const activeCategory = pricingCategories.find((c) => c.id === activeTab)!;

  return (
    <>
      <div className="flex flex-wrap gap-2 justify-center mb-12">
        {pricingCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={cn(
              "rounded-full px-5 py-2 text-sm font-medium transition-all",
              activeTab === cat.id
                ? "bg-terracotta-400 text-white"
                : "bg-cream-200 text-text-secondary hover:bg-cream-300"
            )}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
        {activeCategory.tiers.map((tier) => (
          <PricingTierCard key={tier.name} tier={tier} />
        ))}
      </div>
    </>
  );
}
