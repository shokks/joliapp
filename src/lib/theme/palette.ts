export const lightPalette = {
  background: "#faf7f1",
  surface: "#f0ece3",
  surfaceStrong: "#e5ded1",
  foreground: "#1f1812",
  muted: "#7c7469",
  accent: "#3d876b",
  accentText: "#faf7f1",
  border: "#d8d0c2",
  warning: "#b36a4c",
};

export const darkPalette = {
  background: "#17120e",
  surface: "#221a14",
  surfaceStrong: "#2d241d",
  foreground: "#f6eee2",
  muted: "#b5a694",
  accent: "#66ad90",
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
