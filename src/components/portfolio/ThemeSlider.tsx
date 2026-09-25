import { Moon, Sun } from "lucide-react";

interface ThemeSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const ThemeSlider = ({ value, onChange }: ThemeSliderProps) => {
  const isDark = value >= 50;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => onChange(isDark ? 0 : 100)}
      className="glass group relative flex h-8 w-[58px] items-center justify-between rounded-full px-1.5 text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <Sun aria-hidden="true" className={`absolute left-1.5 h-3.5 w-3.5 transition-colors ${isDark ? "text-muted-foreground" : "text-accent"}`} strokeWidth={1.8} />
      <Moon aria-hidden="true" className={`absolute right-1.5 h-3.5 w-3.5 transition-colors ${isDark ? "text-accent" : "text-muted-foreground"}`} strokeWidth={1.8} />
      <span
        aria-hidden="true"
        className="absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border border-foreground/20 bg-background shadow-[0_1px_5px_hsl(20_15%_5%/0.22)] transition-[left,transform] duration-300 group-active:scale-90"
        style={{ left: isDark ? "31px" : "3px" }}
      />
    </button>
  );
};

export default ThemeSlider;