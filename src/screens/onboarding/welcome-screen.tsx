import { Text } from "react-native";
import { useRouter } from "expo-router";
import { HeroBlock } from "@/src/components/layout/hero-block";
import { ChipButton } from "@/src/components/ui/chip-button";
import { Screen } from "@/src/components/ui/screen";
import { SurfaceCard } from "@/src/components/ui/surface-card";
import { SectionLabel } from "@/src/components/ui/section-label";

export function WelcomeScreen() {
  const router = useRouter();

  return (
    <Screen>
      <HeroBlock
        dayLabel="Joli beta"
        title="Family admin, handled."
        subtitle="Connect once. Stay present."
        body="Joli reads the noise from school and family logistics, then surfaces only what needs your attention."
      />

      <SurfaceCard>
        <SectionLabel>Start here</SectionLabel>
        <Text>
          Create your account, connect Klapp, and wait while Joli prepares your first daily dashboard.
        </Text>
        <ChipButton onPress={() => router.push("/connect-klapp")}>Get started</ChipButton>
      </SurfaceCard>
    </Screen>
  );
}
