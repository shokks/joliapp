import type { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { usePalette } from "@/src/lib/theme/theme-context";

type SettingsRowProps = {
  title: string;
  description: string;
  meta?: string;
  trailing?: ReactNode;
  hideBorder?: boolean;
};

export function SettingsRow({ title, description, meta, trailing, hideBorder = false }: SettingsRowProps) {
  const palette = usePalette();

  return (
    <View style={[styles.row, { borderBottomColor: hideBorder ? "transparent" : palette.border }]}> 
      <View style={styles.rowBody}>
        <Text style={[styles.rowTitle, { color: palette.foreground }]}>{title}</Text>
        <Text style={[styles.rowCopy, { color: palette.muted }]}>{description}</Text>
      </View>
      {trailing ?? (meta ? <Text style={[styles.rowMeta, { color: palette.muted }]}>{meta}</Text> : null)}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  rowBody: {
    flex: 1,
    gap: 5,
  },
  rowTitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  rowCopy: {
    fontSize: 12,
    lineHeight: 18,
    opacity: 0.7,
  },
  rowMeta: {
    fontSize: 12,
    opacity: 0.6,
  },
});
