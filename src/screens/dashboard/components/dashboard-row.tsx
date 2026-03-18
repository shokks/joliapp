import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useAppContext } from "@/src/lib/state/app-context";
import type { MockItem } from "@/src/screens/dashboard/dashboard-data";
import { usePalette } from "@/src/lib/theme/theme-context";

type DashboardRowProps = {
  item: MockItem;
};

export function DashboardRowView({ item }: DashboardRowProps) {
  const router = useRouter();
  const palette = usePalette();
  const { markDashboardItemDone, snoozeDashboardItem } = useAppContext();
  const openItemPreview = () =>
    router.push({
      pathname: "/item/preview",
      params: { itemId: item.id },
    });

  if (item.type === "action" && item.status !== "done") {
    return (
      <View style={[styles.listRow, styles.actionRow, styles.actionDividerRow, { borderBottomColor: palette.border }]}> 
        <Pressable style={styles.actionBody} onPress={openItemPreview}>
          <Text style={[styles.actionLabel, { color: palette.accent }]}>{item.dueLabel}</Text>
          <Text style={[styles.actionTitle, { color: palette.foreground }]}>{item.title}</Text>
          <Text style={[styles.actionMeta, { color: palette.muted }]}>{item.source}</Text>
        </Pressable>

        <View style={[styles.actionFooter, { borderTopColor: palette.border }]}> 
          <Pressable onPress={() => markDashboardItemDone(item.id)}>
            <Text style={[styles.primaryAction, { color: palette.accent }]}>Done</Text>
          </Pressable>
          <Text style={[styles.actionDivider, { color: palette.muted }]}>·</Text>
          <Pressable onPress={() => snoozeDashboardItem(item.id, "1d")}>
            <Text style={[styles.secondaryAction, { color: palette.muted }]}>Snooze</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  if (item.type === "fyi") {
    const [dayName = "", monthDay = item.dueLabel] = item.dueLabel.split(", ");
    const sourceLine = item.source;

    return (
      <Pressable
        style={[styles.listRow, styles.fyiRailRow]}
        onPress={openItemPreview}
      >
        <View style={styles.fyiDateRail}>
          <Text style={[styles.fyiDayName, { color: palette.muted }]}>{dayName}</Text>
          <Text style={[styles.fyiMonthDay, { color: palette.foreground }]}>{monthDay}</Text>
        </View>

        <View style={styles.fyiContent}>
          <Text style={[styles.listTitle, { color: palette.foreground }]}>{item.title}</Text>
          <Text style={[styles.fyiSourceLine, { color: palette.muted }]}>{sourceLine}</Text>
        </View>

        {item.childName ? (
          <View style={[styles.childBadge, { borderColor: palette.border, backgroundColor: palette.surface }]}> 
            <Text style={[styles.childBadgeText, { color: palette.muted }]}>{item.childName}</Text>
          </View>
        ) : null}
      </Pressable>
    );
  }

  return (
    <Pressable
      style={[styles.listRow, styles.doneRow]}
      onPress={openItemPreview}
    >
      <Text style={[styles.doneTitle, { color: palette.muted }]}>{item.title}</Text>
      <Text style={[styles.metaLine, { color: palette.muted }]}>{item.source}</Text>
      <Text style={[styles.doneMeta, { color: palette.muted }]}>{item.updatedLabel}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  listRow: {
    paddingVertical: 18,
    gap: 4,
  },
  actionRow: {
    gap: 12,
  },
  fyiRow: {
    paddingVertical: 15,
  },
  fyiRailRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 14,
    paddingVertical: 20,
  },
  doneRow: {
    paddingVertical: 14,
  },
  fyiDateRail: {
    width: 56,
    paddingTop: 1,
    gap: 1,
  },
  fyiContent: {
    flex: 1,
    gap: 3,
  },
  childBadge: {
    minHeight: 24,
    paddingHorizontal: 7,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    marginTop: 3,
  },
  actionBody: {
    gap: 3,
  },
  actionFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingTop: 8,
    borderTopWidth: 1,
  },
  rowDivider: {
    borderBottomWidth: 1,
  },
  actionDividerRow: {
    borderBottomWidth: 1,
    marginRight: 24,
  },
  actionLabel: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  secondaryLabel: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "500",
  },
  fyiDayName: {
    fontSize: 12,
    lineHeight: 15,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.7,
  },
  fyiMonthDay: {
    fontSize: 13,
    lineHeight: 17,
    fontWeight: "400",
    letterSpacing: 0,
  },
  childBadgeText: {
    fontSize: 10,
    lineHeight: 12,
    fontWeight: "600",
  },
  actionTitle: {
    fontSize: 18,
    lineHeight: 25,
    fontWeight: "600",
    letterSpacing: -0.3,
  },
  listTitle: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "400",
    opacity: 0.82,
  },
  metaLine: {
    fontSize: 12,
    lineHeight: 18,
    opacity: 0.72,
  },
  actionMeta: {
    fontSize: 12,
    lineHeight: 18,
    opacity: 0.62,
  },
  fyiSourceLine: {
    fontSize: 12,
    lineHeight: 17,
    opacity: 0.54,
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
    opacity: 0.7,
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
