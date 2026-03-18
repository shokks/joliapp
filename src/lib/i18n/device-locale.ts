import { getLocales } from "expo-localization";
import type { SupportedLocale } from "@/src/lib/i18n/translations";

export function detectDeviceLocale(): SupportedLocale {
  const locale = getLocales()[0]?.languageCode?.toLowerCase();

  return locale === "de" ? "de" : "en";
}
