import { Text } from "react-native";
import { HeroBlock } from "@/src/components/layout/hero-block";
import { Screen } from "@/src/components/ui/screen";
import { SectionLabel } from "@/src/components/ui/section-label";
import { SurfaceCard } from "@/src/components/ui/surface-card";

export function SettingsScreen() {
  return (
    <Screen>
      <HeroBlock
        dayLabel="Settings"
        title="Preferences and account state"
        subtitle="A home for language and connection controls."
        body="Language override, connection health, and future beta preferences will live here."
      />

      <SurfaceCard>
        <SectionLabel>Coming soon</SectionLabel>
        <Text>Settings placeholders are ready for the next implementation slices.</Text>
      </SurfaceCard>
    </Screen>
  );
}
