import { StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { HeroBlock } from "@/src/components/layout/hero-block";
import { ChipButton } from "@/src/components/ui/chip-button";
import { Screen } from "@/src/components/ui/screen";
import { useAppContext } from "@/src/lib/state/app-context";

export function WelcomeScreen() {
  const router = useRouter();
  const { translation } = useAppContext();

  return (
    <Screen scroll={false}>
      <View style={styles.screenBody}>
        <View style={styles.topSpacer} />

        <View style={styles.contentBlock}>
          <HeroBlock
            dayLabel={translation.welcome.dayLabel}
            title={translation.welcome.title}
            subtitle={translation.welcome.subtitle}
            body=""
          />

          <View style={styles.ctaWrap}>
            <ChipButton onPress={() => router.push("/joli-login")}>{translation.welcome.cta}</ChipButton>
          </View>
        </View>

        <View style={styles.bottomSpacer} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenBody: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 34,
  },
  topSpacer: {
    flex: 0.9,
    minHeight: 72,
  },
  contentBlock: {
    gap: 18,
  },
  bottomSpacer: {
    flex: 1,
    minHeight: 24,
  },
  ctaWrap: {
    marginTop: 2,
  },
});
