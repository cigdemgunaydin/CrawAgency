"use client";

import { useState } from "react";
import Link from "next/link";
import { navItems } from "@/data/navigation";
import Button from "@/components/ui/Button";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-text-primary"
        aria-label="Menüyü aç"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 top-[72px] z-50 bg-cream-100">
          <nav className="flex flex-col p-6 space-y-1">
            {navItems.map((item) => (
              <div key={item.label}>
                {item.dropdown ? (
                  <>
                    <button
                      onClick={() =>
                        setExpandedItem(expandedItem === item.label ? null : item.label)
                      }
                      className="flex items-center justify-between w-full py-3 text-lg font-medium text-text-primary"
                    >
                      {item.label}
                      <svg
                        className={`w-5 h-5 transition-transform ${
                          expandedItem === item.label ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {expandedItem === item.label && (
                      <div className="pl-4 pb-2 space-y-1">
                        {item.dropdown.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 py-2 text-text-secondary hover:text-text-primary"
                          >
                            <span>{sub.label}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block py-3 text-lg font-medium text-text-primary"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-4">
              <Button href="/iletisim" className="w-full">
                Teklif Al
              </Button>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
