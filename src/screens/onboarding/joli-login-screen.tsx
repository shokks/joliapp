import { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { OnboardingStepLayout } from "@/src/components/onboarding/onboarding-step-layout";
import { ChipButton } from "@/src/components/ui/chip-button";
import { useAppContext } from "@/src/lib/state/app-context";
import { usePalette } from "@/src/lib/theme/theme-context";

function isValidEmail(value: string) {
  return /\S+@\S+\.\S+/.test(value.trim());
}

export function JoliLoginScreen() {
  const router = useRouter();
  const palette = usePalette();
  const { completeSignUp, translation, clearOnboardingError } = useAppContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContinue = async () => {
    clearOnboardingError();

    if (!name.trim() || !email.trim() || !password.trim()) {
      setLocalError(translation.joliLogin.errorMissingFields);
      return;
    }

    if (!isValidEmail(email)) {
      setLocalError(translation.joliLogin.errorInvalidEmail);
      return;
    }

    if (password.trim().length < 8) {
      setLocalError(translation.joliLogin.errorWeakPassword);
      return;
    }

    setLocalError(null);
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    completeSignUp({ name: name.trim(), email: email.trim() });
    setIsSubmitting(false);
    router.push("/connect-klapp");
  };

  return (
    <OnboardingStepLayout
      step={1}
      title={translation.joliLogin.title}
      subtitle={translation.joliLogin.subtitle}
      helper={translation.joliLogin.helper}
      notice={localError ?? undefined}
      contentStyle={styles.formBlock}
      footer={
        <View style={styles.actions}>
          <ChipButton variant="ghost" onPress={() => router.back()}>{translation.joliLogin.back}</ChipButton>
          <ChipButton style={styles.primaryAction} onPress={handleContinue} disabled={isSubmitting}>
            {isSubmitting ? translation.joliLogin.loading : translation.joliLogin.continue}
          </ChipButton>
        </View>
      }
    >
      <View style={styles.fieldGroup}>
        <TextInput
          autoCapitalize="words"
          editable={!isSubmitting}
          onChangeText={(value) => {
            setName(value);
            if (localError) {
              setLocalError(null);
            }
          }}
          placeholder={translation.joliLogin.namePlaceholder}
          placeholderTextColor={palette.muted}
          style={[styles.input, { borderBottomColor: palette.border, color: palette.foreground }]}
          value={name}
        />
      </View>

      <View style={styles.fieldGroup}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          editable={!isSubmitting}
          keyboardType="email-address"
          onChangeText={(value) => {
            setEmail(value);
            if (localError) {
              setLocalError(null);
            }
          }}
          placeholder={translation.joliLogin.emailPlaceholder}
          placeholderTextColor={palette.muted}
          style={[styles.input, { borderBottomColor: palette.border, color: palette.foreground }]}
          value={email}
        />
      </View>

      <View style={styles.fieldGroup}>
        <TextInput
          editable={!isSubmitting}
          onChangeText={(value) => {
            setPassword(value);
            if (localError) {
              setLocalError(null);
            }
          }}
          placeholder={translation.joliLogin.passwordPlaceholder}
          placeholderTextColor={palette.muted}
          secureTextEntry
          style={[styles.input, { borderBottomColor: palette.border, color: palette.foreground }]}
          value={password}
        />
      </View>

      {isSubmitting ? (
        <View style={styles.loadingRow}>
          <ActivityIndicator color={palette.accent} />
          <Text style={[styles.loadingText, { color: palette.muted }]}>{translation.joliLogin.loading}</Text>
        </View>
      ) : null}
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
  loadingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 18,
  },
  loadingText: {
    fontSize: 14,
    lineHeight: 20,
  },
  actions: {
    flexDirection: "row",
    gap: 10,
  },
  primaryAction: {
    flex: 1,
  },
});
