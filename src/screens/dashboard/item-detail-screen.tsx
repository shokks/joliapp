import { Text } from "react-native";
import { HeroBlock } from "@/src/components/layout/hero-block";
import { ChipButton } from "@/src/components/ui/chip-button";
import { Screen } from "@/src/components/ui/screen";
import { SectionLabel } from "@/src/components/ui/section-label";
import { SurfaceCard } from "@/src/components/ui/surface-card";

export function ItemDetailScreen() {
  return (
    <Screen>
      <HeroBlock
        dayLabel="Item detail"
        title="Sign permission slip — Science Museum trip"
        subtitle="Evidence belongs on tap, not on the card."
        body="This route is the trust surface where parents review the source message and understand why Joli extracted an item."
      />

      <SurfaceCard>
        <SectionLabel>Source message preview</SectionLabel>
        <Text>
          Full message body and highlighted evidence snippet will live here in the dashboard task.
        </Text>
        <ChipButton>Mark done</ChipButton>
      </SurfaceCard>
    </Screen>
  );
}
