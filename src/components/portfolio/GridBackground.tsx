import { useEffect, useRef } from "react";

const SPACING = 44;
const INFLUENCE = 150;
const MAX_OFFSET = 16;
const EASE = 0.12;

interface GridPoint {
  x: number;
  y: number;
  ox: number;
  oy: number;
}

const readCssColor = (variable: string) => getComputedStyle(document.documentElement).getPropertyValue(variable).trim();

const GridBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const schemeQuery = window.matchMedia("(prefers-color-scheme: dark)");

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let points: GridPoint[] = [];
    let bgColor = readCssColor("--background");
    let dotColor = readCssColor("--foreground");
    const mouse = { x: -9999, y: -9999, active: false };
    let raf = 0;

    const buildGrid = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cols = Math.ceil(w / SPACING) + 1;
      const rows = Math.ceil(h / SPACING) + 1;
      points = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          points.push({ x: c * SPACING, y: r * SPACING, ox: 0, oy: 0 });
        }
      }
    };

    const onSchemeChange = () => {
      bgColor = readCssColor("--background");
      dotColor = readCssColor("--foreground");
    };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
    };

    const renderStatic = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.fillStyle = `hsl(${bgColor})`;
      ctx.fillRect(0, 0, w, h);
      for (const p of points) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.1, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${dotColor} / 0.13)`;
        ctx.fill();
      }
    };

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.fillStyle = `hsl(${bgColor})`;
      ctx.fillRect(0, 0, w, h);

      for (const p of points) {
        let tx = 0;
        let ty = 0;
        let near = false;

        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < INFLUENCE) {
            near = true;
            const strength = (1 - dist / INFLUENCE) * MAX_OFFSET;
            const angle = Math.atan2(dy, dx);
            tx = Math.cos(angle) * strength;
            ty = Math.sin(angle) * strength;
          }
        }

        p.ox += (tx - p.ox) * EASE;
        p.oy += (ty - p.oy) * EASE;

        ctx.beginPath();
        ctx.arc(p.x + p.ox, p.y + p.oy, near ? 1.25 : 1.1, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${dotColor} / ${near ? 0.14 : 0.13})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    buildGrid();
    window.addEventListener("resize", buildGrid);
    schemeQuery.addEventListener("change", onSchemeChange);

    if (reduceMotion) {
      renderStatic();
    } else {
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseleave", onLeave);
      raf = requestAnimationFrame(draw);
    }

    return () => {
      window.removeEventListener("resize", buildGrid);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      schemeQuery.removeEventListener("change", onSchemeChange);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="fixed inset-0 -z-10 pointer-events-none" />;
};

export default GridBackground;
