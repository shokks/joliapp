export const lightPalette = {
  background: "#f7f1e7",
  surface: "#f3e8d8",
  surfaceStrong: "#ead8bf",
  foreground: "#23180f",
  muted: "#756658",
  accent: "#2f7a62",
  accentText: "#fff7ef",
  border: "#dcc7aa",
  warning: "#ab6547",
};

export const darkPalette = {
  background: "#17120e",
  surface: "#221a14",
  surfaceStrong: "#2d241d",
  foreground: "#f6eee2",
  muted: "#b5a694",
  accent: "#5aa487",
  accentText: "#10261d",
  border: "#3e3228",
  warning: "#d08a68",
};

export const palette = lightPalette;

export type Palette = typeof palette;
export type ThemeMode = "light" | "dark";

export const palettes: Record<ThemeMode, Palette> = {
  light: lightPalette,
  dark: darkPalette,
};
