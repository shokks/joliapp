import { Pressable, StyleSheet, Text, View } from "react-native";
import { useAppContext } from "@/src/lib/state/app-context";
import { usePalette } from "@/src/lib/theme/theme-context";

export function LanguageSelector() {
  const palette = usePalette();
  const { locale, setLocale } = useAppContext();

  return (
    <View style={styles.group}>
      <View style={[styles.segmentedControl, { borderColor: palette.border }]}>
        <Pressable
          style={[styles.segment, locale === "en" && { backgroundColor: palette.surface }]}
          onPress={() => setLocale("en")}
        >
          <Text style={[styles.segmentLabel, { color: locale === "en" ? palette.foreground : palette.muted }]}>EN</Text>
        </Pressable>
        <Pressable
          style={[styles.segment, locale === "de" && { backgroundColor: palette.surface }]}
          onPress={() => setLocale("de")}
        >
          <Text style={[styles.segmentLabel, { color: locale === "de" ? palette.foreground : palette.muted }]}>DE</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    alignItems: "flex-end",
  },
  segmentedControl: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 999,
    overflow: "hidden",
  },
  segment: {
    minWidth: 44,
    minHeight: 32,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  segmentLabel: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600",
    letterSpacing: 0.4,
  },
});
