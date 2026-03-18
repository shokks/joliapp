import { useMemo, useRef } from "react";
import { Animated, SectionList, StyleSheet, Text, View, type SectionListData } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppContext } from "@/src/lib/state/app-context";
import { usePalette } from "@/src/lib/theme/theme-context";
import type { MockItem } from "@/src/screens/dashboard/dashboard-data";
import { DashboardHero } from "@/src/screens/dashboard/components/dashboard-hero";
import { DashboardRowView } from "@/src/screens/dashboard/components/dashboard-row";
import { DashboardSectionHeader } from "@/src/screens/dashboard/components/dashboard-section-header";

type DashboardSectionItem = MockItem | { id: string; kind: "attention-empty" };

export function DashboardScreen() {
  const palette = usePalette();
  const { dashboardItems, translation } = useAppContext();
  const scrollY = useRef(new Animated.Value(0)).current;
  const today = "2026-03-18";
  const comingUpWindowInDays = 14;
  const takenCareOfLimit = 10;

  const sortedActionItems = useMemo(
    () =>
      dashboardItems
        .filter((item) => item.type === "action" && item.status === "open")
        .sort((left, right) => (left.date ?? "9999").localeCompare(right.date ?? "9999")),
    [dashboardItems],
  );

  const upcomingItemsWithinWindow = useMemo(
    () =>
      dashboardItems
        .filter((item) => item.type === "fyi" && item.status === "open")
        .filter((item) => {
          if (!item.date) {
            return false;
          }

          const dayOffset = Math.floor(
            (new Date(`${item.date}T00:00:00Z`).getTime() - new Date(`${today}T00:00:00Z`).getTime()) / (1000 * 60 * 60 * 24),
          );

          return dayOffset >= 0 && dayOffset <= comingUpWindowInDays;
        })
        .sort((left, right) => (left.date ?? "9999").localeCompare(right.date ?? "9999")),
    [dashboardItems, today],
  );

  const recentDoneItems = useMemo(
    () =>
      dashboardItems
        .filter((item) => item.status === "done")
        .sort((left, right) => (right.date ?? "").localeCompare(left.date ?? ""))
        .slice(0, takenCareOfLimit),
    [dashboardItems],
  );

  const dashboardSections = useMemo(
    () => [
      {
        key: "attention",
        title: translation.dashboard.attentionSection,
        data: sortedActionItems.length > 0 ? sortedActionItems : [{ id: "attention-empty", kind: "attention-empty" as const }],
      },
      ...(upcomingItemsWithinWindow.length > 0
        ? [{ key: "upcoming", title: translation.dashboard.upcomingSection, data: upcomingItemsWithinWindow }]
        : []),
      { key: "done", title: translation.dashboard.doneSection, data: recentDoneItems },
    ],
    [recentDoneItems, sortedActionItems, translation.dashboard.attentionSection, translation.dashboard.doneSection, translation.dashboard.upcomingSection, upcomingItemsWithinWindow],
  ) satisfies Array<SectionListData<DashboardSectionItem, { key: string; title: string }>>;

  const heroOpacity = scrollY.interpolate({
    inputRange: [0, 90],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });
  const heroTranslate = scrollY.interpolate({
    inputRange: [0, 90],
    outputRange: [0, -20],
    extrapolate: "clamp",
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: palette.background }]}> 
      <SectionList<DashboardSectionItem, { key: string; title: string }>
        sections={dashboardSections}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={16}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <Animated.View style={{ opacity: heroOpacity, transform: [{ translateY: heroTranslate }] }}>
            <DashboardHero actionCount={sortedActionItems.length} />
          </Animated.View>
        }
        renderSectionHeader={({ section }) => <DashboardSectionHeader title={section.title} showTopBorder={section.key !== "attention"} />}
        renderItem={({ item }: { item: DashboardSectionItem }) => {
          if ("kind" in item && item.kind === "attention-empty") {
            return (
              <View style={styles.inlineEmptyState}>
                <Text style={[styles.emptyTitle, { color: palette.foreground }]}>{translation.dashboard.allClearTitle}</Text>
                <Text style={[styles.emptyBody, { color: palette.muted }]}>{translation.dashboard.allClearBody}</Text>
              </View>
            );
          }

          return <DashboardRowView item={item as MockItem} />;
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 52,
  },
  inlineEmptyState: {
    minHeight: 144,
    justifyContent: "center",
    paddingVertical: 20,
    gap: 6,
  },
  emptyTitle: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "600",
  },
  emptyBody: {
    fontSize: 14,
    lineHeight: 20,
  },
});
