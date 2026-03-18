import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import type { DashboardRow } from "@/src/screens/dashboard/dashboard-data";
import { usePalette } from "@/src/lib/theme/theme-context";

type DashboardRowProps = {
  item: DashboardRow;
};

export function DashboardRowView({ item }: DashboardRowProps) {
  const router = useRouter();
  const palette = usePalette();

  if (item.kind === "action") {
    return (
      <Pressable
        style={[styles.row, styles.rowDivider, { borderBottomColor: palette.border }]}
        onPress={() => router.push("/item/preview")}
      >
        <Text style={[styles.itemNumber, { color: palette.accent }]}>{item.n}</Text>
        <View style={styles.itemBody}>
          <View style={styles.itemTop}>
            <Text style={[styles.itemTitle, { color: palette.foreground }]}>{item.title}</Text>
            <Text style={[styles.itemWhen, { color: palette.muted }]}>{item.when}</Text>
          </View>
          <Text style={[styles.itemSource, { color: palette.muted }]}>{item.source}</Text>
          <View style={styles.itemActions}>
            <Pressable onPress={() => {}}>
              <Text style={[styles.actionDone, { color: palette.accent }]}>Done</Text>
            </Pressable>
            <Text style={[styles.actionSep, { color: palette.muted }]}>·</Text>
            <Pressable onPress={() => {}}>
              <Text style={[styles.actionSnooze, { color: palette.muted }]}>Snooze</Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
    );
  }

  if (item.kind === "upcoming") {
    return (
      <View style={[styles.row, styles.rowDivider, styles.upcomingRow, { borderBottomColor: palette.border }]}> 
        <Text style={[styles.upcomingDate, { color: palette.muted }]}>{item.date}</Text>
        <Text style={[styles.upcomingEvent, { color: palette.foreground }]}>{item.event}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.row, styles.rowDivider, { borderBottomColor: palette.border }]}> 
      <Text style={[styles.doneTitle, { color: palette.muted }]}>{item.title}</Text>
      <View style={styles.doneMeta}>
        <Text style={[styles.doneSource, { color: palette.muted }]}>{item.source}</Text>
        <Text style={[styles.doneWhen, { color: palette.muted }]}>{item.when}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingVertical: 16,
    gap: 6,
  },
  rowDivider: {
    borderBottomWidth: 1,
  },
  itemNumber: {
    fontSize: 11,
    fontWeight: "500",
    opacity: 0.5,
    width: 20,
    paddingTop: 2,
  },
  itemBody: {
    flex: 1,
    gap: 5,
  },
  itemTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },
  itemTitle: {
    fontSize: 14,
    lineHeight: 20,
    flex: 1,
  },
  itemWhen: {
    fontSize: 12,
    flexShrink: 0,
  },
  itemSource: {
    fontSize: 12,
    lineHeight: 18,
    opacity: 0.7,
  },
  itemActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
  },
  actionDone: {
    fontSize: 13,
    fontWeight: "600",
  },
  actionSep: {
    fontSize: 13,
    opacity: 0.4,
  },
  actionSnooze: {
    fontSize: 13,
  },
  upcomingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  upcomingDate: {
    fontSize: 12,
    width: 76,
    opacity: 0.6,
  },
  upcomingEvent: {
    fontSize: 14,
    lineHeight: 20,
    flex: 1,
    opacity: 0.75,
  },
  doneTitle: {
    fontSize: 14,
    lineHeight: 20,
    textDecorationLine: "line-through",
    opacity: 0.5,
  },
  doneMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  doneSource: {
    fontSize: 12,
    opacity: 0.4,
  },
  doneWhen: {
    fontSize: 12,
    opacity: 0.4,
  },
});
