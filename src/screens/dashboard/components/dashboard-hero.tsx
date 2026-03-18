import { Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { HeroBlock } from "@/src/components/layout/hero-block";
import { AppIcon } from "@/src/components/ui/app-icon";
import { useAppContext } from "@/src/lib/state/app-context";
import { usePalette } from "@/src/lib/theme/theme-context";

type DashboardHeroProps = {
  actionCount: number;
};

export function DashboardHero({ actionCount }: DashboardHeroProps) {
  const router = useRouter();
  const palette = usePalette();
  const { translation } = useAppContext();
  const subtitle = actionCount === 0 ? translation.dashboard.attentionClear : `${actionCount} ${translation.dashboard.attentionCount}`;

  return (
    <HeroBlock
      dayLabel={translation.dashboard.dayLabel}
      title={translation.dashboard.greeting}
      subtitle={subtitle}
      body=""
      topAccessory={
        <Pressable style={styles.settingsLink} onPress={() => router.push("/settings")}>
          <AppIcon name="settings" size={18} color={palette.foreground} />
        </Pressable>
      }
    />
  );
}

const styles = StyleSheet.create({
  settingsLink: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
});
