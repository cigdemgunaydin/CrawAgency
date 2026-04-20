"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { COMPANY } from "@/lib/constants";

// ── AYARLAR ──────────────────────────────────────────────────
const WORDS = [
  "rezervasyonları artırır.",
  "marka bilinirliği yaratır.",
  "sanal turlar tasarlar.",
  "sosyal medyayı yönetir.",
  "drone ile çeker.",
];
const PARTICLE_DENSITY = 2;
const SPREAD = 80;
const ANIM_DURATION = 800;
const FADE_IN_DURATION = 600;
const CYCLE_DELAY = 2400;
const DIRECTION = "right";

type Dir = "right" | "left" | "up" | "down";

function getOffset(dir: Dir, progress: number, spread: number): [number, number] {
  const d = progress * spread;
  switch (dir) {
    case "right": return [d, 0];
    case "left":  return [-d, 0];
    case "up":    return [0, -d];
    case "down":  return [0, d];
    default:      return [d, 0];
  }
}

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

class Particle {
  originX: number; originY: number; color: string; dir: Dir;
  size: number; progress: number; speed: number; offsetAngle: number; drift: number;
  constructor(x: number, y: number, color: string, dir: Dir) {
    this.originX = x; this.originY = y; this.color = color; this.dir = dir;
    this.size = randomBetween(1, 2.8); this.progress = 0;
    this.speed = randomBetween(0.4, 1); this.offsetAngle = randomBetween(-0.6, 0.6);
    this.drift = randomBetween(-20, 20);
  }
  update(dt: number) { this.progress += dt * this.speed; return this.progress < 1; }
  draw(ctx: CanvasRenderingContext2D) {
    const [ox, oy] = getOffset(this.dir, this.progress, SPREAD);
    const x = this.originX + ox + Math.sin(this.progress * Math.PI) * this.drift;
    const y = this.originY + oy + Math.cos(this.progress * Math.PI) * this.drift * 0.5;
    ctx.globalAlpha = 1 - this.progress;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(x, y, this.size * (1 - this.progress * 0.5), 0, Math.PI * 2);
    ctx.fill();
  }
}

interface VaporizeCanvasProps {
  text: string; trigger: boolean; onComplete?: () => void; fontSize: number; color: string;
}

function VaporizeCanvas({ text, trigger, onComplete, fontSize, color }: VaporizeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const startedRef = useRef(false);

  const spawnParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.font = `700 ${fontSize}px var(--font-body), sans-serif`;
    ctx.textBaseline = "middle"; ctx.textAlign = "center";
    const off = document.createElement("canvas");
    off.width = canvas.width; off.height = canvas.height;
    const oc = off.getContext("2d");
    if (!oc) return;
    oc.font = ctx.font; oc.textBaseline = "middle"; oc.textAlign = "center";
    oc.fillStyle = color; oc.fillText(text, canvas.width / 2, canvas.height / 2);
    const d = oc.getImageData(0, 0, canvas.width, canvas.height).data;
    const p: Particle[] = [];
    for (let y = 0; y < canvas.height; y += PARTICLE_DENSITY)
      for (let x = 0; x < canvas.width; x += PARTICLE_DENSITY)
        if (d[(y * canvas.width + x) * 4 + 3] > 128)
          p.push(new Particle(x, y, color, DIRECTION));
    particlesRef.current = p;
  }, [text, fontSize, color]);

  useEffect(() => {
    if (!trigger || startedRef.current) return;
    startedRef.current = true; spawnParticles();
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    let last = performance.now();
    const animate = (now: number) => {
      const dt = Math.min((now - last) / ANIM_DURATION, 0.1); last = now;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current = particlesRef.current.filter((p) => { const a = p.update(dt); if (a) p.draw(ctx); return a; });
      ctx.globalAlpha = 1;
      if (particlesRef.current.length > 0) rafRef.current = requestAnimationFrame(animate);
      else onComplete?.();
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [trigger, spawnParticles, onComplete]);

  useEffect(() => { startedRef.current = false; }, [text]);

  const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
  const w = 900, h = fontSize * 1.6;
  return (
    <canvas ref={canvasRef} width={w * dpr} height={h * dpr}
      style={{ width: w, height: h, position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)", pointerEvents: "none" }} />
  );
}

// ── SHOWCASE STACK (picker-style — horizontal cards, only active grows) ──
type ShowcaseItem = {
  id: string;
  title: string;
  media?: { type: "image" | "video"; src: string };
  gradient: [string, string];
};

const PLACEHOLDER_IMG = "/andrew-ly-KZ0SZ2fEd20-unsplash.jpg";

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: "alacati",
    title: "Alaçatı Boutique Hotel",
    media: { type: "image", src: PLACEHOLDER_IMG },
    gradient: ["#6b4a35", "#1f1510"],
  },
  {
    id: "cesme",
    title: "Çeşme Marina Hotel",
    media: { type: "image", src: PLACEHOLDER_IMG },
    gradient: ["#2b4a5c", "#0f1c25"],
  },
  {
    id: "urla",
    title: "Urla Bağ Evi",
    media: { type: "image", src: PLACEHOLDER_IMG },
    gradient: ["#4a5c38", "#161f10"],
  },
  {
    id: "foca",
    title: "Foça Sahil Kafe",
    media: { type: "image", src: PLACEHOLDER_IMG },
    gradient: ["#5c4a3c", "#201811"],
  },
  {
    id: "drone",
    title: "Drone Çekimi",
    media: { type: "image", src: PLACEHOLDER_IMG },
    gradient: ["#3c2b3c", "#141014"],
  },
];

