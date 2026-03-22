"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
    <section
      className="relative w-full h-[1000px] flex flex-col items-center justify-center bg-black overflow-visible px-6"
    >
      {/* Video arka plan */}
      <video autoPlay muted loop playsInline
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", zIndex: 0, opacity: 0.3 }}>
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4" type="video/mp4" />
      </video>

      {/* Başlık */}
      <h1
        className="font-heading italic text-white text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.8] tracking-[-4px] text-center relative z-[1]"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        İşletmenizi Dijitalde Büyütüyoruz
      </h1>

      {/* Vaporize dönen kelime */}
      <div
        style={{
          position: "relative", width: "100%", maxWidth: 900,
          height: fontSize * 1.6, display: "flex", alignItems: "center",
          justifyContent: "center", margin: "12px auto", zIndex: 1,
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(20px)",
          transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.15s",
        }}
      >
        {/* Glow */}
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
        className="font-body font-light text-white/60 text-lg md:text-xl max-w-[600px] mx-auto text-center relative z-[1] mt-8"
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
        className="flex gap-4 mt-10 flex-wrap justify-center relative z-[1]"
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
        <button
          onClick={() => window.location.href = "/referanslar"}
          className="font-body text-white/60 hover:text-white transition-colors inline-flex items-center gap-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
          Referanslarımız
        </button>
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
