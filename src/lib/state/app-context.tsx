import type { PropsWithChildren } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { detectDeviceLocale } from "@/src/lib/i18n/device-locale";
import { translations, type SupportedLocale } from "@/src/lib/i18n/translations";

type KlappConnectionStatus = "idle" | "connecting" | "connected" | "syncing" | "error" | "reconnect_required";
type FirstSyncStatus = "idle" | "syncing" | "success" | "empty" | "error";
type OnboardingErrorCode = "invalid_credentials" | "connection_failed" | "reconnect_required" | null;

type SessionProfile = {
  name: string;
  email: string;
};

type KlappCredentials = {
  email: string;
  password: string;
};

type AppContextValue = {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
  localeSource: "device" | "manual";
  translation: (typeof translations)[SupportedLocale];
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
  sessionProfile: SessionProfile | null;
  completeSignUp: (profile: SessionProfile) => void;
  klappConnectionStatus: KlappConnectionStatus;
  klappEmail: string;
  connectKlapp: (credentials: KlappCredentials) => Promise<{ ok: boolean; refreshToken?: string }>;
  completeFirstSync: () => Promise<void>;
  retryFirstSync: () => Promise<void>;
  firstSyncStatus: FirstSyncStatus;
  onboardingError: OnboardingErrorCode;
  clearOnboardingError: () => void;
};

const AppContext = createContext<AppContextValue | null>(null);

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function AppProvider({ children }: PropsWithChildren) {
  const [locale, setLocaleState] = useState<SupportedLocale>("en");
  const [localeSource, setLocaleSource] = useState<"device" | "manual">("device");
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [sessionProfile, setSessionProfile] = useState<SessionProfile | null>(null);
  const [klappConnectionStatus, setKlappConnectionStatus] = useState<KlappConnectionStatus>("idle");
  const [klappEmail, setKlappEmail] = useState("");
  const [firstSyncStatus, setFirstSyncStatus] = useState<FirstSyncStatus>("idle");
  const [onboardingError, setOnboardingError] = useState<OnboardingErrorCode>(null);

  useEffect(() => {
    setLocaleState(detectDeviceLocale());
  }, []);

  const setLocale = (nextLocale: SupportedLocale) => {
    setLocaleSource("manual");
    setLocaleState(nextLocale);
  };

  const clearOnboardingError = () => {
    setOnboardingError(null);
    if (klappConnectionStatus === "error" || klappConnectionStatus === "reconnect_required") {
      setKlappConnectionStatus("idle");
    }
  };

  const completeSignUp = (profile: SessionProfile) => {
    setSessionProfile(profile);
    setAuthenticated(true);
  };

  const connectKlapp = async ({ email, password }: KlappCredentials) => {
    setKlappEmail(email.trim());
    setKlappConnectionStatus("connecting");
    setOnboardingError(null);
    await wait(700);

    const normalizedEmail = email.trim().toLowerCase();

    if (normalizedEmail.includes("reconnect")) {
      setKlappConnectionStatus("reconnect_required");
      setOnboardingError("reconnect_required");
      return { ok: false };
    }

    if (password.trim() === "wrongpass") {
      setKlappConnectionStatus("error");
      setOnboardingError("invalid_credentials");
      return { ok: false };
    }

    if (normalizedEmail.includes("offline") || normalizedEmail.includes("error")) {
      setKlappConnectionStatus("error");
      setOnboardingError("connection_failed");
      return { ok: false };
    }

    setKlappConnectionStatus("connected");
    return { ok: true, refreshToken: `mock-refresh-${normalizedEmail}-${password.length}` };
  };

  const runFirstSync = async () => {
    setFirstSyncStatus("syncing");
    setKlappConnectionStatus("syncing");
    setOnboardingError(null);
    await wait(900);

    const normalizedEmail = klappEmail.toLowerCase();

    if (normalizedEmail.includes("empty")) {
      setFirstSyncStatus("empty");
      setKlappConnectionStatus("connected");
      return;
    }

    if (normalizedEmail.includes("syncfail")) {
      setFirstSyncStatus("error");
      setKlappConnectionStatus("error");
      setOnboardingError("connection_failed");
      return;
    }

    setFirstSyncStatus("success");
    setKlappConnectionStatus("connected");
  };

  const completeFirstSync = async () => {
    await runFirstSync();
  };

  const retryFirstSync = async () => {
    await runFirstSync();
  };

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      localeSource,
      translation: translations[locale],
      isAuthenticated,
      setAuthenticated,
      sessionProfile,
      completeSignUp,
      klappConnectionStatus,
      klappEmail,
      connectKlapp,
      completeFirstSync,
      retryFirstSync,
      firstSyncStatus,
      onboardingError,
      clearOnboardingError,
    }),
    [firstSyncStatus, isAuthenticated, klappConnectionStatus, klappEmail, locale, localeSource, onboardingError, sessionProfile],
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