// Slot → transform lookup. Keys: -2, -1, 0 (active), 1, 2. Others hidden.
// `z` pushes the active card forward in 3D space so it always sits on top of neighbours.
const SLOT_POSE: Record<number, { y: number; scale: number; opacity: number; rotateX: number; z: number }> = {
  "-2": { y: -225, scale: 0.5,  opacity: 0.3,  rotateX: 30,  z: -160 },
  "-1": { y: -130, scale: 0.72, opacity: 0.7,  rotateX: 16,  z: -80 },
  "0":  { y: 0,    scale: 1,    opacity: 1,    rotateX: 0,   z: 80 },
  "1":  { y: 130,  scale: 0.72, opacity: 0.7,  rotateX: -16, z: -80 },
  "2":  { y: 225,  scale: 0.5,  opacity: 0.3,  rotateX: -30, z: -160 },
};

function ShowcaseStack() {
  const [index, setIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const wheelLockRef = useRef(false);
  const wheelTimeoutRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const N = SHOWCASE_ITEMS.length;

  const go = useCallback((dir: 1 | -1) => {
    setIndex((i) => (i + dir + N) % N);
  }, [N]);

  // Wheel: one flick = one card, throttled
  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (wheelLockRef.current) return;
    if (Math.abs(e.deltaY) < 12) return;
    wheelLockRef.current = true;
    go(e.deltaY > 0 ? 1 : -1);
    if (wheelTimeoutRef.current) window.clearTimeout(wheelTimeoutRef.current);
    wheelTimeoutRef.current = window.setTimeout(() => {
      wheelLockRef.current = false;
      wheelTimeoutRef.current = null;
    }, 520);
  }, [go]);

  useEffect(() => {
    return () => {
      if (wheelTimeoutRef.current) window.clearTimeout(wheelTimeoutRef.current);
    };
  }, []);

  // Keep the page from scrolling while the pointer is over the stack
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const stopScroll = (e: WheelEvent) => { if (hovering) e.preventDefault(); };
    el.addEventListener("wheel", stopScroll, { passive: false });
    return () => el.removeEventListener("wheel", stopScroll);
  }, [hovering]);

  // Touch swipe
  const touchStartY = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => { touchStartY.current = e.touches[0].clientY; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current == null) return;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dy) > 36) go(dy < 0 ? 1 : -1);
    touchStartY.current = null;
  };

  // Auto-cycle while idle
  useEffect(() => {
    if (hovering) return;
    const t = window.setInterval(() => {
      setIndex((i) => (i + 1) % N);
    }, 4500);
    return () => window.clearInterval(t);
  }, [hovering, N]);

  const half = Math.floor(N / 2);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[480px] mx-auto h-[500px] sm:h-[540px] lg:h-[580px] select-none"
      style={{ perspective: 1400 }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ambient glow behind the active card */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 45% at 50% 50%, rgba(223,168,117,0.22) 0%, transparent 70%)",
        }}
      />

      {/* cards */}
      <div className="relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>
        {SHOWCASE_ITEMS.map((item, i) => {
          // Signed slot: 0 = active, negative = above, positive = below
          let slot = i - index;
          if (slot > half) slot -= N;
          if (slot < -half) slot += N;

          const abs = Math.abs(slot);
          const isActive = slot === 0;
          const pose = SLOT_POSE[slot] ?? {
            y: slot > 0 ? 340 : -340,
            scale: 0.3,
            opacity: 0,
            rotateX: slot > 0 ? -42 : 42,
            z: -300,
          };

          return (
            <motion.div
              key={item.id}
              className="absolute inset-0 flex items-center justify-center"
              style={{
                zIndex: 10 - abs,
                pointerEvents: isActive ? "auto" : "none",
                transformStyle: "preserve-3d",
              }}
              animate={pose}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 170, damping: 24, mass: 0.8 }
              }
            >
              <ShowcaseCard item={item} active={isActive} />
            </motion.div>
          );
        })}
      </div>

      {/* right rail: arrows + dots */}
      <div className="absolute -right-2 sm:-right-3 lg:-right-5 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2.5 z-30">
        <button
          aria-label="Önceki iş"
          onClick={() => go(-1)}
          className="w-7 h-7 rounded-full bg-white/5 border border-white/10 text-white/55 hover:text-white hover:bg-white/10 flex items-center justify-center transition"
        >
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <path d="M3 7.5L6 4.5L9 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex flex-col items-center gap-1.5 py-1">
          {SHOWCASE_ITEMS.map((item, i) => (
            <button
              key={item.id}
              type="button"
              aria-label={`${i + 1}. iş`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => setIndex(i)}
              className={
                i === index
                  ? "w-1 h-5 rounded-full bg-terracotta-400"
                  : "w-1 h-1.5 rounded-full bg-white/25 hover:bg-white/45 transition-colors"
              }
            />
          ))}
        </div>
        <button
          aria-label="Sonraki iş"
          onClick={() => go(1)}
          className="w-7 h-7 rounded-full bg-white/5 border border-white/10 text-white/55 hover:text-white hover:bg-white/10 flex items-center justify-center transition"
        >
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

    </div>
  );
}

