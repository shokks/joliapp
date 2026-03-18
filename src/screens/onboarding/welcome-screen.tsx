import { StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { HeroBlock } from "@/src/components/layout/hero-block";
import { ChipButton } from "@/src/components/ui/chip-button";
import { Screen } from "@/src/components/ui/screen";

export function WelcomeScreen() {
  const router = useRouter();

  return (
    <Screen scroll={false}>
      <View style={styles.screenBody}>
        <View style={styles.topSpacer} />

        <View style={styles.contentBlock}>
          <HeroBlock
            dayLabel="Joli beta"
            title="Welcome to Joli."
            subtitle="A calmer way to stay on top of family admin."
            body=""
          />

          <View style={styles.ctaWrap}>
            <ChipButton onPress={() => router.push("/joli-login")}>Continue</ChipButton>
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
