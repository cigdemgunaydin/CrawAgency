import type { Metadata } from "next";
import Script from "next/script";
import { Instrument_Serif, Barlow } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/global/WhatsAppButton";
import CookieConsent from "@/components/global/CookieConsent";
import BackToTop from "@/components/global/BackToTop";
import { COMPANY } from "@/lib/constants";

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

const defaultTitle = `${COMPANY.name} | ${COMPANY.tagline}`;
const defaultDescription = `${COMPANY.name} ile dijital pazarlama, SEO, sosyal medya yönetimi, web tasarım ve Google & Meta reklamlarıyla işletmenizi büyütün.`;

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY.website),
  title: {
    default: defaultTitle,
    template: `%s | ${COMPANY.name}`,
  },
  description: defaultDescription,
  applicationName: COMPANY.name,
  authors: [{ name: COMPANY.name, url: COMPANY.website }],
  creator: COMPANY.name,
  publisher: COMPANY.name,
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: COMPANY.website,
    siteName: COMPANY.name,
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
  },
  alternates: {
    canonical: "/",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: COMPANY.name,
  url: COMPANY.website,
  logo: `${COMPANY.website}/favicon.ico`,
  description: defaultDescription,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: COMPANY.phone,
    email: COMPANY.email,
    contactType: "customer service",
    areaServed: "TR",
    availableLanguage: ["Turkish"],
  },
  sameAs: [
    COMPANY.socials.instagram,
    COMPANY.socials.facebook,
    COMPANY.socials.linkedin,
    COMPANY.socials.twitter,
  ],
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
        <Script
          id="jsonld-organization"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
