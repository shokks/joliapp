import { Text } from "react-native";
import { useRouter } from "expo-router";
import { HeroBlock } from "@/src/components/layout/hero-block";
import { ChipButton } from "@/src/components/ui/chip-button";
import { Screen } from "@/src/components/ui/screen";
import { SurfaceCard } from "@/src/components/ui/surface-card";
import { SectionLabel } from "@/src/components/ui/section-label";

export function FirstSyncScreen() {
  const router = useRouter();

  return (
    <Screen>
      <HeroBlock
        dayLabel="First sync"
        title="Joli is getting things ready"
        subtitle="This is where progress feedback lives."
        body="The blocking first-sync experience belongs here so parents land on a dashboard with immediate value instead of an empty shell."
      />

      <SurfaceCard>
        <SectionLabel>Status</SectionLabel>
        <Text>Checking Klapp, reading messages, and preparing your first action list.</Text>
        <ChipButton onPress={() => router.push("/dashboard")}>Open preview dashboard</ChipButton>
      </SurfaceCard>
    </Screen>
  );
}
