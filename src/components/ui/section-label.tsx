import type { PropsWithChildren } from "react";
import { StyleSheet, Text } from "react-native";
import { palette } from "@/src/lib/theme/palette";

export function SectionLabel({ children }: PropsWithChildren) {
  return <Text style={styles.label}>{children}</Text>;
}

const styles = StyleSheet.create({
  label: {
    color: palette.muted,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 10,
  },
});
