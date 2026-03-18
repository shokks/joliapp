import type { PropsWithChildren } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { palettes, type Palette, type ThemeMode } from "@/src/lib/theme/palette";

let themeMemory: ThemeMode = "light";

type ThemeContextValue = {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  palette: Palette;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<ThemeMode>(themeMemory);

  useEffect(() => {
    themeMemory = theme;
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      palette: palettes[theme],
    }),
    [theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}

export function usePalette() {
  return useTheme().palette;
}
