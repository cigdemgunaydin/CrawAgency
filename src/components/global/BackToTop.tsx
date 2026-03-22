"use client";

import { useScrollPosition } from "@/hooks/useScrollPosition";

export default function BackToTop() {
  const scrollY = useScrollPosition();

  if (scrollY < 400) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 left-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-cream-300 text-text-secondary shadow-card transition-all hover:bg-cream-200 hover:shadow-card-hover"
      aria-label="Başa dön"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}
