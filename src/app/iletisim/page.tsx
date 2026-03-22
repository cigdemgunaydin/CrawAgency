import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactForm from "@/components/contact/ContactForm";
import ContactSidebar from "@/components/contact/ContactSidebar";

export const metadata: Metadata = generatePageMetadata({
  title: "İletişim",
  description:
    "CrawAgency ile iletişime geçin. Ücretsiz danışmanlık görüşmesi için formu doldurun veya WhatsApp üzerinden bize yazın.",
  path: "/iletisim",
});

export default function IletisimPage() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          title="İletişim"
          subtitle="Projeniz hakkında konuşalım. Ücretsiz danışmanlık görüşmesi için bize ulaşın."
        />
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_380px]">
          <ContactForm />
          <ContactSidebar />
        </div>
      </Container>
    </section>
  );
}
