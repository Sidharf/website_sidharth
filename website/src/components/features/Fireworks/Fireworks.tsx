'use client';

import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  trail: { x: number; y: number; alpha: number }[];
  gravity: number;
  drag: number;
  sparkle: number;
}

interface Burst {
  x: number;
  y: number;
  particles: Particle[];
  age: number;
}

const COLORS = [
  '#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF',
  '#FF8A65', '#B19EEF', '#5227FF', '#FF4081',
  '#FFAB40', '#69F0AE', '#40C4FF', '#E040FB',
];

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function pickColor(): string {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
    : { r: 255, g: 255, b: 255 };
}

function createBurst(canvasWidth: number): Burst {
  const x = randomBetween(canvasWidth * 0.1, canvasWidth * 0.9);
  const y = randomBetween(-20, 0);
  const color = pickColor();
  const particleCount = Math.floor(randomBetween(30, 60));
  const particles: Particle[] = [];

  for (let i = 0; i < particleCount; i++) {
    const angle = randomBetween(0, Math.PI * 2);
    const speed = randomBetween(1, 6);
    const maxLife = randomBetween(60, 140);
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed + randomBetween(1, 3),
      life: maxLife,
      maxLife,
      size: randomBetween(1.5, 3.5),
      color,
      trail: [],
      gravity: randomBetween(0.03, 0.08),
      drag: randomBetween(0.97, 0.99),
      sparkle: Math.random(),
    });
  }

  return { x, y, particles, age: 0 };
}

function getNextTriggerDelay(): number {
  const now = new Date();
  const est = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  const minutes = est.getMinutes();
  const seconds = est.getSeconds();
  const ms = est.getMilliseconds();

  const currentMs = minutes * 60_000 + seconds * 1_000 + ms;
  const halfHourMs = 30 * 60_000;
  const msUntilNext = halfHourMs - (currentMs % halfHourMs);

  return msUntilNext;
}

const SHOW_DURATION = 8_000;
const BURST_INTERVAL = 350;

interface FireworksProps {
  intervalMinutes?: number;
}

export default function Fireworks({ intervalMinutes = 30 }: FireworksProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const burstsRef = useRef<Burst[]>([]);
  const animFrameRef = useRef<number>(0);
  const activeRef = useRef(false);
  const showTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const burstTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const scheduleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startShow = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || activeRef.current) return;

    activeRef.current = true;
    burstsRef.current = [];
    canvas.style.opacity = '1';

    const addBurst = () => {
      if (!canvasRef.current) return;
      burstsRef.current.push(createBurst(canvasRef.current.width));
    };

    addBurst();
    burstTimerRef.current = setInterval(addBurst, BURST_INTERVAL);

    showTimerRef.current = setTimeout(() => {
      if (burstTimerRef.current) clearInterval(burstTimerRef.current);
    }, SHOW_DURATION);
  }, []);

  const scheduleNext = useCallback(() => {
    const delay = intervalMinutes === 30 ? getNextTriggerDelay() : intervalMinutes * 60_000;
    scheduleTimerRef.current = setTimeout(() => {
      startShow();
      scheduleNext();
    }, delay);
  }, [intervalMinutes, startShow]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      if (!activeRef.current) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let allDead = true;

      for (const burst of burstsRef.current) {
        burst.age++;

        for (const p of burst.particles) {
          if (p.life <= 0) continue;
          allDead = false;

          p.trail.push({ x: p.x, y: p.y, alpha: p.life / p.maxLife });
          if (p.trail.length > 6) p.trail.shift();

          p.vy += p.gravity;
          p.vx *= p.drag;
          p.vy *= p.drag;
          p.x += p.vx;
          p.y += p.vy;
          p.life--;
          p.sparkle = Math.random();

          const alpha = p.life / p.maxLife;
          const rgb = hexToRgb(p.color);

          for (let t = 0; t < p.trail.length; t++) {
            const tp = p.trail[t];
            const trailAlpha = tp.alpha * (t / p.trail.length) * 0.4;
            ctx.beginPath();
            ctx.arc(tp.x, tp.y, p.size * 0.6, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${trailAlpha})`;
            ctx.fill();
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * (0.5 + p.sparkle * 0.5), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`;
          ctx.fill();

          if (p.sparkle > 0.9 && alpha > 0.3) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,255,255,${alpha * 0.3})`;
            ctx.fill();
          }
        }
      }

      if (allDead && burstsRef.current.length > 0 && !burstTimerRef.current) {
        activeRef.current = false;
        burstsRef.current = [];
        if (canvas) canvas.style.opacity = '0';
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);

    startShow();
    scheduleNext();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      if (showTimerRef.current) clearTimeout(showTimerRef.current);
      if (burstTimerRef.current) clearInterval(burstTimerRef.current);
      if (scheduleTimerRef.current) clearTimeout(scheduleTimerRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [startShow, scheduleNext]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'none',
        opacity: 0,
        transition: 'opacity 0.5s ease-out',
      }}
    />
  );
}
