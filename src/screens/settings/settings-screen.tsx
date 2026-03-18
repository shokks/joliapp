import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { HeroBlock } from "@/src/components/layout/hero-block";
import { AppearanceToggle } from "@/src/screens/settings/components/appearance-toggle";
import { SettingsRow } from "@/src/screens/settings/components/settings-row";
import { SettingsSection } from "@/src/screens/settings/components/settings-section";
import { usePalette, useTheme } from "@/src/lib/theme/theme-context";

export function SettingsScreen() {
  const router = useRouter();
  const palette = usePalette();
  const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: palette.background }]}> 
      <ScrollView contentContainerStyle={styles.content}>
        <HeroBlock
          dayLabel="Settings"
          title="Settings"
          subtitle="Your Joli setup."
          body=""
          topAccessory={
            <Pressable style={styles.closeLink} onPress={() => router.back()}>
              <Ionicons name="close" size={20} color={palette.foreground} style={styles.closeIcon} />
            </Pressable>
          }
        />

        <SettingsSection title="Account">
          <SettingsRow title="Joli account" description="sarah@example.com" meta="Beta" />
        </SettingsSection>

        <SettingsSection title="Klapp">
          <SettingsRow title="Klapp" description="Connected" meta="Active" />
        </SettingsSection>

        <SettingsSection title="Preferences">
          <SettingsRow
            title="Appearance"
            description={theme === "light" ? "Light" : "Dark"}
            trailing={<AppearanceToggle />}
          />
          <SettingsRow title="Language" description="Automatic" meta="EN" />
          <SettingsRow title="Daily summary" description="7:00 AM" meta="On" />
        </SettingsSection>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 48,
  },
  closeLink: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  closeIcon: {
    fontSize: 18,
    opacity: 0.72,
  },
});
