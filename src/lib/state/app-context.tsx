import type { PropsWithChildren } from "react";
import { createContext, useContext, useMemo, useState } from "react";
import { palettes, type Palette, type ThemeMode } from "@/src/lib/theme/palette";

type AppContextValue = {
  locale: "en" | "de";
  setLocale: (locale: "en" | "de") => void;
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  palette: Palette;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: PropsWithChildren) {
  const [locale, setLocale] = useState<"en" | "de">("en");
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>("light");

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      isAuthenticated,
      setAuthenticated,
      theme,
      setTheme,
      palette: palettes[theme],
    }),
    [isAuthenticated, locale, theme],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }

  return context;
}

export function useThemePalette() {
  return useAppContext().palette;
}
