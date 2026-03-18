import type { PropsWithChildren } from "react";
import { Pressable, StyleSheet, Text, type PressableProps, type ViewStyle } from "react-native";
import { palette } from "@/src/lib/theme/palette";

type ChipButtonProps = PropsWithChildren<Omit<PressableProps, "style"> & {
  variant?: "primary" | "secondary";
  style?: ViewStyle;
}>;

export function ChipButton({ children, variant = "primary", style, ...props }: ChipButtonProps) {
  return (
    <Pressable
      style={[styles.base, variant === "primary" ? styles.primary : styles.secondary, style]}
      {...props}
    >
      <Text style={variant === "primary" ? styles.primaryText : styles.secondaryText}>
        {children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
  },
  primary: {
    backgroundColor: palette.accent,
  },
  secondary: {
    backgroundColor: palette.surfaceStrong,
    borderColor: palette.border,
    borderWidth: 1,
  },
  primaryText: {
    color: palette.accentText,
    fontSize: 13,
    fontWeight: "700",
  },
  secondaryText: {
    color: palette.foreground,
    fontSize: 13,
    fontWeight: "600",
  },
});
