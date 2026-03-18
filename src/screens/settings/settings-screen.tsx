import { Pressable, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { HeroBlock } from "@/src/components/layout/hero-block";
import { AppIcon } from "@/src/components/ui/app-icon";
import { AppearanceToggle } from "@/src/screens/settings/components/appearance-toggle";
import { LanguageSelector } from "@/src/screens/settings/components/language-selector";
import { SettingsRow } from "@/src/screens/settings/components/settings-row";
import { SettingsSection } from "@/src/screens/settings/components/settings-section";
import { useAppContext } from "@/src/lib/state/app-context";
import { usePalette } from "@/src/lib/theme/theme-context";

export function SettingsScreen() {
  const router = useRouter();
  const palette = usePalette();
  const { disconnectKlapp, klappConnectionStatus, klappEmail, sessionProfile, translation } = useAppContext();

  const isKlappConnected = klappConnectionStatus === "connected" || klappConnectionStatus === "syncing";
  const klappTitle = klappEmail ? `${translation.settings.klapp} (${klappEmail})` : translation.settings.klapp;
  const connectionMeta = klappConnectionStatus === "reconnect_required"
    ? translation.settings.reconnectRequired
    : isKlappConnected
      ? translation.settings.active
      : undefined;
  const connectionDescription = klappConnectionStatus === "reconnect_required"
    ? translation.settings.reconnectDescription
    : isKlappConnected
      ? translation.settings.connected
      : "";

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
              <AppIcon name="x" size={18} color={palette.foreground} />
            </Pressable>
          }
        />

        <SettingsSection title={translation.settings.account}>
          <SettingsRow
            title={sessionProfile?.email ?? "sarah@example.com"}
            description=""
          />
        </SettingsSection>

        <SettingsSection title={translation.settings.klapp}>
          <SettingsRow
            title={klappTitle}
            description={connectionDescription}
            meta={connectionMeta}
            trailing={
              isKlappConnected ? (
                <Pressable onPress={disconnectKlapp} hitSlop={8}>
                  <AppIcon name="log-out" size={16} color={palette.warning} />
                </Pressable>
              ) : undefined
            }
          />
        </SettingsSection>

        <SettingsSection title={translation.settings.preferences}>
          <SettingsRow
            title={translation.settings.appearance}
            description=""
            trailing={<AppearanceToggle />}
          />
          <SettingsRow
            title={translation.settings.language}
            description=""
            trailing={<LanguageSelector />}
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
});
