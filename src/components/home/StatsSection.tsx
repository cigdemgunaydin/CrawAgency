"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";
import Container from "@/components/ui/Container";

const STATS = [
  { value: 12, suffix: "+", label: "İşletme" },
  { value: 340, suffix: "K+", label: "Erişim" },
  { value: 43, suffix: "%", label: "Dönüşüm Artışı" },
  { value: 2, suffix: "+", label: "Yıl Deneyim" },
];

function AnimatedNumber({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let frame: number;
    const duration = 1500;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [active, target]);

  return (
    <span>
      {count}{suffix}
    </span>
  );
}

export default function StatsSection() {
  const { ref, inView } = useInView(0.3);

  return (
    <section ref={ref} className="bg-black py-20 md:py-28">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-heading italic text-terracotta-400 text-5xl md:text-6xl lg:text-7xl tracking-[-0.02em]">
                <AnimatedNumber target={stat.value} suffix={stat.suffix} active={inView} />
              </div>
              <p className="font-body text-white/50 text-sm md:text-base mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
