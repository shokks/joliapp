import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AppProvider } from "@/src/lib/state/app-context";
import { ThemeProvider, useTheme } from "@/src/lib/theme/theme-context";

function AppShell() {
  const { theme } = useTheme();

  return (
    <>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}

export default function RootLayout() {
  return (
    <AppProvider>
      <ThemeProvider>
        <AppShell />
      </ThemeProvider>
    </AppProvider>
  );
}
