import type { PropsWithChildren } from "react";
import { Pressable, StyleSheet, Text, type PressableProps, type ViewStyle } from "react-native";
import { useThemePalette } from "@/src/lib/state/app-context";

type ChipButtonProps = PropsWithChildren<Omit<PressableProps, "style"> & {
  variant?: "primary" | "secondary" | "ghost";
  style?: ViewStyle;
}>;

export function ChipButton({ children, variant = "primary", style, ...props }: ChipButtonProps) {
  const isPrimary = variant === "primary";
  const palette = useThemePalette();

  return (
    <Pressable
      style={[
        styles.base,
        isPrimary
          ? [styles.primary, { backgroundColor: palette.accent }]
          : variant === "secondary"
            ? [styles.secondary, { backgroundColor: palette.surfaceStrong, borderColor: palette.border }]
            : styles.ghost,
        style,
      ]}
      {...props}
    >
      <Text
        style={
          isPrimary
            ? [styles.primaryText, { color: palette.accentText }]
            : variant === "secondary"
              ? [styles.secondaryText, { color: palette.foreground }]
              : [styles.ghostText, { color: palette.foreground }]
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
  },
  secondary: {
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
    fontSize: 14,
    fontWeight: "700",
  },
  secondaryText: {
    fontSize: 14,
    fontWeight: "600",
  },
  ghostText: {
    fontSize: 14,
    fontWeight: "600",
  },
});
