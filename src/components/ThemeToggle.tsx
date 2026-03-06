
import React from "react";
import { useTheme } from "@/hooks/useTheme";
import { Monitor, Terminal } from "lucide-react";

export default function ThemeToggle() {
  const { toggleTheme, isTerminal } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="cursor-target p-2 rounded-full transition-all duration-300 hover:bg-secondary flex items-center gap-2 group hover-translate"
      aria-label={isTerminal ? "Switch to normal mode" : "Switch to terminal mode"}
    >
      {isTerminal ? (
        <>
          <Monitor className="w-5 h-5 group-hover:animate-pulse" />
          <span className="hidden md:inline text-sm font-mono">Normal</span>
        </>
      ) : (
        <>
          <Terminal className="w-5 h-5 group-hover:animate-pulse" />
          <span className="hidden md:inline text-sm">Terminal</span>
        </>
      )}
      
      {isTerminal ? (
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-terminal-green rounded-full animate-pulse"></span>
      ) : (
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-black rounded-full animate-pulse"></span>
      )}
    </button>
  );
}
