import type { PropsWithChildren } from "react";
import { Pressable, StyleSheet, Text, type PressableProps, type ViewStyle } from "react-native";
import { palette } from "@/src/lib/theme/palette";

type ChipButtonProps = PropsWithChildren<Omit<PressableProps, "style"> & {
  variant?: "primary" | "secondary" | "ghost";
  style?: ViewStyle;
}>;

export function ChipButton({ children, variant = "primary", style, ...props }: ChipButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <Pressable
      style={[
        styles.base,
        isPrimary ? styles.primary : variant === "secondary" ? styles.secondary : styles.ghost,
        style,
      ]}
      {...props}
    >
      <Text
        style={
          isPrimary ? styles.primaryText : variant === "secondary" ? styles.secondaryText : styles.ghostText
        }
      >
        {children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  primary: {
    backgroundColor: palette.accent,
  },
  secondary: {
    backgroundColor: palette.surfaceStrong,
    borderColor: palette.border,
    borderWidth: 1,
  },
  ghost: {
    backgroundColor: "transparent",
    borderWidth: 0,
    borderRadius: 0,
    paddingHorizontal: 0,
    alignItems: "flex-start",
  },
  primaryText: {
    color: palette.accentText,
    fontSize: 14,
    fontWeight: "700",
  },
  secondaryText: {
    color: palette.foreground,
    fontSize: 14,
    fontWeight: "600",
  },
  ghostText: {
    color: palette.foreground,
    fontSize: 14,
    fontWeight: "600",
  },
});
