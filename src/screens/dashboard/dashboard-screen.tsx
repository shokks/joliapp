import { Text, View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { HeroBlock } from "@/src/components/layout/hero-block";
import { ChipButton } from "@/src/components/ui/chip-button";
import { Screen } from "@/src/components/ui/screen";
import { SectionLabel } from "@/src/components/ui/section-label";
import { SurfaceCard } from "@/src/components/ui/surface-card";
import { palette } from "@/src/lib/theme/palette";

const actionItems = [
  "Sign permission slip — Science Museum trip",
  "RSVP for Maya's birthday party",
  "Confirm annual checkup with Dr. Patel",
];

export function DashboardScreen() {
  const router = useRouter();

  return (
    <Screen>
      <HeroBlock
        dayLabel="Monday, March 17"
        title="Good morning, Sarah."
        subtitle="3 things need your attention."
        body="Joli keeps the dashboard focused on action, coming up, and what has already been taken care of."
      />

      <SurfaceCard>
        <SectionLabel>Needs your attention</SectionLabel>
        {actionItems.map((item) => (
          <View key={item} style={styles.row}>
            <Text style={styles.itemTitle}>{item}</Text>
            <ChipButton variant="secondary" onPress={() => router.push("/item/preview")}>
              Open detail
            </ChipButton>
          </View>
        ))}
      </SurfaceCard>

      <View style={styles.bottomGrid}>
        <SurfaceCard grow>
          <SectionLabel>Coming up</SectionLabel>
          <Text style={styles.copy}>Upcoming FYI items will render here.</Text>
        </SurfaceCard>

        <SurfaceCard grow>
          <SectionLabel>Taken care of</SectionLabel>
          <Text style={styles.copy}>Completed action items will render here.</Text>
        </SurfaceCard>
      </View>

      <ChipButton variant="secondary" onPress={() => router.push("/settings")}>
        Open settings
      </ChipButton>
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: {
    borderBottomWidth: 1,
    borderBottomColor: palette.border,
    paddingVertical: 14,
    gap: 10,
  },
  itemTitle: {
    color: palette.foreground,
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "600",
  },
  bottomGrid: {
    gap: 18,
  },
  copy: {
    color: palette.muted,
    fontSize: 14,
    lineHeight: 21,
  },
});
