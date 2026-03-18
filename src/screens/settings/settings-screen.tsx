import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { HeroBlock } from "@/src/components/layout/hero-block";
import { useAppContext, useThemePalette } from "@/src/lib/state/app-context";

export function SettingsScreen() {
  const router = useRouter();
  const palette = useThemePalette();
  const { theme, setTheme } = useAppContext();

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

        <View style={[styles.section, { borderTopColor: palette.border }]}> 
          <Text style={[styles.sectionLabel, { color: palette.muted }]}>Account</Text>
          <View style={[styles.row, { borderBottomColor: palette.border }]}> 
            <View style={styles.rowBody}>
              <Text style={[styles.rowTitle, { color: palette.foreground }]}>Joli account</Text>
              <Text style={[styles.rowCopy, { color: palette.muted }]}>sarah@example.com</Text>
            </View>
            <Text style={[styles.rowMeta, { color: palette.muted }]}>Beta</Text>
          </View>
        </View>

        <View style={[styles.section, { borderTopColor: palette.border }]}> 
          <Text style={[styles.sectionLabel, { color: palette.muted }]}>Klapp</Text>
          <View style={[styles.row, { borderBottomColor: palette.border }]}> 
            <View style={styles.rowBody}>
              <Text style={[styles.rowTitle, { color: palette.foreground }]}>Klapp</Text>
              <Text style={[styles.rowCopy, { color: palette.muted }]}>Connected</Text>
            </View>
            <Text style={[styles.rowMeta, { color: palette.muted }]}>Active</Text>
          </View>
        </View>

        <View style={[styles.section, { borderTopColor: palette.border }]}> 
          <Text style={[styles.sectionLabel, { color: palette.muted }]}>Preferences</Text>
          <View style={[styles.row, { borderBottomColor: palette.border }]}> 
            <View style={styles.rowBody}>
              <Text style={[styles.rowTitle, { color: palette.foreground }]}>Appearance</Text>
              <Text style={[styles.rowCopy, { color: palette.muted }]}>{theme === "light" ? "Light" : "Dark"}</Text>
            </View>
            <View style={styles.themeOptions}>
              <Pressable
                style={[
                  styles.themeOption,
                  { borderColor: palette.border, backgroundColor: theme === "light" ? palette.surfaceStrong : "transparent" },
                ]}
                onPress={() => setTheme("light")}
              >
                <Text style={[styles.themeOptionText, { color: palette.foreground }]}>Light</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.themeOption,
                  { borderColor: palette.border, backgroundColor: theme === "dark" ? palette.surfaceStrong : "transparent" },
                ]}
                onPress={() => setTheme("dark")}
              >
                <Text style={[styles.themeOptionText, { color: palette.foreground }]}>Dark</Text>
              </Pressable>
            </View>
          </View>
          <View style={[styles.row, { borderBottomColor: palette.border }]}> 
            <View style={styles.rowBody}>
              <Text style={[styles.rowTitle, { color: palette.foreground }]}>Language</Text>
              <Text style={[styles.rowCopy, { color: palette.muted }]}>Automatic</Text>
            </View>
            <Text style={[styles.rowMeta, { color: palette.muted }]}>EN</Text>
          </View>
          <View style={[styles.row, { borderBottomColor: palette.border }]}> 
            <View style={styles.rowBody}>
              <Text style={[styles.rowTitle, { color: palette.foreground }]}>Daily summary</Text>
              <Text style={[styles.rowCopy, { color: palette.muted }]}>7:00 AM</Text>
            </View>
            <Text style={[styles.rowMeta, { color: palette.muted }]}>On</Text>
          </View>
        </View>
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
  section: {
    paddingTop: 32,
    borderTopWidth: 1,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase",
    paddingBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  rowBody: {
    flex: 1,
    gap: 5,
  },
  rowTitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  rowCopy: {
    fontSize: 12,
    lineHeight: 18,
    opacity: 0.7,
  },
  rowMeta: {
    fontSize: 12,
    opacity: 0.6,
  },
  themeOptions: {
    flexDirection: "row",
    gap: 8,
  },
  themeOption: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  themeOptionText: {
    fontSize: 12,
    fontWeight: "600",
  },
});
