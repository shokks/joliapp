import { Text, View, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { HeroBlock } from "@/src/components/layout/hero-block";
import { Screen } from "@/src/components/ui/screen";
import { SectionLabel } from "@/src/components/ui/section-label";
import { palette } from "@/src/lib/theme/palette";

export function ItemDetailScreen() {
  const router = useRouter();

  return (
    <Screen>
      <Pressable style={styles.back} onPress={() => router.back()}>
        <Text style={styles.backText}>‹ Back</Text>
      </Pressable>

      <HeroBlock
        dayLabel="Due today · Lincoln Elementary"
        title="Sign permission slip."
        subtitle="Science Museum trip."
        body=""
      />

      <View style={styles.sectionSep}>
        <SectionLabel>From the original message</SectionLabel>
        <Text style={styles.messageBody}>
          Dear parents, we are excited to announce that our class will be visiting the Science
          Museum on Thursday, March 20. Please{" "}
          <Text style={styles.highlight}>
            sign and return the permission slip by Wednesday
          </Text>{" "}
          to confirm your child's participation. The cost is $12 per student.
        </Text>
        <Text style={styles.messageMeta}>Lincoln Elementary · March 17 via Klapp</Text>
      </View>

      <View style={styles.actions}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.actionDone}>Mark done</Text>
        </Pressable>
        <Text style={styles.actionSep}>·</Text>
        <Pressable onPress={() => {}}>
          <Text style={styles.actionSnooze}>Snooze</Text>
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
    color: palette.muted,
    fontSize: 16,
  },
  sectionSep: {
    borderTopWidth: 1,
    borderTopColor: palette.border,
    paddingTop: 18,
    gap: 14,
  },
  messageBody: {
    color: palette.foreground,
    fontSize: 15,
    lineHeight: 24,
    opacity: 0.75,
  },
  highlight: {
    color: palette.foreground,
    fontWeight: "600",
    opacity: 1,
  },
  messageMeta: {
    color: palette.muted,
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
});
