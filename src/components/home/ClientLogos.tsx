import Container from "@/components/ui/Container";

const CLIENTS = [
  "Alaçatı Boutique Hotel",
  "Urla Bağ Evi",
  "Çeşme Marina Restaurant",
  "Foça Sahil Otel",
  "Seferihisar Termal",
  "Alaçatı Stone House",
];

export default function ClientLogos() {
  return (
    <section className="bg-black py-10 border-t border-white/[0.04]">
      <Container>
        <p className="text-center text-white/30 text-xs tracking-[0.2em] uppercase font-body mb-8">
          Güvendikleri İçin Teşekkürler
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          {CLIENTS.map((name) => (
            <span
              key={name}
              className="font-heading italic text-white/[0.12] text-xl md:text-2xl select-none"
            >
              {name}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
