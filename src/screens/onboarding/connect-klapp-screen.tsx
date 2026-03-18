import { Text } from "react-native";
import { useRouter } from "expo-router";
import { HeroBlock } from "@/src/components/layout/hero-block";
import { ChipButton } from "@/src/components/ui/chip-button";
import { Screen } from "@/src/components/ui/screen";
import { SurfaceCard } from "@/src/components/ui/surface-card";
import { SectionLabel } from "@/src/components/ui/section-label";

export function ConnectKlappScreen() {
  const router = useRouter();

  return (
    <Screen>
      <HeroBlock
        dayLabel="Onboarding"
        title="Connect your Klapp account"
        subtitle="One connection. Ongoing calm."
        body="Joli uses your Klapp messages to extract forms, deadlines, appointments, and upcoming events that actually matter."
      />

      <SurfaceCard>
        <SectionLabel>Klapp connection</SectionLabel>
        <Text>Email and password fields will live here in the next task.</Text>
        <Text>For now, this placeholder proves the route structure and onboarding flow.</Text>
        <ChipButton onPress={() => router.push("/first-sync")}>Continue to first sync</ChipButton>
      </SurfaceCard>
    </Screen>
  );
}
