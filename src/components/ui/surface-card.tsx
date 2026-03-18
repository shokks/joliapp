import type { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { usePalette } from "@/src/lib/theme/theme-context";

type SurfaceCardProps = PropsWithChildren<{
  grow?: boolean;
}>;

export function SurfaceCard({ children, grow = false }: SurfaceCardProps) {
  const palette = usePalette();

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: palette.surface, borderColor: palette.border },
        grow && styles.grow,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 28,
    borderWidth: 1,
    padding: 18,
    gap: 4,
  },
  grow: {
    flex: 1,
  },
});
