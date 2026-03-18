import { StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { OnboardingStepLayout } from "@/src/components/onboarding/onboarding-step-layout";
import { ChipButton } from "@/src/components/ui/chip-button";
import { usePalette } from "@/src/lib/theme/theme-context";

export function FirstSyncScreen() {
  const router = useRouter();
  const palette = usePalette();

  return (
    <OnboardingStepLayout step={3} title="Getting ready." subtitle="This takes a moment." contentStyle={styles.statusBlock}>
      <Text style={[styles.statusLine, { color: palette.foreground }]}>Syncing messages</Text>
      <Text style={[styles.statusLine, { color: palette.foreground }]}>Finding what needs attention</Text>
      <Text style={[styles.statusLineMuted, { color: palette.muted }]}>Preparing your dashboard</Text>

      <View style={styles.ctaWrap}>
        <ChipButton onPress={() => router.push("/dashboard")}>Open dashboard</ChipButton>
      </View>
    </OnboardingStepLayout>
  );
}

const styles = StyleSheet.create({
  statusBlock: {
    gap: 10,
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
