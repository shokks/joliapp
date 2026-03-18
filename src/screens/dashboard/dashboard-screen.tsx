import { useRef } from "react";
import { Animated, SectionList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { usePalette } from "@/src/lib/theme/theme-context";
import { ALL_ACTIONS, dashboardSections, type DashboardRow } from "@/src/screens/dashboard/dashboard-data";
import { DashboardHero } from "@/src/screens/dashboard/components/dashboard-hero";
import { DashboardRowView } from "@/src/screens/dashboard/components/dashboard-row";
import { DashboardSectionHeader } from "@/src/screens/dashboard/components/dashboard-section-header";

export function DashboardScreen() {
  const palette = usePalette();
  const scrollY = useRef(new Animated.Value(0)).current;

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
        keyExtractor={(_, index) => String(index)}
        stickySectionHeadersEnabled
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={16}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <Animated.View style={{ opacity: heroOpacity, transform: [{ translateY: heroTranslate }] }}>
            <DashboardHero actionCount={ALL_ACTIONS.length} />
          </Animated.View>
        }
        renderSectionHeader={({ section }) => <DashboardSectionHeader title={section.title} />}
        renderItem={({ item }: { item: DashboardRow }) => <DashboardRowView item={item} />}
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
    paddingBottom: 48,
  },
});
