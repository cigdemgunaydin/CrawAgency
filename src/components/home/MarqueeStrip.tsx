const items = [
  "Meta Reklamları",
  "Google Reklamları",
  "SEO",
  "Web Tasarım",
  "Sosyal Medya",
  "360° Sanal Tur",
  "İçerik Üretimi",
  "Marka Stratejisi",
];

export default function MarqueeStrip() {
  const duplicated = [...items, ...items];

  return (
    <section className="bg-cream-200 py-4 overflow-hidden border-y border-cream-300">
      <div className="flex animate-marquee whitespace-nowrap">
        {duplicated.map((item, i) => (
          <span
            key={i}
            className="mx-8 text-sm font-medium uppercase tracking-widest text-text-tertiary"
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
