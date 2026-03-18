import type { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { HeroBlock } from "@/src/components/layout/hero-block";
import { Screen } from "@/src/components/ui/screen";
import { OnboardingProgress } from "@/src/components/onboarding/onboarding-progress";

type OnboardingStepLayoutProps = PropsWithChildren<{
  step: 1 | 2 | 3;
  title: string;
  subtitle: string;
  contentStyle?: object;
}>;

export function OnboardingStepLayout({
  step,
  title,
  subtitle,
  children,
  contentStyle,
}: OnboardingStepLayoutProps) {
  return (
    <Screen
      scroll
      keyboardShouldPersistTaps="handled"
      automaticallyAdjustKeyboardInsets
      contentContainerStyle={styles.screenBody}
    >
      <View style={styles.layoutRoot}>
        <View style={styles.topSpacer} />

        <View style={styles.contentBlock}>
          <HeroBlock
            dayLabel={`Step ${step}`}
            title={title}
            subtitle={subtitle}
            body=""
            progress={<OnboardingProgress activeStep={step} />}
          />

          <View style={[styles.stepContent, contentStyle]}>{children}</View>
        </View>

        <View style={styles.bottomSpacer} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  layoutRoot: {
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
  stepContent: {
    flex: 1,
    justifyContent: "flex-start",
  },
  bottomSpacer: {
    flex: 1,
    minHeight: 24,
  },
});
