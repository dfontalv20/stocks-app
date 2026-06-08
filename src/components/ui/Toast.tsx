import { Spacing } from "@/constants/theme";
import { ThemedText } from "@/components/ui/ThemedText";
import { ThemedView } from "@/components/ui/ThemedView";
import { useTheme } from "@/hooks/use-theme";
import { StyleSheet, View } from "react-native";
import {
  ToastConfig,
  ToastConfigParams,
  default as ToastProvider,
} from "react-native-toast-message";

const ACCENT_COLORS = {
  info: "#3c87f7",
  success: "#34c759",
  error: "#ff3b30",
  warn: "#ff9500",
} as const;

export function ToastCard({
  text1,
  text2,
  accent,
}: ToastConfigParams<unknown> & { accent: string }) {
  return (
    <ThemedView type="backgroundElement" style={styles.container}>
      <View style={[styles.accent, { backgroundColor: accent }]} />
      <View style={styles.content}>
        {text1 && (
          <ThemedText type="smallBold" themeColor="textSecondary">
            {text1}
          </ThemedText>
        )}
        {text2 && (
          <ThemedText type="small" themeColor="text">
            {text2}
          </ThemedText>
        )}
      </View>
    </ThemedView>
  );
}

const toastConfig: ToastConfig = {
  info: (p) => <ToastCard {...p} accent={ACCENT_COLORS.info} />,
  success: (p) => <ToastCard {...p} accent={ACCENT_COLORS.success} />,
  error: (p) => <ToastCard {...p} accent={ACCENT_COLORS.error} />,
  warn: (p) => <ToastCard {...p} accent={ACCENT_COLORS.warn} />,
};

export const Toast = () => <ToastProvider config={toastConfig} />;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: Spacing.three,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  accent: {
    width: 4,
  },
  content: {
    flex: 1,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.three,
    gap: Spacing.one,
  },
});
