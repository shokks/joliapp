import { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { OnboardingStepLayout } from "@/src/components/onboarding/onboarding-step-layout";
import { ChipButton } from "@/src/components/ui/chip-button";
import { saveKlappRefreshToken } from "@/src/lib/storage/secure-storage";
import { useAppContext } from "@/src/lib/state/app-context";
import { usePalette } from "@/src/lib/theme/theme-context";

function isValidEmail(value: string) {
  return /\S+@\S+\.\S+/.test(value.trim());
}

export function ConnectKlappScreen() {
  const router = useRouter();
  const palette = usePalette();
  const { clearOnboardingError, connectKlapp, onboardingError, translation } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const errorMessage = localError
    ?? (onboardingError === "invalid_credentials"
      ? translation.klappConnect.errorInvalidCredentials
      : onboardingError === "reconnect_required"
        ? translation.klappConnect.recoveryBody
        : onboardingError === "connection_failed"
          ? translation.klappConnect.errorConnectionFailed
          : null);

  const handleContinue = async () => {
    clearOnboardingError();

    if (!email.trim() || !password.trim()) {
      setLocalError(translation.klappConnect.errorMissingFields);
      return;
    }

    if (!isValidEmail(email)) {
      setLocalError(translation.klappConnect.errorInvalidEmail);
      return;
    }

    setLocalError(null);
    setIsSubmitting(true);
    const result = await connectKlapp({ email, password });

    if (result.ok && result.refreshToken) {
      await saveKlappRefreshToken(result.refreshToken);
      setIsSubmitting(false);
      router.push("/first-sync");
      return;
    }

    setIsSubmitting(false);
  };

  return (
    <OnboardingStepLayout
      step={2}
      title={translation.klappConnect.title}
      subtitle={translation.klappConnect.subtitle}
      helper={translation.klappConnect.helper}
      notice={errorMessage ?? undefined}
      contentStyle={styles.formBlock}
      footer={
        <View style={styles.actions}>
          <ChipButton variant="ghost" onPress={() => router.back()}>{translation.klappConnect.back}</ChipButton>
          <ChipButton style={styles.primaryAction} onPress={handleContinue} disabled={isSubmitting}>
            {isSubmitting ? translation.klappConnect.connecting : translation.klappConnect.continue}
          </ChipButton>
        </View>
      }
    >
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
          placeholder={translation.klappConnect.emailPlaceholder}
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
          placeholder={translation.klappConnect.passwordPlaceholder}
          placeholderTextColor={palette.muted}
          secureTextEntry
          style={[styles.input, { borderBottomColor: palette.border, color: palette.foreground }]}
          value={password}
        />
      </View>

      {isSubmitting ? (
        <View style={styles.loadingRow}>
          <ActivityIndicator color={palette.accent} />
          <Text style={[styles.loadingText, { color: palette.muted }]}>{translation.klappConnect.connected}</Text>
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
