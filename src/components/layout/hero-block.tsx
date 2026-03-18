import { StyleSheet, Text, View } from "react-native";
import { palette } from "@/src/lib/theme/palette";

type HeroBlockProps = {
  dayLabel: string;
  title: string;
  subtitle: string;
  body: string;
};

export function HeroBlock({ dayLabel, title, subtitle, body }: HeroBlockProps) {
  return (
    <View style={styles.hero}>
      <Text style={styles.dayLabel}>{dayLabel}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <Text style={styles.bodyCopy}>{body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    gap: 10,
    paddingTop: 8,
    paddingBottom: 8,
  },
  dayLabel: {
    color: palette.muted,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 2.2,
    textTransform: "uppercase",
  },
  title: {
    color: palette.foreground,
    fontSize: 34,
    lineHeight: 36,
    fontWeight: "700",
    letterSpacing: -1.2,
  },
  subtitle: {
    color: palette.accent,
    fontSize: 24,
    lineHeight: 28,
    fontWeight: "600",
    letterSpacing: -0.6,
  },
  bodyCopy: {
    color: palette.muted,
    fontSize: 15,
    lineHeight: 23,
    maxWidth: 520,
  },
});
