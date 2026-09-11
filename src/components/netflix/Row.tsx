import { ReactNode, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface RowProps {
  id: string;
  title: string;
  subtitle?: string;
  extraHeader?: ReactNode;
  trackClassName?: string;
  children: ReactNode;
}

export default function Row({ id, title, subtitle, extraHeader, trackClassName, children }: RowProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.85, behavior: "smooth" });
  };

  return (
    <section className="nx-row" id={id}>
      <div className="nx-row-head">
        <h2 className="nx-row-title">{title}</h2>
        {subtitle && <span className="nx-row-sub">{subtitle}</span>}
      </div>
      {extraHeader}
      <div className="nx-row-scroller">
        <button className="nx-row-nav nx-left" type="button" aria-label="Scroll left" onClick={() => scroll(-1)}>
          <ChevronLeft size={26} />
        </button>
        <div className={`nx-row-track ${trackClassName ?? ""}`} ref={trackRef}>
          {children}
        </div>
        <button className="nx-row-nav nx-right" type="button" aria-label="Scroll right" onClick={() => scroll(1)}>
          <ChevronRight size={26} />
        </button>
      </div>
    </section>
  );
}
