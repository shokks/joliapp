import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AppProvider, useAppContext } from "@/src/lib/state/app-context";

function AppShell() {
  const { theme } = useAppContext();

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
      <AppShell />
    </AppProvider>
  );
}
