import { KeyboardAvoidingView, Platform, StyleSheet, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { HeroBlock } from "@/src/components/layout/hero-block";
import { ChipButton } from "@/src/components/ui/chip-button";
import { Screen } from "@/src/components/ui/screen";
import { useThemePalette } from "@/src/lib/state/app-context";

export function ConnectKlappScreen() {
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
            dayLabel="Step 2"
            title="Connect Klapp."
            subtitle="Use your Klapp login."
            body=""
            progress={
              <View style={styles.progressRail}>
                <View style={[styles.progressStep, { backgroundColor: palette.surfaceStrong }, styles.progressStepActive, { backgroundColor: palette.accent }]} />
                <View style={[styles.progressStep, { backgroundColor: palette.surfaceStrong }, styles.progressStepActive, { backgroundColor: palette.accent }]} />
                <View style={[styles.progressStep, { backgroundColor: palette.surfaceStrong }]} />
              </View>
            }
          />

          <View style={styles.formBlock}>
            <View style={styles.fieldGroup}>
              <TextInput
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="parent@example.com"
                placeholderTextColor={palette.muted}
                style={[styles.input, { borderBottomColor: palette.border, color: palette.foreground }]}
              />
            </View>

            <View style={styles.fieldGroup}>
              <TextInput
                placeholder="Your Klapp password (not stored)"
                placeholderTextColor={palette.muted}
                secureTextEntry
                style={[styles.input, { borderBottomColor: palette.border, color: palette.foreground }]}
              />
            </View>

            <View style={styles.actions}>
              <ChipButton variant="ghost" onPress={() => router.back()}>
                Back
              </ChipButton>
              <ChipButton style={styles.primaryAction} onPress={() => router.push("/first-sync")}>
                Connect Klapp
              </ChipButton>
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
  formBlock: {
    gap: 0,
    flex: 1,
    justifyContent: "flex-start",
  },
  fieldGroup: {
    marginTop: 4,
  },
  input: {
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    fontSize: 16,
    lineHeight: 22,
    paddingHorizontal: 0,
    paddingTop: 10,
    paddingBottom: 14,
  },
  actions: {
    flexDirection: "row",
    gap: 10,
    marginTop: "auto",
    paddingTop: 22,
  },
  primaryAction: {
    flex: 1,
  },
});
