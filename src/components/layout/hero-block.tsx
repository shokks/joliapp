import type { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { palette } from "@/src/lib/theme/palette";

type HeroBlockProps = {
  dayLabel: string;
  title: string;
  subtitle: string;
  body: string;
  progress?: ReactNode;
};

export function HeroBlock({ dayLabel, title, subtitle, body, progress }: HeroBlockProps) {
  return (
    <View style={styles.hero}>
      <Text style={styles.dayLabel}>{dayLabel}</Text>
      {progress ? <View style={styles.progressSlot}>{progress}</View> : null}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <Text style={styles.bodyCopy}>{body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    gap: 12,
    paddingTop: 10,
    paddingBottom: 16,
  },
  dayLabel: {
    color: palette.muted,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 2.2,
    textTransform: "uppercase",
  },
  progressSlot: {
    marginTop: -2,
    marginBottom: 2,
  },
  title: {
    color: palette.foreground,
    fontSize: 35,
    lineHeight: 38,
    fontWeight: "700",
    letterSpacing: -1.4,
  },
  subtitle: {
    color: palette.accent,
    fontSize: 22,
    lineHeight: 27,
    fontWeight: "500",
    letterSpacing: -0.4,
  },
  bodyCopy: {
    color: palette.muted,
    fontSize: 15,
    lineHeight: 24,
    maxWidth: 340,
    marginTop: 4,
  },
});
