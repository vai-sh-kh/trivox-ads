"use client";

import { useRef, useEffect, useCallback } from "react";

const COLORS = ["#7A00FF", "#A140F0", "#40A0F0", "#C71585", "#E0115F"];

const PARTICLE_COUNT = 340;
const SIZE_MIN = 1.6;
const SIZE_MAX = 4.2;
const OPACITY_MIN = 0.14;
const OPACITY_MAX = 0.52;

const DEFAULT_CHASE_SPEED = 0.04;
const DEFAULT_PULL_STRENGTH = 0.022;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
  phase: number;
  orbitRadius: number;
  orbitPhase: number;
}

function createParticles(width: number, height: number): Particle[] {
  const particles: Particle[] = [];
  const cx = width * 0.5;
  const cy = height * 0.5;

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const angle = Math.random() * Math.PI * 2;
    const spread = 45 + Math.random() * 130;
    const x = cx + Math.cos(angle) * spread + (Math.random() - 0.5) * 60;
    const y = cy + Math.sin(angle) * spread + (Math.random() - 0.5) * 60;

    particles.push({
      x,
      y,
      vx: 0,
      vy: 0,
      size: SIZE_MIN + Math.random() * (SIZE_MAX - SIZE_MIN),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      opacity: OPACITY_MIN + Math.random() * (OPACITY_MAX - OPACITY_MIN),
      phase: Math.random() * Math.PI * 2,
      orbitRadius: 6 + Math.random() * 22,
      orbitPhase: Math.random() * Math.PI * 2,
    });
  }
  return particles;
}

export function ParticleBackground({
  className,
  cursor,
  chaseSpeed = DEFAULT_CHASE_SPEED,
  pullStrength = DEFAULT_PULL_STRENGTH,
}: {
  className?: string;
  cursor: { x: number; y: number } | null;
  chaseSpeed?: number;
  pullStrength?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const chaseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const timeRef = useRef(0);
  const cursorRef = useRef(cursor);
  const chaseSpeedRef = useRef(chaseSpeed);
  const pullStrengthRef = useRef(pullStrength);
  cursorRef.current = cursor;
  chaseSpeedRef.current = chaseSpeed;
  pullStrengthRef.current = pullStrength;

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    particlesRef.current = createParticles(w, h);
    chaseRef.current = { x: w * 0.5, y: h * 0.5 };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let running = true;
    const w = () => canvas.getBoundingClientRect().width;
    const h = () => canvas.getBoundingClientRect().height;

    const tick = () => {
      if (!running || !ctx) return;
      const width = w();
      const height = h();
      const t = timeRef.current;
      timeRef.current += 0.016;

      const cur = cursorRef.current;
      const targetX = cur !== null ? cur.x : width * 0.5;
      const targetY = cur !== null ? cur.y : height * 0.5;

      // Cluster center lazily follows the cursor
      const chase = chaseRef.current;
      const speed = chaseSpeedRef.current;
      chase.x += (targetX - chase.x) * speed;
      chase.y += (targetY - chase.y) * speed;

      ctx.clearRect(0, 0, width, height);

      const pullStr = pullStrengthRef.current;
      for (const p of particlesRef.current) {
        const dx = chase.x - p.x;
        const dy = chase.y - p.y;
        const dist = Math.hypot(dx, dy) || 0.01;
        const pull = Math.min(100 / dist, 5) * pullStr;
        p.vx += (dx / dist) * pull;
        p.vy += (dy / dist) * pull;

        const orbit = p.orbitRadius * 0.35;
        p.vx += Math.sin(t * 0.5 + p.orbitPhase) * orbit * 0.01;
        p.vy += Math.cos(t * 0.45 + p.orbitPhase * 1.2) * orbit * 0.01;

        const swirl = 0.35 * Math.sin(t * 0.35 + p.phase);
        p.vx += -p.vy * swirl * 0.012;
        p.vy += p.vx * swirl * 0.012;

        p.vx *= 0.968;
        p.vy *= 0.968;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -40) p.x = width + 40;
        if (p.x > width + 40) p.x = -40;
        if (p.y < -40) p.y = height + 40;
        if (p.y > height + 40) p.y = -40;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha =
          p.opacity * (0.78 + 0.22 * Math.sin(t * 0.3 + p.phase));
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [resize]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}
