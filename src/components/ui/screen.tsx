import type { PropsWithChildren } from "react";
import type { ScrollViewProps, StyleProp, ViewStyle } from "react-native";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { palette } from "@/src/lib/theme/palette";

type ScreenProps = PropsWithChildren<{
  scroll?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
  keyboardShouldPersistTaps?: ScrollViewProps["keyboardShouldPersistTaps"];
}>;

export function Screen({
  children,
  scroll = true,
  contentContainerStyle,
  keyboardShouldPersistTaps,
}: ScreenProps) {
  if (!scroll) {
    return <SafeAreaView style={styles.safeArea}>{children}</SafeAreaView>;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={[styles.content, contentContainerStyle]}
        keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.background,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 48,
    gap: 18,
  },
});
