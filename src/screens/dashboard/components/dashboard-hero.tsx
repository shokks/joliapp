import { Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { HeroBlock } from "@/src/components/layout/hero-block";
import { usePalette } from "@/src/lib/theme/theme-context";

type DashboardHeroProps = {
  actionCount: number;
};

export function DashboardHero({ actionCount }: DashboardHeroProps) {
  const router = useRouter();
  const palette = usePalette();

  return (
    <HeroBlock
      dayLabel="Monday, March 17"
      title="Hi Sophié!"
      subtitle={`${actionCount} things need attention.`}
      body=""
      topAccessory={
        <Pressable style={styles.settingsLink} onPress={() => router.push("/settings")}>
          <Ionicons name="settings-outline" size={20} color={palette.foreground} style={styles.settingsIcon} />
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
  settingsIcon: {
    fontSize: 18,
    opacity: 0.72,
  },
});