function ShowcaseCard({ item, active }: { item: ShowcaseItem; active: boolean }) {
  return (
    <div
      className="relative w-[88%] max-w-[400px] aspect-[16/9] rounded-2xl overflow-hidden border border-white/[0.09] shadow-[0_25px_55px_-20px_rgba(0,0,0,0.85)]"
      style={{ backgroundColor: item.gradient[1] }}
    >
      {/* gradient fallback (always underneath the media) */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `linear-gradient(145deg, ${item.gradient[0]} 0%, ${item.gradient[1]} 100%)`,
        }}
      />

      {/* media */}
      {item.media?.type === "image" && (
        <Image
          src={item.media.src}
          alt={item.title}
          fill
          sizes="(min-width: 1024px) 400px, 80vw"
          className="object-cover"
          priority={active}
        />
      )}
      {item.media?.type === "video" && (
        <video
          key={item.media.src}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay={active}
          muted
          loop
          playsInline
          preload={active ? "auto" : "none"}
        >
          <source src={item.media.src} type="video/mp4" />
        </video>
      )}

      {/* decorative pattern for media-less cards */}
      {!item.media && (
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, rgba(255,255,255,0.14) 0 1px, transparent 1px 14px)",
          }}
        />
      )}

      {/* title — top overlay */}
      <div className="absolute inset-x-0 top-0 px-4 py-3 bg-gradient-to-b from-black/75 via-black/35 to-transparent">
        <h3 className="font-heading italic text-white text-base sm:text-lg leading-tight tracking-[-0.01em] truncate">
          {item.title}
        </h3>
      </div>
    </div>
  );
}

