import type { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { palette } from "@/src/lib/theme/palette";

type SurfaceCardProps = PropsWithChildren<{
  grow?: boolean;
}>;

export function SurfaceCard({ children, grow = false }: SurfaceCardProps) {
  return <View style={[styles.card, grow && styles.grow]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: palette.surface,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: palette.border,
    padding: 18,
    gap: 4,
  },
  grow: {
    flex: 1,
  },
});
