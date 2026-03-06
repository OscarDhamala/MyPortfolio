
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "normal" | "terminal";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isTerminal: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("normal");
  
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === "normal" ? "terminal" : "normal");
  };

  const isTerminal = theme === "terminal";
  
  useEffect(() => {
    if (isTerminal) {
      document.body.classList.add("terminal-mode");
    } else {
      document.body.classList.remove("terminal-mode");
    }
  }, [isTerminal]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isTerminal }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
