import type { PropsWithChildren } from "react";
import { StyleSheet, Text } from "react-native";
import { useThemePalette } from "@/src/lib/state/app-context";

export function SectionLabel({ children }: PropsWithChildren) {
  const palette = useThemePalette();

  return <Text style={[styles.label, { color: palette.muted }]}>{children}</Text>;
}

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 10,
  },
});
