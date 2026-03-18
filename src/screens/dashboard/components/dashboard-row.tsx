import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import type { MockItem } from "@/src/screens/dashboard/dashboard-data";
import { usePalette } from "@/src/lib/theme/theme-context";

type DashboardRowProps = {
  item: MockItem;
};

export function DashboardRowView({ item }: DashboardRowProps) {
  const router = useRouter();
  const palette = usePalette();

  if (item.type === "action" && item.status !== "done") {
    return (
      <View style={[styles.listRow, styles.actionRow, styles.rowDivider, { borderBottomColor: palette.border }]}> 
        <Pressable style={styles.actionBody} onPress={() => router.push("/item/preview")}>
          <Text style={[styles.actionLabel, { color: palette.accent }]}>{item.dueLabel}</Text>
          <Text style={[styles.actionTitle, { color: palette.foreground }]}>{item.title}</Text>
          <Text style={[styles.metaLine, { color: palette.muted }]}>{item.source}</Text>
        </Pressable>

        <View style={styles.actionFooter}>
          <Pressable onPress={() => {}}>
            <Text style={[styles.primaryAction, { color: palette.accent }]}>Done</Text>
          </Pressable>
          <Text style={[styles.actionDivider, { color: palette.border }]}>/</Text>
          <Pressable onPress={() => {}}>
            <Text style={[styles.secondaryAction, { color: palette.muted }]}>Snooze</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  if (item.type === "fyi") {
    return (
      <View style={[styles.listRow, styles.fyiRow, styles.rowDivider, { borderBottomColor: palette.border }]}> 
        <Text style={[styles.secondaryLabel, { color: palette.muted }]}>{item.dueLabel}</Text>
        <Text style={[styles.listTitle, { color: palette.foreground }]}>{item.title}</Text>
        <Text style={[styles.metaLine, { color: palette.muted }]}>{item.source}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.listRow, styles.doneRow, styles.rowDivider, { borderBottomColor: palette.border }]}> 
      <Text style={[styles.doneTitle, { color: palette.muted }]}>{item.title}</Text>
      <Text style={[styles.metaLine, { color: palette.muted }]}>{item.source}</Text>
      <Text style={[styles.doneMeta, { color: palette.muted }]}>{item.updatedLabel}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  listRow: {
    paddingVertical: 18,
    gap: 4,
  },
  actionRow: {
    gap: 10,
  },
  fyiRow: {
    paddingVertical: 15,
  },
  doneRow: {
    paddingVertical: 14,
  },
  actionBody: {
    gap: 4,
  },
  actionFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingTop: 4,
  },
  rowDivider: {
    borderBottomWidth: 1,
  },
  actionLabel: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  secondaryLabel: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "500",
  },
  actionTitle: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "600",
    letterSpacing: -0.25,
  },
  listTitle: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "500",
    opacity: 0.9,
  },
  metaLine: {
    fontSize: 12,
    lineHeight: 18,
    opacity: 0.72,
  },
  primaryAction: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "700",
  },
  secondaryAction: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "600",
  },
  actionDivider: {
    fontSize: 13,
    lineHeight: 18,
  },
  doneTitle: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
    opacity: 0.56,
  },
  doneMeta: {
    fontSize: 12,
    opacity: 0.45,
  },
});
