import { Text, View, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { HeroBlock } from "@/src/components/layout/hero-block";
import { Screen } from "@/src/components/ui/screen";
import { SectionLabel } from "@/src/components/ui/section-label";
import { usePalette } from "@/src/lib/theme/theme-context";

export function ItemDetailScreen() {
  const router = useRouter();
  const palette = usePalette();

  return (
    <Screen>
      <Pressable style={styles.back} onPress={() => router.back()}>
        <Text style={[styles.backText, { color: palette.muted }]}>‹ Back</Text>
      </Pressable>

      <HeroBlock
        dayLabel="Due today · Lincoln Elementary"
        title="Sign permission slip."
        subtitle="Science Museum trip."
        body=""
      />

      <View style={[styles.sectionSep, { borderTopColor: palette.border }]}>
        <SectionLabel>From the original message</SectionLabel>
        <Text style={[styles.messageBody, { color: palette.foreground }]}>
          Dear parents, we are excited to announce that our class will be visiting the Science
          Museum on Thursday, March 20. Please{" "}
          <Text style={[styles.highlight, { color: palette.foreground }]}>
            sign and return the permission slip by Wednesday
          </Text>{" "}
          to confirm your child's participation. The cost is $12 per student.
        </Text>
        <Text style={[styles.messageMeta, { color: palette.muted }]}>Lincoln Elementary · March 17 via Klapp</Text>
      </View>

      <View style={styles.actions}>
        <Pressable onPress={() => router.back()}>
          <Text style={[styles.actionDone, { color: palette.accent }]}>Mark done</Text>
        </Pressable>
        <Text style={[styles.actionSep, { color: palette.muted }]}>·</Text>
        <Pressable onPress={() => {}}>
          <Text style={[styles.actionSnooze, { color: palette.muted }]}>Snooze</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  back: {
    paddingVertical: 4,
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  backText: {
    fontSize: 16,
  },
  sectionSep: {
    borderTopWidth: 1,
    paddingTop: 18,
    gap: 14,
  },
  messageBody: {
    fontSize: 15,
    lineHeight: 24,
    opacity: 0.75,
  },
  highlight: {
    fontWeight: "600",
    opacity: 1,
  },
  messageMeta: {
    fontSize: 12,
    lineHeight: 18,
    opacity: 0.6,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingTop: 8,
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
});
