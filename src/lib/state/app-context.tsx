import type { PropsWithChildren } from "react";
import { createContext, useContext, useMemo, useState } from "react";

type AppContextValue = {
  locale: "en" | "de";
  setLocale: (locale: "en" | "de") => void;
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: PropsWithChildren) {
  const [locale, setLocale] = useState<"en" | "de">("en");
  const [isAuthenticated, setAuthenticated] = useState(false);

  const value = useMemo(
    () => ({ locale, setLocale, isAuthenticated, setAuthenticated }),
    [isAuthenticated, locale],
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
