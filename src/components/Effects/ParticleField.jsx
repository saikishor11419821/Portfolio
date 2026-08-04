import { useEffect, useRef } from "react";

/**
 * Ambient floating-dust particle field rendered on a single canvas.
 * Density is automatically reduced on narrow / low-end devices, and the
 * effect is skipped entirely when the user prefers reduced motion.
 */
export default function ParticleField({ density = 70 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf;
    let width, height;
    const isSmall = window.innerWidth < 768;
    const isLowEnd = (navigator.hardwareConcurrency || 8) <= 4;
    const count = Math.round((isSmall || isLowEnd ? density * 0.35 : density) * 1);

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.4 + 0.3,
      vy: Math.random() * 0.15 + 0.03,
      vx: (Math.random() - 0.5) * 0.06,
      hue: Math.random() > 0.7 ? "cyan" : "white",
      a: Math.random() * 0.5 + 0.15,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.y -= p.vy;
        p.x += p.vx;
        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle =
          p.hue === "cyan" ? `rgba(76,243,255,${p.a})` : `rgba(220,230,240,${p.a * 0.6})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-[5] pointer-events-none"
      aria-hidden="true"
    />
  );
}
