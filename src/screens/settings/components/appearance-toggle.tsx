import { Pressable, StyleSheet, View } from "react-native";
import { AppIcon } from "@/src/components/ui/app-icon";
import { useAppContext } from "@/src/lib/state/app-context";
import { usePalette, useTheme } from "@/src/lib/theme/theme-context";

export function AppearanceToggle() {
  const palette = usePalette();
  const { theme, setTheme } = useTheme();
  const { translation } = useAppContext();

  return (
    <View style={styles.themeOptions}>
      <Pressable
        accessibilityLabel={translation.settings.themeSystem}
        style={[
          styles.themeOption,
          { borderColor: palette.border, backgroundColor: theme === "system" ? palette.surfaceStrong : "transparent" },
        ]}
        onPress={() => setTheme("system")}
      >
        <AppIcon name="smartphone" size={14} color={palette.foreground} />
      </Pressable>
      <Pressable
        accessibilityLabel={translation.settings.themeLight}
        style={[
          styles.themeOption,
          { borderColor: palette.border, backgroundColor: theme === "light" ? palette.surfaceStrong : "transparent" },
        ]}
        onPress={() => setTheme("light")}
      >
        <AppIcon name="sun" size={14} color={palette.foreground} />
      </Pressable>
      <Pressable
        accessibilityLabel={translation.settings.themeDark}
        style={[
          styles.themeOption,
          { borderColor: palette.border, backgroundColor: theme === "dark" ? palette.surfaceStrong : "transparent" },
        ]}
        onPress={() => setTheme("dark")}
      >
        <AppIcon name="moon" size={14} color={palette.foreground} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  themeOptions: {
    flexDirection: "row",
    gap: 8,
  },
  themeOption: {
    borderWidth: 1,
    borderRadius: 999,
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
});
