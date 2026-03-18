import { Pressable, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { HeroBlock } from "@/src/components/layout/hero-block";
import { AppearanceToggle } from "@/src/screens/settings/components/appearance-toggle";
import { SettingsRow } from "@/src/screens/settings/components/settings-row";
import { SettingsSection } from "@/src/screens/settings/components/settings-section";
import { useAppContext } from "@/src/lib/state/app-context";
import { usePalette, useTheme } from "@/src/lib/theme/theme-context";

export function SettingsScreen() {
  const router = useRouter();
  const palette = usePalette();
  const { theme } = useTheme();
  const { klappConnectionStatus, locale, localeSource, sessionProfile, translation } = useAppContext();

  const connectionMeta = klappConnectionStatus === "reconnect_required"
    ? translation.settings.reconnectRequired
    : translation.settings.active;
  const connectionDescription = klappConnectionStatus === "reconnect_required"
    ? translation.settings.reconnectDescription
    : translation.settings.connected;
  const languageDescription = localeSource === "device"
    ? translation.settings.automatic
    : locale === "de"
      ? translation.settings.german
      : translation.settings.english;
  const languageMeta = locale === "de" ? translation.settings.german : translation.settings.english;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: palette.background }]}> 
      <ScrollView contentContainerStyle={styles.content}>
        <HeroBlock
          dayLabel={translation.settings.title}
          title={translation.settings.title}
          subtitle={translation.settings.subtitle}
          body=""
          topAccessory={
            <Pressable style={styles.closeLink} onPress={() => router.back()}>
              <Ionicons name="close" size={20} color={palette.foreground} style={styles.closeIcon} />
            </Pressable>
          }
        />

        <SettingsSection title={translation.settings.account}>
          <SettingsRow
            title={translation.settings.joliAccount}
            description={sessionProfile?.email ?? "sarah@example.com"}
            meta={translation.settings.beta}
          />
        </SettingsSection>

        <SettingsSection title={translation.settings.klapp}>
          <SettingsRow title={translation.settings.klapp} description={connectionDescription} meta={connectionMeta} />
        </SettingsSection>

        <SettingsSection title={translation.settings.preferences}>
          <SettingsRow
            title={translation.settings.appearance}
            description={theme === "light" ? "Light" : "Dark"}
            trailing={<AppearanceToggle />}
          />
          <SettingsRow
            title={translation.settings.language}
            description={languageDescription}
            meta={languageMeta}
          />
          <SettingsRow
            title={translation.settings.connectionState}
            description={connectionDescription}
            meta={connectionMeta}
          />
          <SettingsRow
            title={translation.settings.futurePreferences}
            description={translation.settings.futurePreferencesBody}
          />
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
