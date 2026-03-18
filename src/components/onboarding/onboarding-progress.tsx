import { StyleSheet, View } from "react-native";
import { usePalette } from "@/src/lib/theme/theme-context";

type OnboardingProgressProps = {
  activeStep: 1 | 2 | 3;
};

export function OnboardingProgress({ activeStep }: OnboardingProgressProps) {
  const palette = usePalette();

  return (
    <View style={styles.progressRail}>
      {[1, 2, 3].map((step) => (
        <View
          key={step}
          style={[
            styles.progressStep,
            { backgroundColor: step <= activeStep ? palette.accent : palette.surfaceStrong },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  progressRail: {
    flexDirection: "row",
    gap: 8,
  },
  progressStep: {
    height: 6,
    flex: 1,
    borderRadius: 999,
  },
});
