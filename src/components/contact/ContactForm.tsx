"use client";

import { useState, FormEvent } from "react";
import { services } from "@/data/services";

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Ad Soyad gereklidir.";
    if (!formData.email.trim()) {
      newErrors.email = "E-posta gereklidir.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Geçerli bir e-posta adresi girin.";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Telefon numarası gereklidir.";
    }
    if (!formData.message.trim()) newErrors.message = "Mesaj gereklidir.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-card bg-sage-400/10 p-8 text-center">
        <div className="text-4xl mb-4">✓</div>
        <h3 className="font-body text-xl font-semibold text-text-primary">
          Mesajınız Alındı!
        </h3>
        <p className="mt-2 text-text-secondary">
          En kısa sürede sizinle iletişime geçeceğiz.
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
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full rounded-lg border border-cream-300 bg-white px-4 py-2.5 text-text-primary placeholder:text-text-tertiary focus:border-terracotta-400 focus:outline-none focus:ring-1 focus:ring-terracotta-400"
          placeholder="Adınız Soyadınız"
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-1">
          E-posta *
        </label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full rounded-lg border border-cream-300 bg-white px-4 py-2.5 text-text-primary placeholder:text-text-tertiary focus:border-terracotta-400 focus:outline-none focus:ring-1 focus:ring-terracotta-400"
          placeholder="ornek@email.com"
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-text-primary mb-1">
          Telefon *
        </label>
        <input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full rounded-lg border border-cream-300 bg-white px-4 py-2.5 text-text-primary placeholder:text-text-tertiary focus:border-terracotta-400 focus:outline-none focus:ring-1 focus:ring-terracotta-400"
          placeholder="0532 123 45 67"
        />
        {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
      </div>

      <div>
        <label htmlFor="service" className="block text-sm font-medium text-text-primary mb-1">
          İlgilendiğiniz Hizmet
        </label>
        <select
          id="service"
          value={formData.service}
          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
          className="w-full rounded-lg border border-cream-300 bg-white px-4 py-2.5 text-text-primary focus:border-terracotta-400 focus:outline-none focus:ring-1 focus:ring-terracotta-400"
        >
          <option value="">Seçiniz</option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-1">
          Mesajınız *
        </label>
        <textarea
          id="message"
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full rounded-lg border border-cream-300 bg-white px-4 py-2.5 text-text-primary placeholder:text-text-tertiary focus:border-terracotta-400 focus:outline-none focus:ring-1 focus:ring-terracotta-400 resize-none"
          placeholder="Projeniz hakkında bize bilgi verin..."
        />
        {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-terracotta-400 px-6 py-3 text-base font-medium text-white hover:bg-terracotta-500 transition-colors"
      >
        Mesaj Gönder
      </button>
    </form>
  );
}
