import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { gsap } from "gsap";

export interface AccordionGalleryItem {
  image: string;
  label?: string;
  alt?: string;
}

interface AccordionGalleryProps {
  items: AccordionGalleryItem[];
  defaultIndex?: number;
  height?: number;
  gap?: number;
  radius?: number;
  expandRatio?: number;
  duration?: number;
  ease?: string;
  parallax?: number;
  tilt?: number;
  stagger?: number;
  grayscale?: boolean;
  className?: string;
}

const AccordionGallery = ({
  items,
  defaultIndex = 2,
  height = 330,
  gap = 8,
  radius = 8,
  expandRatio = 0.52,
  duration = 0.6,
  ease = "power3.out",
  parallax = 0.5,
  tilt = 8,
  stagger = 0.06,
  grayscale = false,
  className = ""
}: AccordionGalleryProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mediaRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const mediaSizeRef = useRef(280);
  const firstLayoutRef = useRef(true);
  const [active, setActive] = useState(Math.min(Math.max(defaultIndex, 0), Math.max(items.length - 1, 0)));

  const applyLayout = useCallback(
    (animate: boolean) => {
      if (!panelRefs.current.length) return;

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const ratio = Math.min(Math.max(expandRatio, 0.2), 0.9);
      const grow = items.length > 1 ? (ratio * (items.length - 1)) / (1 - ratio) : 1;
      const timeline = gsap.timeline();
      const tweenDuration = animate && !reducedMotion ? duration : 0;

      timelineRef.current?.kill();
      panelRefs.current.forEach((panel, index) => {
        if (!panel) return;

        const selected = index === active;
        const media = mediaRefs.current[index];
        const label = labelRefs.current[index];
        const rotation = selected ? 0 : index < active ? tilt : -tilt;

        timeline.to(panel, { flexGrow: selected ? grow : 1, rotateY: rotation, duration: tweenDuration, ease }, 0);

        if (media) {
          const drift = Math.max(-1.5, Math.min(1.5, active - index));
          timeline.to(
            media,
            {
              xPercent: -50,
              yPercent: -50,
              x: selected ? 0 : drift * parallax * mediaSizeRef.current * 0.06,
              filter: grayscale ? `grayscale(${selected ? 0 : 1})` : "grayscale(0)",
              duration: tweenDuration,
              ease
            },
            0
          );
        }

        if (label) {
          timeline.to(
            label,
            {
              opacity: selected ? 1 : 0,
              x: selected ? 0 : -12,
              duration: selected ? tweenDuration : tweenDuration * 0.65,
              ease,
              stagger
            },
            0
          );
        }
      });

      timelineRef.current = timeline;
    },
    [active, duration, ease, expandRatio, grayscale, items.length, parallax, stagger, tilt]
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const measure = () => {
      const rect = root.getBoundingClientRect();
      const usableSize = Math.max(rect.width - gap * (items.length - 1), 120);
      mediaSizeRef.current = Math.max(180, usableSize * Math.min(Math.max(expandRatio, 0.2), 0.9) * 1.22);
      root.style.setProperty("--ag-media-size", `${mediaSizeRef.current}px`);
      applyLayout(!firstLayoutRef.current);
    };

    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(root);
    return () => resizeObserver.disconnect();
  }, [applyLayout, expandRatio, gap, items.length]);

  useEffect(() => {
    applyLayout(!firstLayoutRef.current);
    firstLayoutRef.current = false;
    return () => {
      timelineRef.current?.kill();
    };
  }, [applyLayout]);

  const moveActive = (index: number) => setActive((index + items.length) % items.length);

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      moveActive(index + 1);
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      moveActive(index - 1);
    }
  };

  return (
    <div
      ref={rootRef}
      className={`flex w-full min-w-0 max-w-full [perspective:1400px] max-[899px]:!h-[min(300px,86vw)] ${className}`}
      style={{ gap: `${gap}px`, height: `${height}px` }}
      role="list"
      aria-label="Photo gallery"
    >
      {items.map((item, index) => {
        const selected = index === active;
        return (
          <div
            key={item.image}
            ref={(element) => {
              panelRefs.current[index] = element;
            }}
            className="group relative min-h-0 min-w-0 flex-[1_1_0] cursor-pointer overflow-hidden bg-foreground outline-none [transform-origin:center] [transform-style:preserve-3d] focus-visible:ring-2 focus-visible:ring-accent"
            style={{ borderRadius: `${radius}px`, willChange: "flex-grow, transform" }}
            role="listitem"
            tabIndex={0}
            aria-current={selected ? "true" : undefined}
            aria-label={item.alt || item.label || `Photo ${index + 1}`}
            onMouseEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
            onClick={() => setActive(index)}
            onKeyDown={(event) => handleKeyDown(index, event)}
          >
            <span className="absolute inset-0 overflow-hidden" style={{ borderRadius: "inherit" }}>
              <span
                ref={(element) => {
                  mediaRefs.current[index] = element;
                }}
                className="absolute left-1/2 top-1/2 h-full"
                style={{ width: "var(--ag-media-size, 280px)", willChange: "transform, filter" }}
              >
                <img src={item.image} alt={item.alt || ""} draggable={false} className="block h-full w-full select-none object-cover" />
              </span>
              <span
                className="pointer-events-none absolute inset-0"
                style={{ background: "linear-gradient(180deg, transparent 42%, hsl(20 15% 5% / calc(0.72 + var(--theme-image-overlay, 0))) 100%)" }}
                aria-hidden="true"
              />
            </span>
            <span className="pointer-events-none absolute bottom-4 left-4 right-4 z-[2] flex items-center gap-2" aria-hidden="true">
              <span className="h-5 w-0.5 rounded-full bg-white shadow-[0_0_12px_hsl(0_0%_100%/0.6)]" />
              <span
                ref={(element) => {
                  labelRefs.current[index] = element;
                }}
                className="text-sm font-semibold text-white opacity-0 [text-shadow:0_2px_14px_hsl(0_0%_0%/0.55)]"
              >
                {item.label}
              </span>
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default AccordionGallery;