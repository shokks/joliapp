import { StatusBar } from "expo-status-bar";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type ActionItem = {
  id: string;
  title: string;
  source: string;
  dueLabel: string;
};

type FyiItem = {
  id: string;
  date: string;
  event: string;
};

type DoneItem = {
  id: string;
  title: string;
  source: string;
  completedLabel: string;
};

const palette = {
  background: "#f8f3eb",
  surface: "#efe7db",
  surfaceStrong: "#e5dac8",
  foreground: "#241c16",
  muted: "#70655b",
  accent: "#3f7a5d",
  accentText: "#f8f3eb",
  border: "#ded2bf",
  warning: "#a95c42",
};

const actionItems: ActionItem[] = [
  {
    id: "1",
    title: "Sign permission slip — Science Museum trip",
    source: "Lincoln Elementary · Klapp",
    dueLabel: "Due today",
  },
  {
    id: "2",
    title: "RSVP for Maya's birthday party",
    source: "Sarah Johnson · Email",
    dueLabel: "Due Friday",
  },
  {
    id: "3",
    title: "Confirm annual checkup with Dr. Patel",
    source: "PedsHealth Portal",
    dueLabel: "Due this week",
  },
];

const comingUpItems: FyiItem[] = [
  { id: "1", date: "Wed, Mar 19", event: "Math test — Olivia" },
  { id: "2", date: "Thu, Mar 20", event: "Science Museum trip — Luca" },
  { id: "3", date: "Sat, Mar 22", event: "Maya's birthday party" },
];

const takenCareOfItems: DoneItem[] = [
  {
    id: "1",
    title: "Top up school lunch account",
    source: "Lincoln Elementary",
    completedLabel: "Yesterday",
  },
  {
    id: "2",
    title: "Send football tournament RSVP",
    source: "FC Tigers",
    completedLabel: "2 days ago",
  },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <Text style={styles.sectionLabel}>{children}</Text>;
}

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.dayLabel}>Monday, March 17</Text>
          <Text style={styles.title}>Good morning, Sarah.</Text>
          <Text style={styles.subtitle}>3 things need your attention.</Text>
          <Text style={styles.bodyCopy}>
            Joli turns noisy family messages into a calm daily dashboard with
            what needs action, what is coming up, and what is already handled.
          </Text>
        </View>

        <View style={styles.card}>
          <SectionLabel>Needs your attention</SectionLabel>
          {actionItems.map((item, index) => (
            <View
              key={item.id}
              style={[
                styles.listRow,
                index === actionItems.length - 1 && styles.lastRow,
              ]}
            >
              <View style={styles.rowHeader}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.dueLabel}>{item.dueLabel}</Text>
              </View>
              <Text style={styles.sourceLabel}>{item.source}</Text>
              <View style={styles.actionsRow}>
                <Pressable style={styles.primaryButton}>
                  <Text style={styles.primaryButtonText}>Done</Text>
                </Pressable>
                <Pressable style={styles.secondaryButton}>
                  <Text style={styles.secondaryButtonText}>Snooze</Text>
                </Pressable>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.twoUp}>
          <View style={styles.cardColumn}>
            <SectionLabel>Coming up</SectionLabel>
            {comingUpItems.map((item, index) => (
              <View
                key={item.id}
                style={[
                  styles.simpleRow,
                  index === comingUpItems.length - 1 && styles.lastRow,
                ]}
              >
                <Text style={styles.dateLabel}>{item.date}</Text>
                <Text style={styles.simpleRowTitle}>{item.event}</Text>
              </View>
            ))}
          </View>

          <View style={styles.cardColumn}>
            <SectionLabel>Taken care of</SectionLabel>
            {takenCareOfItems.map((item, index) => (
              <View
                key={item.id}
                style={[
                  styles.simpleRow,
                  index === takenCareOfItems.length - 1 && styles.lastRow,
                ]}
              >
                <Text style={styles.doneTitle}>{item.title}</Text>
                <View style={styles.doneMetaRow}>
                  <Text style={styles.sourceLabel}>{item.source}</Text>
                  <Text style={styles.completedLabel}>{item.completedLabel}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.footerNote}>
          <Text style={styles.footerTitle}>Beta shell</Text>
          <Text style={styles.footerCopy}>
            This shell sets up the native product surface around the beta scope:
            focused dashboard, action-first hierarchy, and room for detail,
            onboarding, and push-driven flows next.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.background,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    gap: 18,
  },
  hero: {
    gap: 10,
    paddingTop: 8,
    paddingBottom: 8,
  },
  dayLabel: {
    color: palette.muted,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 2.2,
    textTransform: "uppercase",
  },
  title: {
    color: palette.foreground,
    fontSize: 34,
    lineHeight: 36,
    fontWeight: "700",
    letterSpacing: -1.2,
  },
  subtitle: {
    color: palette.accent,
    fontSize: 24,
    lineHeight: 28,
    fontWeight: "600",
    letterSpacing: -0.6,
  },
  bodyCopy: {
    color: palette.muted,
    fontSize: 15,
    lineHeight: 23,
    maxWidth: 520,
  },
  card: {
    backgroundColor: palette.surface,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: palette.border,
    padding: 18,
    gap: 4,
  },
  cardColumn: {
    backgroundColor: palette.surface,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: palette.border,
    padding: 18,
    gap: 4,
    flex: 1,
  },
  sectionLabel: {
    color: palette.muted,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  listRow: {
    borderBottomWidth: 1,
    borderBottomColor: palette.border,
    paddingVertical: 14,
    gap: 10,
  },
  simpleRow: {
    borderBottomWidth: 1,
    borderBottomColor: palette.border,
    paddingVertical: 14,
    gap: 8,
  },
  lastRow: {
    borderBottomWidth: 0,
    paddingBottom: 2,
  },
  rowHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },
  itemTitle: {
    color: palette.foreground,
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "600",
    flex: 1,
  },
  dueLabel: {
    color: palette.warning,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "700",
  },
  sourceLabel: {
    color: palette.muted,
    fontSize: 13,
    lineHeight: 18,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 2,
  },
  primaryButton: {
    backgroundColor: palette.accent,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
  },
  primaryButtonText: {
    color: palette.accentText,
    fontSize: 13,
    fontWeight: "700",
  },
  secondaryButton: {
    backgroundColor: palette.surfaceStrong,
    borderColor: palette.border,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
  },
  secondaryButtonText: {
    color: palette.foreground,
    fontSize: 13,
    fontWeight: "600",
  },
  twoUp: {
    gap: 18,
  },
  dateLabel: {
    color: palette.muted,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "700",
  },
  simpleRowTitle: {
    color: palette.foreground,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "500",
  },
  doneTitle: {
    color: palette.muted,
    fontSize: 16,
    lineHeight: 22,
    textDecorationLine: "line-through",
  },
  doneMetaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  completedLabel: {
    color: palette.muted,
    fontSize: 12,
    lineHeight: 18,
  },
  footerNote: {
    backgroundColor: "#f2ebdf",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: palette.border,
    padding: 18,
    gap: 8,
  },
  footerTitle: {
    color: palette.foreground,
    fontSize: 15,
    fontWeight: "700",
  },
  footerCopy: {
    color: palette.muted,
    fontSize: 14,
    lineHeight: 21,
  },
});
