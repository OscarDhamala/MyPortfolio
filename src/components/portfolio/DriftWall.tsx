import { useEffect, useMemo, useRef, useState, type ComponentType, type PointerEvent } from "react";

export interface DriftWallItem {
  label: string;
  category: string;
  color: string;
  icon: ComponentType<{ size?: number | string; color?: string; className?: string }>;
}

interface DriftWallProps {
  items: DriftWallItem[];
  columns?: number;
  height?: number;
  tileWidth?: number;
  tileHeight?: number;
  gap?: number;
  radius?: number;
  speed?: number;
  direction?: "up" | "down";
  parallax?: number;
  lift?: number;
  dim?: number;
  pauseOnHover?: boolean;
  className?: string;
}

interface ColumnMeta {
  copyHeight: number;
  copies: number;
}

const getColumnCount = (columns: number) => {
  if (typeof window === "undefined") return columns;
  if (window.innerWidth < 560) return Math.min(2, columns);
  if (window.innerWidth < 900) return Math.min(3, columns);
  return columns;
};

const DriftWall = ({
  items,
  columns = 5,
  height = 440,
  tileWidth = 168,
  tileHeight = 124,
  gap = 16,
  radius = 12,
  speed = 28,
  direction = "up",
  parallax = 0.55,
  lift = 24,
  dim = 0.82,
  pauseOnHover = false,
  className = ""
}: DriftWallProps) => {
  const wallRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const trackRefs = useRef<(HTMLDivElement | null)[]>([]);
  const offsetsRef = useRef<number[]>([]);
  const velocitiesRef = useRef<number[]>([]);
  const pointerRef = useRef({ x: 0, y: 0 });
  const pointerDampedRef = useRef({ x: 0, y: 0 });
  const hoveredColumnRef = useRef(-1);
  const wallHoveredRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const [columnCount, setColumnCount] = useState(() => getColumnCount(columns));
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => setColumnCount(getColumnCount(columns));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [columns]);

  const columnItems = useMemo(() => {
    const result: DriftWallItem[][] = Array.from({ length: columnCount }, () => []);
    items.forEach((item, index) => result[index % columnCount].push(item));
    const longestColumn = Math.max(...result.map((column) => column.length), 1);
    return result.map((column) =>
      Array.from({ length: longestColumn }, (_, index) => column[index % column.length])
    );
  }, [columnCount, items]);

  const columnMeta = useMemo<ColumnMeta[]>(() => {
    const unit = tileHeight + gap;
    return columnItems.map((column) => {
      const copyHeight = Math.max(unit, column.length * unit);
      return { copyHeight, copies: Math.max(3, Math.ceil((height * 1.8) / copyHeight) + 1) };
    });
  }, [columnItems, gap, height, tileHeight]);

  useEffect(() => {
    offsetsRef.current = columnMeta.map((meta, index) => meta.copyHeight * ((index * 0.37) % 1));
    velocitiesRef.current = columnMeta.map(() => 0);
  }, [columnMeta]);

  useEffect(() => {
    const animate = (time: number) => {
      if (lastTimeRef.current === null) lastTimeRef.current = time;
      const delta = Math.min(0.05, Math.max(0, time - lastTimeRef.current) / 1000);
      lastTimeRef.current = time;

      const pointerEase = 1 - Math.exp(-delta / 0.12);
      const targetX = pointerRef.current.x * parallax * 7;
      const targetY = -pointerRef.current.y * parallax * 7;
      pointerDampedRef.current.x += (targetX - pointerDampedRef.current.x) * pointerEase;
      pointerDampedRef.current.y += (targetY - pointerDampedRef.current.y) * pointerEase;
      if (planeRef.current) {
        planeRef.current.style.transform = `translate(-50%, -50%) rotateX(${pointerDampedRef.current.y}deg) rotateY(${pointerDampedRef.current.x}deg)`;
      }

      columnMeta.forEach((meta, index) => {
        const paused = pauseOnHover && wallHoveredRef.current;
        const target = paused || hoveredColumnRef.current === index ? 0 : speed * (direction === "up" ? 1 : -1);
        velocitiesRef.current[index] += (target - velocitiesRef.current[index]) * (1 - Math.exp(-delta / 0.28));
        const next = ((offsetsRef.current[index] + velocitiesRef.current[index] * delta) % meta.copyHeight + meta.copyHeight) % meta.copyHeight;
        offsetsRef.current[index] = next;
        const track = trackRefs.current[index];
        if (track) track.style.transform = `translate3d(0, ${-next}px, 0)`;
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTimeRef.current = null;
    };
  }, [columnMeta, direction, parallax, pauseOnHover, speed]);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = wallRef.current?.getBoundingClientRect();
    if (!rect) return;
    pointerRef.current = {
      x: (event.clientX - rect.left) / rect.width - 0.5,
      y: (event.clientY - rect.top) / rect.height - 0.5
    };
  };

  return (
    <div
      ref={wallRef}
      className={`relative w-full overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_8%,black_92%,transparent)] ${className}`}
      style={{ height }}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => {
        wallHoveredRef.current = true;
      }}
      onPointerLeave={() => {
        wallHoveredRef.current = false;
        hoveredColumnRef.current = -1;
        pointerRef.current = { x: 0, y: 0 };
        setActiveId(null);
      }}
      role="region"
      aria-label="Technology toolkit"
    >
      <div
        ref={planeRef}
        className="absolute left-1/2 top-1/2 flex [perspective:1200px] [transform-style:preserve-3d]"
        style={{ gap, width: `calc(${columnCount} * (${tileWidth}px + ${gap}px))` }}
      >
        {columnItems.map((column, columnIndex) => {
          const meta = columnMeta[columnIndex];
          const copies = Array.from({ length: meta.copies });
          return (
            <div key={`column-${columnIndex}`} className="relative flex-none" style={{ width: tileWidth + gap }}>
              <div
                ref={(element) => {
                  trackRefs.current[columnIndex] = element;
                }}
                className="flex flex-col"
                style={{ gap }}
              >
                {copies.flatMap((_, copyIndex) =>
                  column.map((item, itemIndex) => {
                    const id = `${columnIndex}-${copyIndex}-${itemIndex}`;
                    const Icon = item.icon;
                    const isActive = activeId === id;
                    return (
                      <div
                        key={id}
                        tabIndex={0}
                        role="button"
                        aria-label={`${item.label}, ${item.category}`}
                        className={`group relative flex flex-none cursor-pointer flex-col items-center justify-center overflow-hidden border bg-card/45 outline-none backdrop-blur-md transition-[transform,opacity,box-shadow] duration-500 focus-visible:ring-2 focus-visible:ring-accent ${isActive ? "opacity-100 shadow-[0_10px_22px_hsl(20_15%_5%/0.18)]" : ""}`}
                        style={{ width: tileWidth, height: tileHeight, borderRadius: radius, borderColor: `${item.color}66`, opacity: isActive ? 1 : dim, transform: isActive ? `translateZ(${lift}px) scale(1.01)` : undefined }}
                        onMouseEnter={() => {
                          hoveredColumnRef.current = columnIndex;
                          setActiveId(id);
                        }}
                        onFocus={() => {
                          hoveredColumnRef.current = columnIndex;
                          setActiveId(id);
                        }}
                        onBlur={() => {
                          hoveredColumnRef.current = -1;
                          setActiveId(null);
                        }}
                      >
                        <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent" />
                        <Icon size={40} color={item.color} className="relative z-[1] drop-shadow-[0_0_6px_currentColor]" />
                        <span className="relative z-[1] mt-2.5 text-center font-mono text-xs font-semibold text-foreground">
                          {item.label}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DriftWall;