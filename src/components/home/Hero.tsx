"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";

// ── AYARLAR ──────────────────────────────────────────────────
const WORDS = [
  "makes web magic.",
  "powers creativity.",
  "launches sites.",
  "also builds sites.",
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

// ── SÜREÇ ADIMLARI ──────────────────────────────────────────
const PROCESS_STEPS = [
  {
    title: "Keşif Görüşmesi",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
  },
  {
    title: "Durum Analizi",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
        <path d="M11 8v6M8 11h6" />
      </svg>
    ),
  },
  {
    title: "Strateji",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
        <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
      </svg>
    ),
  },
  {
    title: "Tasarım & Geliştirme",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="14" y1="4" x2="10" y2="20" />
      </svg>
    ),
  },
  {
    title: "Test & Lansman",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" />
        <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    ),
  },
  {
    title: "Büyüme",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
  },
];

const STEP_CYCLE_DURATION = 3000;

function ProcessAnimation() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % PROCESS_STEPS.length);
    }, STEP_CYCLE_DURATION);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Merkez glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(223,168,117,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Orbital halka */}
      <div className="relative w-[420px] h-[420px] md:w-[500px] md:h-[500px] lg:w-[560px] lg:h-[560px]">
        {/* Halka çizgisi */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 560 560">
          <circle
            cx="280" cy="280" r="240"
            fill="none"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="1"
          />
          <motion.circle
            cx="280" cy="280" r="240"
            fill="none"
            stroke="rgba(223,168,117,0.15)"
            strokeWidth="2"
            strokeDasharray={`${2 * Math.PI * 240}`}
            strokeDashoffset={2 * Math.PI * 240}
            strokeLinecap="round"
            animate={{
              strokeDashoffset: [
                2 * Math.PI * 240,
                2 * Math.PI * 240 * (1 - (activeStep + 1) / PROCESS_STEPS.length),
              ],
            }}
            transition={{ duration: STEP_CYCLE_DURATION / 1000, ease: "easeInOut" }}
            style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
          />
        </svg>

        {/* Adım kartları */}
        {PROCESS_STEPS.map((step, i) => {
          const angle = (i / PROCESS_STEPS.length) * 2 * Math.PI - Math.PI / 2;
          const radius = 240;
          const x = 280 + Math.cos(angle) * radius;
          const y = 280 + Math.sin(angle) * radius;
          const isActive = i === activeStep;
          const isPast = i < activeStep;

          return (
            <motion.div
              key={step.title}
              className="absolute"
              style={{
                left: `${(x / 560) * 100}%`,
                top: `${(y / 560) * 100}%`,
                transform: "translate(-50%, -50%)",
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 1,
                scale: isActive ? 1.1 : 1,
              }}
              transition={{
                opacity: { duration: 0.6, delay: i * 0.15 },
                scale: { duration: 0.4 },
              }}
            >
              {/* Kart */}
              <motion.div
                className="flex items-center gap-3 px-4 py-3 rounded-xl whitespace-nowrap"
                animate={{
                  backgroundColor: isActive
                    ? "rgba(223,168,117,0.12)"
                    : isPast
                    ? "rgba(255,255,255,0.06)"
                    : "rgba(255,255,255,0.03)",
                  borderColor: isActive
                    ? "rgba(223,168,117,0.3)"
                    : "rgba(255,255,255,0.06)",
                }}
                transition={{ duration: 0.5 }}
                style={{
                  border: "1px solid",
                  backdropFilter: "blur(12px)",
                }}
              >
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{
                        background: "radial-gradient(ellipse at center, rgba(223,168,117,0.1) 0%, transparent 70%)",
                        filter: "blur(8px)",
                      }}
                    />
                  )}
                </AnimatePresence>

                <motion.div
                  className="relative flex items-center justify-center w-9 h-9 rounded-lg shrink-0"
                  animate={{
                    backgroundColor: isActive
                      ? "rgba(223,168,117,0.2)"
                      : "rgba(255,255,255,0.05)",
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.div
                    animate={{
                      color: isActive ? "#dfa875" : isPast ? "rgba(223,168,117,0.6)" : "rgba(255,255,255,0.4)",
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    {step.icon}
                  </motion.div>
                </motion.div>

                <motion.span
                  className="text-sm font-medium relative"
                  animate={{
                    color: isActive ? "#dfa875" : isPast ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.35)",
                  }}
                  transition={{ duration: 0.4 }}
                >
                  {step.title}
                </motion.span>
              </motion.div>
            </motion.div>
          );
        })}
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

  const handleVaporizeComplete = useCallback(() => {
    setIndex((i) => (i + 1) % WORDS.length);
    setPhase("fading-in");
    setTimeout(() => setPhase("visible"), FADE_IN_DURATION);
  }, []);

  const currentWord = WORDS[index];
  const fontSize = 32;
  const accent = "#dfa875";

  return (
    <section className="relative w-full min-h-screen bg-black overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-screen flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-0">

        {/* Sol: Yazılar & CTA */}
        <div className="flex flex-col items-start justify-center lg:w-1/2 relative z-[1] pt-24 lg:pt-0">
          {/* Başlık */}
          <h1
            className="font-heading italic text-white leading-[0.9] tracking-[-0.02em]"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            İşletmenizi<br />Dijitalde<br />Öne Çıkarıyoruz
          </h1>

          {/* Servis tagları */}
          <p
            className="font-body text-white/40 text-sm md:text-base tracking-wide mt-4"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(16px)",
              transition: "all 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          >
            3D Sanal Tur &middot; Sosyal Medya &middot; Web Tasarım &middot; Google & Meta Reklamları
          </p>

          {/* Vaporize dönen kelime */}
          <div
            style={{
              position: "relative", width: "100%", maxWidth: 500,
              height: fontSize * 1.6, display: "flex", alignItems: "center",
              justifyContent: "flex-start", margin: "16px 0", zIndex: 1,
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

          {/* Açıklama */}
          <p
            className="font-body font-light text-white/60 text-lg md:text-xl max-w-[480px] mt-6"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(16px)",
              transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.3s",
            }}
          >
            Stratejik dijital pazarlama ve yaratıcı çözümlerle
            işletmenizi bir sonraki seviyeye taşıyoruz.
          </p>

          {/* CTA */}
          <div
            className="flex flex-col gap-3 mt-10"
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
            <span className="font-body text-white/40 text-sm italic">
              İzmir&apos;de 12+ işletme ile çalışıyoruz
            </span>
          </div>
        </div>

        {/* Sağ: Süreç animasyonu */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center relative z-[1]">
          <ProcessAnimation />
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
