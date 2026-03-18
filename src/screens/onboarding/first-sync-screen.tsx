import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { OnboardingStepLayout } from "@/src/components/onboarding/onboarding-step-layout";
import { ChipButton } from "@/src/components/ui/chip-button";
import { useAppContext } from "@/src/lib/state/app-context";
import { usePalette } from "@/src/lib/theme/theme-context";

export function FirstSyncScreen() {
  const router = useRouter();
  const palette = usePalette();
  const { completeFirstSync, firstSyncStatus, retryFirstSync, translation } = useAppContext();

  useEffect(() => {
    if (firstSyncStatus === "idle") {
      void completeFirstSync();
    }
  }, [completeFirstSync, firstSyncStatus]);

  const canOpenDashboard = firstSyncStatus === "success" || firstSyncStatus === "empty";
  const showRetry = firstSyncStatus === "error";

  return (
    <OnboardingStepLayout
      step={3}
      title={translation.firstSync.title}
      subtitle={translation.firstSync.subtitle}
      notice={firstSyncStatus === "error" ? translation.firstSync.errorBody : undefined}
      contentStyle={styles.statusBlock}
      footer={
        <View style={styles.footerWrap}>
          {showRetry ? (
            <ChipButton variant="secondary" onPress={() => void retryFirstSync()}>
              {translation.firstSync.retry}
            </ChipButton>
          ) : null}

          <ChipButton onPress={() => router.push("/dashboard")} disabled={!canOpenDashboard}>
            {translation.firstSync.openDashboard}
          </ChipButton>
        </View>
      }
    >
      <View style={styles.statusRow}>
        <ActivityIndicator color={palette.accent} animating={firstSyncStatus === "syncing"} />
        <Text style={[styles.statusLine, { color: palette.foreground }]}>{translation.firstSync.syncing}</Text>
      </View>
      <Text style={[styles.statusLine, { color: palette.foreground }]}>{translation.firstSync.extracting}</Text>
      <Text style={[styles.statusLineMuted, { color: palette.muted }]}>{translation.firstSync.finalizing}</Text>

      {firstSyncStatus === "empty" ? (
        <Text style={[styles.message, { color: palette.muted }]}>{translation.firstSync.emptyState}</Text>
      ) : null}

      {firstSyncStatus === "success" ? (
        <View style={styles.messageBlock}>
          <Text style={[styles.messageTitle, { color: palette.foreground }]}>{translation.firstSync.successTitle}</Text>
          <Text style={[styles.message, { color: palette.muted }]}>{translation.firstSync.successBody}</Text>
        </View>
      ) : null}

      {firstSyncStatus === "error" ? (
        <View style={styles.messageBlock}>
          <Text style={[styles.messageTitle, { color: palette.foreground }]}>{translation.firstSync.errorTitle}</Text>
          <Text style={[styles.message, { color: palette.muted }]}>{translation.firstSync.errorBody}</Text>
        </View>
      ) : null}
    </OnboardingStepLayout>
  );
}

const styles = StyleSheet.create({
  statusBlock: {
    gap: 10,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
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
  messageBlock: {
    marginTop: 12,
    gap: 4,
  },
  messageTitle: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "600",
  },
  message: {
    fontSize: 14,
    lineHeight: 21,
  },
  footerWrap: {
    gap: 10,
  },
});
