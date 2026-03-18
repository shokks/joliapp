import { useMemo, useRef } from "react";
import { Animated, SectionList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { usePalette } from "@/src/lib/theme/theme-context";
import {
  mockActionItems,
  mockDoneItems,
  mockItems,
  mockUpcomingItems,
  type MockItem,
} from "@/src/screens/dashboard/dashboard-data";
import { DashboardHero } from "@/src/screens/dashboard/components/dashboard-hero";
import { DashboardRowView } from "@/src/screens/dashboard/components/dashboard-row";
import { DashboardSectionHeader } from "@/src/screens/dashboard/components/dashboard-section-header";

export function DashboardScreen() {
  const palette = usePalette();
  const scrollY = useRef(new Animated.Value(0)).current;

  const sortedActionItems = useMemo(
    () => [...mockActionItems].sort((left, right) => (left.date ?? "9999").localeCompare(right.date ?? "9999")),
    [],
  );

  const dashboardSections: Array<{ key: string; title: string; data: readonly MockItem[] }> = [
    { key: "attention", title: "Needs your attention", data: sortedActionItems },
    { key: "upcoming", title: "Coming up", data: mockUpcomingItems },
    { key: "done", title: "Taken care of", data: mockDoneItems },
  ];

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
      <SectionList
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
            <DashboardHero actionCount={mockItems.filter((item) => item.type === "action" && item.status !== "done").length} />
          </Animated.View>
        }
        renderSectionHeader={({ section }) => <DashboardSectionHeader title={section.title} />}
        renderItem={({ item, section }) => {
          if (section.key === "attention" && section.data.length === 0) {
            return null;
          }

          return <DashboardRowView item={item} />;
        }}
        ListEmptyComponent={
          <View style={styles.emptyState}> 
            <Text style={[styles.emptyTitle, { color: palette.foreground }]}>Nothing needs your attention right now.</Text>
            <Text style={[styles.emptyBody, { color: palette.muted }]}>New action items will appear here when Joli finds something you need to handle.</Text>
          </View>
        }
        SectionSeparatorComponent={() => <View style={styles.sectionGap} />}
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
  emptyState: {
    marginTop: 14,
    paddingVertical: 8,
    gap: 6,
  },
  emptyTitle: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "600",
  },
  emptyBody: {
    fontSize: 14,
    lineHeight: 20,
  },
  sectionGap: {
    height: 10,
  },
});
