"use client";

import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-cream-300 shadow-navbar p-4">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-text-secondary text-center sm:text-left">
          Bu web sitesi deneyiminizi iyileştirmek için çerezleri kullanmaktadır. Siteyi kullanmaya devam ederek çerez politikamızı kabul etmiş olursunuz.
        </p>
        <button
          onClick={accept}
          className="shrink-0 rounded-full bg-terracotta-400 px-6 py-2 text-sm font-medium text-white hover:bg-terracotta-500 transition-colors"
        >
          Kabul Et
        </button>
      </div>
    </div>
  );
}
