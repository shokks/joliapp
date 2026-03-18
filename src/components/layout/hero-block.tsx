import type { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useThemePalette } from "@/src/lib/state/app-context";

type HeroBlockProps = {
  dayLabel: string;
  title: string;
  subtitle: string;
  body: string;
  progress?: ReactNode;
  topAccessory?: ReactNode;
};

export function HeroBlock({ dayLabel, title, subtitle, body, progress, topAccessory }: HeroBlockProps) {
  const palette = useThemePalette();

  return (
    <View style={styles.hero}>
      <View style={styles.topRow}>
        <Text style={[styles.dayLabel, { color: palette.muted }]}>{dayLabel}</Text>
        {topAccessory ? <View style={styles.topAccessory}>{topAccessory}</View> : null}
      </View>
      {progress ? <View style={styles.progressSlot}>{progress}</View> : null}
      <Text style={[styles.title, { color: palette.foreground }]}>{title}</Text>
      <Text style={[styles.subtitle, { color: palette.accent }]}>{subtitle}</Text>
      <Text style={[styles.bodyCopy, { color: palette.muted }]}>{body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    gap: 12,
    paddingTop: 10,
    paddingBottom: 16,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  dayLabel: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 2.2,
    textTransform: "uppercase",
  },
  topAccessory: {
    marginRight: -8,
  },
  progressSlot: {
    marginTop: -2,
    marginBottom: 2,
  },
  title: {
    fontSize: 35,
    lineHeight: 38,
    fontWeight: "700",
    letterSpacing: -1.4,
  },
  subtitle: {
    fontSize: 22,
    lineHeight: 27,
    fontWeight: "500",
    letterSpacing: -0.4,
  },
  bodyCopy: {
    fontSize: 15,
    lineHeight: 24,
    maxWidth: 340,
    marginTop: 4,
  },
});
