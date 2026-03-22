import type { Metadata } from "next";
import { Instrument_Serif, Barlow } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/global/WhatsAppButton";
import CookieConsent from "@/components/global/CookieConsent";
import BackToTop from "@/components/global/BackToTop";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin", "latin-ext"],
  weight: ["400"],
  style: ["italic"],
  variable: "--font-heading",
  display: "swap",
});

const barlow = Barlow({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CrawAgency | Yerel İşletmenizi Dijitalde Büyütüyoruz",
  description:
    "CrawAgency ile dijital pazarlama, SEO, sosyal medya yönetimi, web tasarım ve Google & Meta reklamlarıyla işletmenizi büyütün.",
  openGraph: {
    title: "CrawAgency | Yerel İşletmenizi Dijitalde Büyütüyoruz",
    description:
      "CrawAgency ile dijital pazarlama, SEO, sosyal medya yönetimi, web tasarım ve Google & Meta reklamlarıyla işletmenizi büyütün.",
    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${instrumentSerif.variable} ${barlow.variable} antialiased`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppButton />
        <CookieConsent />
        <BackToTop />
      </body>
    </html>
  );
}
