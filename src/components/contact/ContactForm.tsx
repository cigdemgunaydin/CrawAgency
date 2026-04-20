"use client";

import { useState, FormEvent } from "react";

interface FormData {
  name: string;
  contact: string;
  message: string;
}

interface FormErrors {
  name?: string;
  contact?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    contact: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Ad Soyad gereklidir.";
    if (!formData.contact.trim()) newErrors.contact = "Telefon veya e-posta gereklidir.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // TODO: Form şu anda hiçbir yere submit etmiyor; yalnızca local state'te başarılı gösterilir.
  // İleride bir backend/service entegrasyonu eklenmeli (ör. WhatsApp redirect, FormSubmit.co, Web3Forms veya e-posta API'si).
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-card bg-sage-400/10 p-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-sage-400/20">
            <svg className="w-5 h-5 text-sage-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="font-body text-xl font-semibold text-text-primary">
            Mesajınız Alındı!
          </h3>
        </div>
        <p className="text-text-secondary">
          24 saat içinde sizi arayacağız. Acil durumlar için WhatsApp&apos;tan ulaşabilirsiniz.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-1">
          Ad Soyad *
        </label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
          className="w-full rounded-lg border border-cream-300 bg-white px-4 py-3 text-text-primary placeholder:text-text-tertiary focus:border-terracotta-400 focus:outline-none focus:ring-1 focus:ring-terracotta-400"
          placeholder="Adınız Soyadınız"
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="contact" className="block text-sm font-medium text-text-primary mb-1">
          Telefon veya E-posta *
        </label>
        <input
          id="contact"
          type="text"
          value={formData.contact}
          onChange={(e) => setFormData((prev) => ({ ...prev, contact: e.target.value }))}
          className="w-full rounded-lg border border-cream-300 bg-white px-4 py-3 text-text-primary placeholder:text-text-tertiary focus:border-terracotta-400 focus:outline-none focus:ring-1 focus:ring-terracotta-400"
          placeholder="0532 123 45 67 veya ornek@email.com"
        />
        {errors.contact && <p className="mt-1 text-sm text-red-500">{errors.contact}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-1">
          Ne hakkında konuşalım?
        </label>
        <textarea
          id="message"
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
          className="w-full rounded-lg border border-cream-300 bg-white px-4 py-3 text-text-primary placeholder:text-text-tertiary focus:border-terracotta-400 focus:outline-none focus:ring-1 focus:ring-terracotta-400 resize-none"
          placeholder="Projeniz veya ihtiyacınız hakkında kısaca bilgi verin... (opsiyonel)"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-terracotta-400 px-6 py-3 text-base font-medium text-white hover:bg-terracotta-500 transition-colors"
      >
        Gönder
      </button>
    </form>
  );
}
