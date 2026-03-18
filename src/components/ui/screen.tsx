import type { PropsWithChildren } from "react";
import type { ScrollViewProps, StyleProp, ViewStyle } from "react-native";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { usePalette } from "@/src/lib/theme/theme-context";

type ScreenProps = PropsWithChildren<{
  scroll?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
  keyboardShouldPersistTaps?: ScrollViewProps["keyboardShouldPersistTaps"];
  automaticallyAdjustKeyboardInsets?: boolean;
  scrollRef?: React.RefObject<ScrollView | null>;
}>;

export function Screen({
  children,
  scroll = true,
  contentContainerStyle,
  keyboardShouldPersistTaps,
  automaticallyAdjustKeyboardInsets,
  scrollRef,
}: ScreenProps) {
  const palette = usePalette();

  if (!scroll) {
    return <SafeAreaView style={[styles.safeArea, { backgroundColor: palette.background }]}>{children}</SafeAreaView>;
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: palette.background }]}> 
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={[styles.content, contentContainerStyle]}
        keyboardShouldPersistTaps={keyboardShouldPersistTaps}
        automaticallyAdjustKeyboardInsets={automaticallyAdjustKeyboardInsets}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 48,
    gap: 18,
  },
});
