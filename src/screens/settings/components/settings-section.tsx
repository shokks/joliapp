import type { PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";
import { usePalette } from "@/src/lib/theme/theme-context";

type SettingsSectionProps = PropsWithChildren<{
  title: string;
}>;

export function SettingsSection({ title, children }: SettingsSectionProps) {
  const palette = usePalette();

  return (
    <View style={[styles.section, { borderTopColor: palette.border }]}> 
      <Text style={[styles.sectionLabel, { color: palette.muted }]}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingTop: 32,
    borderTopWidth: 1,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase",
    paddingBottom: 10,
  },
});
