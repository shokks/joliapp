import { Pressable, StyleSheet, Text, View } from "react-native";
import { usePalette, useTheme } from "@/src/lib/theme/theme-context";

export function AppearanceToggle() {
  const palette = usePalette();
  const { theme, setTheme } = useTheme();

  return (
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
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  themeOptionText: {
    fontSize: 12,
    fontWeight: "600",
  },
});
