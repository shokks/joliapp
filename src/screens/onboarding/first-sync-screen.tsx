import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { HeroBlock } from "@/src/components/layout/hero-block";
import { ChipButton } from "@/src/components/ui/chip-button";
import { Screen } from "@/src/components/ui/screen";
import { useThemePalette } from "@/src/lib/state/app-context";

export function FirstSyncScreen() {
  const router = useRouter();
  const palette = useThemePalette();

  return (
    <Screen scroll keyboardShouldPersistTaps="handled" contentContainerStyle={styles.screenBody}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoider}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.topSpacer} />

        <View style={styles.contentBlock}>
          <HeroBlock
            dayLabel="Step 3"
            title="Getting ready."
            subtitle="This takes a moment."
            body=""
            progress={
              <View style={styles.progressRail}>
                <View style={[styles.progressStep, { backgroundColor: palette.surfaceStrong }, styles.progressStepActive, { backgroundColor: palette.accent }]} />
                <View style={[styles.progressStep, { backgroundColor: palette.surfaceStrong }, styles.progressStepActive, { backgroundColor: palette.accent }]} />
                <View style={[styles.progressStep, { backgroundColor: palette.surfaceStrong }, styles.progressStepActive, { backgroundColor: palette.accent }]} />
              </View>
            }
          />

          <View style={styles.statusBlock}>
            <Text style={[styles.statusLine, { color: palette.foreground }]}>Syncing messages</Text>
            <Text style={[styles.statusLine, { color: palette.foreground }]}>Finding what needs attention</Text>
            <Text style={[styles.statusLineMuted, { color: palette.muted }]}>Preparing your dashboard</Text>

            <View style={styles.ctaWrap}>
              <ChipButton onPress={() => router.push("/dashboard")}>Open dashboard</ChipButton>
            </View>
          </View>
        </View>

        <View style={styles.bottomSpacer} />
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  keyboardAvoider: {
    flex: 1,
  },
  screenBody: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 0,
    paddingBottom: 34,
  },
  topSpacer: {
    flex: 0.9,
    minHeight: 72,
  },
  contentBlock: {
    gap: 18,
    minHeight: 430,
  },
  progressRail: {
    flexDirection: "row",
    gap: 8,
  },
  progressStep: {
    height: 6,
    flex: 1,
    borderRadius: 999,
  },
  progressStepActive: {
  },
  bottomSpacer: {
    flex: 1,
    minHeight: 24,
  },
  statusBlock: {
    gap: 10,
    flex: 1,
    justifyContent: "flex-start",
  },
  statusLine: {
    fontSize: 15,
    lineHeight: 23,
  },
  statusLineMuted: {
    fontSize: 15,
    lineHeight: 23,
  },
  ctaWrap: {
    marginTop: "auto",
    paddingTop: 22,
  },
});
