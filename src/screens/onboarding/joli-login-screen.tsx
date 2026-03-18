import { StyleSheet, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { OnboardingStepLayout } from "@/src/components/onboarding/onboarding-step-layout";
import { ChipButton } from "@/src/components/ui/chip-button";
import { usePalette } from "@/src/lib/theme/theme-context";

export function JoliLoginScreen() {
  const router = useRouter();
  const palette = usePalette();

  return (
    <OnboardingStepLayout step={1} title="Sign in to Joli." subtitle="Create your Joli login." contentStyle={styles.formBlock}>
      <View style={styles.fieldGroup}>
        <TextInput
          autoCapitalize="words"
          placeholder="Your name"
          placeholderTextColor={palette.muted}
          style={[styles.input, { borderBottomColor: palette.border, color: palette.foreground }]}
        />
      </View>

      <View style={styles.fieldGroup}>
        <TextInput
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="you@example.com"
          placeholderTextColor={palette.muted}
          style={[styles.input, { borderBottomColor: palette.border, color: palette.foreground }]}
        />
      </View>

      <View style={styles.fieldGroup}>
        <TextInput
          placeholder="Create a password"
          placeholderTextColor={palette.muted}
          secureTextEntry
          style={[styles.input, { borderBottomColor: palette.border, color: palette.foreground }]}
        />
      </View>
      <View style={styles.actions}>
        <ChipButton variant="ghost" onPress={() => router.back()}>
          Back
        </ChipButton>
        <ChipButton style={styles.primaryAction} onPress={() => router.push("/connect-klapp")}>
          Continue
        </ChipButton>
      </View>
    </OnboardingStepLayout>
  );
}

const styles = StyleSheet.create({
  formBlock: {
    gap: 0,
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