// ── ANA HERO ─────────────────────────────────────────────────
export default function Hero() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"visible" | "vaporizing" | "fading-in">("visible");
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (phase !== "visible") return;
    const t = setTimeout(() => setPhase("vaporizing"), CYCLE_DELAY);
    return () => clearTimeout(t);
  }, [phase, index]);

  useEffect(() => {
    if (phase !== "fading-in") return;
    const t = setTimeout(() => setPhase("visible"), FADE_IN_DURATION);
    return () => clearTimeout(t);
  }, [phase]);

  const handleVaporizeComplete = useCallback(() => {
    setIndex((i) => (i + 1) % WORDS.length);
    setPhase("fading-in");
  }, []);

  const currentWord = WORDS[index];
  const fontSize = 32;
  const accent = "#dfa875";

  return (
    <section className="relative w-full min-h-screen bg-black overflow-hidden">
      {/* ── Background glows ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute -bottom-20 -left-20 w-[450px] h-[450px]"
          style={{ background: "radial-gradient(circle, rgba(223,168,117,0.09) 0%, transparent 70%)" }}
        />
        <div
          className="absolute top-[10%] right-[5%] w-[350px] h-[350px]"
          style={{ background: "radial-gradient(circle, rgba(223,168,117,0.05) 0%, transparent 70%)" }}
        />
        <div
          className="absolute top-[55%] left-[40%] w-[300px] h-[300px]"
          style={{ background: "radial-gradient(circle, rgba(223,168,117,0.04) 0%, transparent 65%)" }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 min-h-screen lg:h-screen flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-0">

        {/* Sol: Yazilar & CTA */}
        <div className="flex flex-col items-center lg:items-start justify-center lg:w-1/2 relative z-[1] pt-24 lg:pt-0">
          {/* Baslik */}
          <h1
            className="font-heading italic text-white leading-[0.9] tracking-[-0.02em] text-center lg:text-left"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            İzmir&apos;in Butik<br />Otelleri İçin<br />Dijital Strateji
          </h1>

          {/* Servis taglari */}
          <p
            className="font-body text-white/40 text-sm md:text-base tracking-wide mt-4 text-center lg:text-left"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(16px)",
              transition: "all 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          >
            3D Sanal Tur &middot; Sosyal Medya &middot; Web Tasarım &middot; Google & Meta Reklamları
          </p>

          {/* Vaporize donen kelime */}
          <div
            style={{
              position: "relative", width: "100%", maxWidth: 500,
              height: fontSize * 1.6, display: "flex", alignItems: "center",
              justifyContent: "center", margin: "16px 0", zIndex: 1,
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.15s",
            }}
          >
            <div style={{
              position: "absolute", inset: "-20px -40px", borderRadius: "50%",
              background: `radial-gradient(ellipse at center, rgba(223,168,117,0.18) 0%, transparent 70%)`,
              pointerEvents: "none",
            }} />

            <span key={currentWord}
              aria-live="polite"
              aria-atomic="true"
              style={{
                fontSize: `clamp(22px, 3.5vw, ${fontSize}px)`, fontWeight: 700,
                fontFamily: "var(--font-body), sans-serif",
                color: phase === "vaporizing" ? "transparent" : accent,
                opacity: phase === "fading-in" ? 0 : 1,
                transition: phase === "fading-in" ? `opacity ${FADE_IN_DURATION}ms ease-out`
                  : phase === "vaporizing" ? "color 0.15s ease-out" : "none",
                animation: phase === "fading-in" ? `fadeWordIn ${FADE_IN_DURATION}ms ease-out forwards` : "none",
                position: "relative", zIndex: 1,
              }}>
              {currentWord}
            </span>

            <VaporizeCanvas text={currentWord} trigger={phase === "vaporizing"}
              onComplete={handleVaporizeComplete} fontSize={fontSize} color={accent} />
          </div>

          {/* Aciklama */}
          <p
            className="font-body font-light text-white/60 text-lg md:text-xl max-w-[480px] mt-6 text-center lg:text-left"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(16px)",
              transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.3s",
            }}
          >
            Stratejik dijital pazarlama ve yaratıcı çözümlerle
            otelinizi bir sonraki seviyeye taşıyoruz.
          </p>

          {/* CTA */}
          <div
            className="flex flex-col sm:flex-row items-center lg:items-start gap-4 mt-10"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(16px)",
              transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.45s",
            }}
          >
            <Button href="/iletisim" size="lg" className="font-body font-medium">
              Ücretsiz Danışmanlık Alın
              <svg className="ml-2 w-4 h-4 -mt-0.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 15L15 1M15 1H5M15 1V11" />
              </svg>
            </Button>
            <a
              href={`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent("Merhaba, otelimiz için bilgi almak istiyoruz.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/10 text-white text-base font-medium hover:bg-white/5 transition-colors font-body"
            >
              <svg className="w-5 h-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp ile Yaz
            </a>
          </div>

          {/* Sosyal kanit */}
          <div
            className="flex items-center justify-center lg:justify-start gap-3 mt-5"
            style={{
              opacity: mounted ? 1 : 0,
              transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.55s",
            }}
          >
            <div className="flex -space-x-2">
              {["AK", "MB", "SE", "YD"].map((initials) => (
                <div
                  key={initials}
                  className="w-8 h-8 rounded-full bg-white/10 border-2 border-[#0d0c0b] flex items-center justify-center text-[10px] font-medium text-white/70"
                >
                  {initials}
                </div>
              ))}
            </div>
            <div>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 text-terracotta-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-white/70 text-xs mt-0.5 font-body">
                <span className="text-white font-semibold">12+ otel</span> bizimle büyüdü
              </p>
            </div>
          </div>

          {/* Mobil stats grid */}
          <div
            className="grid grid-cols-3 gap-4 mt-10 lg:hidden"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(16px)",
              transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.6s",
            }}
          >
            {[
              { value: "12+", label: "Otel" },
              { value: "340K", label: "Erişim" },
              { value: "%43", label: "Dönüşüm" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-heading italic text-terracotta-400 text-2xl sm:text-3xl tracking-[-0.02em]">
                  {stat.value}
                </div>
                <div className="font-body text-white/50 text-xs mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Sag: One Cikan Isler Stack */}
        <div className="w-full lg:w-1/2 relative z-[1] mt-10 lg:mt-0 pb-8 lg:pb-0">
          <ShowcaseStack />
        </div>

      </div>

      <style>{`
        @keyframes fadeWordIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
