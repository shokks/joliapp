import { useRef } from "react";
import { Animated, SectionList, Text, View, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { HeroBlock } from "@/src/components/layout/hero-block";
import { palette } from "@/src/lib/theme/palette";

type ActionRow   = { kind: "action";   n: string; title: string; source: string; when: string };
type UpcomingRow = { kind: "upcoming"; date: string; event: string };
type DoneRow     = { kind: "done";     title: string; source: string; when: string };
type Row = ActionRow | UpcomingRow | DoneRow;

const ALL_ACTIONS: ActionRow[] = [
  { kind: "action", n: "01", title: "Sign permission slip — Science Museum trip",    source: "Lincoln Elementary · Mar 17", when: "Due today"      },
  { kind: "action", n: "02", title: "RSVP for Maya's birthday party",                source: "Sarah Johnson · Mar 16",      when: "Due Friday"     },
  { kind: "action", n: "03", title: "Confirm appointment — Dr. Patel, checkup",      source: "PedsHealth Portal · Mar 15",  when: "Due this week"  },
  { kind: "action", n: "04", title: "Return library books — Olivia",                 source: "Lincoln Elementary · Mar 14", when: "Due this week"  },
  { kind: "action", n: "05", title: "Top up lunch account before Friday",            source: "Lincoln Elementary · Mar 13", when: "Due this week"  },
];

const COMING_UP: UpcomingRow[] = [
  { kind: "upcoming", date: "Wed, Mar 19", event: "Maths test — Olivia" },
  { kind: "upcoming", date: "Thu, Mar 20", event: "Science Museum trip — Luca's class" },
  { kind: "upcoming", date: "Thu, Mar 20", event: "Book fair ends — Lincoln Elementary" },
  { kind: "upcoming", date: "Sat, Mar 22", event: "Maya's birthday party" },
  { kind: "upcoming", date: "Mon, Mar 24", event: "Spring break starts" },
];

const TAKEN_CARE_OF: DoneRow[] = [
  { kind: "done", title: "Sign permission slip — Art Museum visit",  source: "Lincoln Elementary · Mar 14", when: "Yesterday"  },
  { kind: "done", title: "RSVP for Luca's football tournament",      source: "FC Tigers · Mar 13",          when: "2 days ago" },
  { kind: "done", title: "Top up school lunch account",              source: "Lincoln Elementary · Mar 10", when: "Last week"  },
];

export function DashboardScreen() {
  const router = useRouter();
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

  const sections: Array<{ key: string; title: string; data: readonly Row[] }> = [
    { key: "attention", title: "Needs your attention", data: ALL_ACTIONS },
    { key: "upcoming",  title: "Coming up",            data: COMING_UP      },
    { key: "done",      title: "Taken care of",        data: TAKEN_CARE_OF  },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={sections}
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
            <HeroBlock
              dayLabel="Monday, March 17"
              title="Good morning, Sarah."
              subtitle={`${ALL_ACTIONS.length} things need attention.`}
              body=""
            />
          </Animated.View>
        }
        renderSectionHeader={({ section }) => (
          <View style={styles.stickyHeader}>
            <Text style={styles.stickyLabel}>{section.title}</Text>
          </View>
        )}
        renderItem={({ item }) => {
          if (item.kind === "action") {
            return (
              <Pressable
                style={[styles.row, styles.rowDivider]}
                onPress={() => router.push("/item/preview")}
              >
                <Text style={styles.itemNumber}>{item.n}</Text>
                <View style={styles.itemBody}>
                  <View style={styles.itemTop}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Text style={styles.itemWhen}>{item.when}</Text>
                  </View>
                  <Text style={styles.itemSource}>{item.source}</Text>
                  <View style={styles.itemActions}>
                    <Pressable onPress={() => {}}>
                      <Text style={styles.actionDone}>Done</Text>
                    </Pressable>
                    <Text style={styles.actionSep}>·</Text>
                    <Pressable onPress={() => {}}>
                      <Text style={styles.actionSnooze}>Snooze</Text>
                    </Pressable>
                  </View>
                </View>
              </Pressable>
            );
          }

          if (item.kind === "upcoming") {
            return (
              <View style={[styles.row, styles.rowDivider, styles.upcomingRow]}>
                <Text style={styles.upcomingDate}>{item.date}</Text>
                <Text style={styles.upcomingEvent}>{item.event}</Text>
              </View>
            );
          }

          return (
            <View style={[styles.row, styles.rowDivider]}>
              <Text style={styles.doneTitle}>{item.title}</Text>
              <View style={styles.doneMeta}>
                <Text style={styles.doneSource}>{item.source}</Text>
                <Text style={styles.doneWhen}>{item.when}</Text>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 48,
  },

  // Sticky section header
  stickyHeader: {
    backgroundColor: palette.background,
    paddingTop: 32,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: palette.border,
  },
  stickyLabel: {
    color: palette.muted,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase",
  },

  // Shared row base
  row: {
    paddingVertical: 16,
    gap: 6,
  },
  rowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: palette.border,
  },

  // Action items
  itemNumber: {
    color: palette.accent,
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
    color: palette.foreground,
    fontSize: 14,
    lineHeight: 20,
    flex: 1,
  },
  itemWhen: {
    color: palette.muted,
    fontSize: 12,
    flexShrink: 0,
  },
  itemSource: {
    color: palette.muted,
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
    color: palette.accent,
    fontSize: 13,
    fontWeight: "600",
  },
  actionSep: {
    color: palette.muted,
    fontSize: 13,
    opacity: 0.4,
  },
  actionSnooze: {
    color: palette.muted,
    fontSize: 13,
  },

  // Coming up
  upcomingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  upcomingDate: {
    color: palette.muted,
    fontSize: 12,
    width: 76,
    opacity: 0.6,
  },
  upcomingEvent: {
    color: palette.foreground,
    fontSize: 14,
    lineHeight: 20,
    flex: 1,
    opacity: 0.75,
  },

  // Taken care of
  doneTitle: {
    color: palette.muted,
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
    color: palette.muted,
    fontSize: 12,
    opacity: 0.4,
  },
  doneWhen: {
    color: palette.muted,
    fontSize: 12,
    opacity: 0.4,
  },
});
