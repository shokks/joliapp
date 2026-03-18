import type { PropsWithChildren, ReactNode } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { HeroBlock } from "@/src/components/layout/hero-block";
import { Screen } from "@/src/components/ui/screen";
import { OnboardingProgress } from "@/src/components/onboarding/onboarding-progress";
import { usePalette } from "@/src/lib/theme/theme-context";

type OnboardingStepLayoutProps = PropsWithChildren<{
  step: 1 | 2 | 3;
  title: string;
  subtitle: string;
  helper?: string;
  notice?: string;
  contentStyle?: StyleProp<ViewStyle>;
  footer?: ReactNode;
}>;

export function OnboardingStepLayout({
  step,
  title,
  subtitle,
  helper,
  notice,
  children,
  contentStyle,
  footer,
}: OnboardingStepLayoutProps) {
  const palette = usePalette();

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 24}
    >
      <Screen
        scroll
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustKeyboardInsets
        contentContainerStyle={styles.screenBody}
      >
        <Pressable style={styles.dismissSurface} onPress={Keyboard.dismiss}>
          <View style={styles.topSpacer} />

          <View style={styles.contentBlock}>
            <HeroBlock
              dayLabel={`Step ${step}`}
              title={title}
              subtitle={subtitle}
              body={helper ?? ""}
              progress={<OnboardingProgress activeStep={step} />}
            />

            <View style={[styles.stepContent, contentStyle]}>{children}</View>

            {notice ? (
              <View style={[styles.noticeCard, { backgroundColor: palette.surface, borderColor: palette.border }]}> 
                <Text style={[styles.noticeText, { color: palette.warning }]}>{notice}</Text>
              </View>
            ) : null}

            {footer ? <View style={styles.footer}>{footer}</View> : null}
          </View>

          <View style={styles.bottomSpacer} />
        </Pressable>
      </Screen>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  dismissSurface: {
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
  noticeCard: {
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  noticeText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
  },
  footer: {
    marginTop: "auto",
    paddingTop: 6,
  },
  bottomSpacer: {
    flex: 1,
    minHeight: 24,
  },
});
