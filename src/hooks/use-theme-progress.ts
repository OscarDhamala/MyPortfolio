import { useLayoutEffect, useState } from "react";

const STORAGE_KEY = "portfolio-theme-progress";

type HslColor = [number, number, number];

const LIGHT_THEME: Record<string, HslColor> = {
  background: [41, 36, 91],
  foreground: [38, 21, 7],
  card: [42, 56, 96],
  "card-foreground": [38, 21, 7],
  popover: [42, 56, 96],
  "popover-foreground": [38, 21, 7],
  primary: [38, 21, 7],
  "primary-foreground": [41, 36, 91],
  secondary: [42, 36, 85],
  "secondary-foreground": [38, 21, 7],
  muted: [42, 36, 85],
  "muted-foreground": [42, 6, 41],
  accent: [16, 61, 43],
  "accent-foreground": [41, 36, 91],
  destructive: [0, 70, 45],
  "destructive-foreground": [0, 0, 100],
  border: [42, 26, 80],
  input: [42, 26, 80],
  ring: [16, 61, 43]
};

const DARK_THEME: Record<string, HslColor> = {
  background: [30, 16, 8],
  foreground: [39, 28, 93],
  card: [30, 15, 12],
  "card-foreground": [39, 28, 93],
  popover: [30, 15, 12],
  "popover-foreground": [39, 28, 93],
  primary: [39, 28, 93],
  "primary-foreground": [30, 16, 8],
  secondary: [30, 13, 18],
  "secondary-foreground": [39, 28, 93],
  muted: [30, 13, 18],
  "muted-foreground": [36, 10, 68],
  accent: [18, 72, 60],
  "accent-foreground": [30, 16, 8],
  destructive: [0, 68, 58],
  "destructive-foreground": [39, 28, 93],
  border: [30, 14, 27],
  input: [30, 14, 27],
  ring: [18, 72, 60]
};

const clampProgress = (value: number) => Math.min(100, Math.max(0, Math.round(value)));

const readStoredProgress = () => {
  if (typeof window === "undefined") return 0;
  try {
    const stored = Number(window.localStorage.getItem(STORAGE_KEY));
    return Number.isFinite(stored) ? (stored >= 50 ? 100 : 0) : 0;
  } catch {
    return 0;
  }
};

const applyThemeProgress = (progress: number) => {
  const root = document.documentElement;
  const amount = clampProgress(progress) / 100;

  root.style.setProperty("--theme-progress", amount.toString());
  root.style.setProperty("--theme-image-overlay", (amount * 0.12).toFixed(3));

  Object.entries(LIGHT_THEME).forEach(([name, light]) => {
    const dark = DARK_THEME[name];
    const value = light.map((channel, index) => channel + (dark[index] - channel) * amount);
    root.style.setProperty(`--${name}`, `${value[0].toFixed(2)} ${value[1].toFixed(2)}% ${value[2].toFixed(2)}%`);
  });
};

export const useThemeProgress = () => {
  const [progress, setProgressState] = useState(readStoredProgress);

  useLayoutEffect(() => {
    applyThemeProgress(progress);
    try {
      window.localStorage.setItem(STORAGE_KEY, progress.toString());
    } catch {
      // Storage can be unavailable in private browsing contexts.
    }
  }, [progress]);

  const setProgress = (value: number) => setProgressState(clampProgress(value));

  return { progress, setProgress };
};