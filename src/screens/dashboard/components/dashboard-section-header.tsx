import { StyleSheet, Text, View } from "react-native";
import { usePalette } from "@/src/lib/theme/theme-context";

type DashboardSectionHeaderProps = {
  title: string;
  showTopBorder?: boolean;
};

export function DashboardSectionHeader({ title, showTopBorder = true }: DashboardSectionHeaderProps) {
  const palette = usePalette();

  return (
    <View
      style={[
        styles.stickyHeader,
        {
          backgroundColor: palette.background,
          borderTopColor: palette.border,
          borderTopWidth: showTopBorder ? 1 : 0,
        },
      ]}
    >
      <Text style={[styles.stickyLabel, { color: palette.muted }]}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  stickyHeader: {
    paddingTop: 32,
    paddingBottom: 10,
  },
  stickyLabel: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
});
