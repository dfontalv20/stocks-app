import { FC } from "react";
import { ThemedView } from "../ui/ThemedView";
import { ThemedText } from "../ui/ThemedText";
import { StyleSheet } from "react-native";
import { Spacing } from "@/constants/theme";

export const LegendDot: FC<{ color: string; label: string }> = ({
  color,
  label,
}) => (
  <ThemedView style={styles.legendItem}>
    <ThemedView style={[styles.dot, { backgroundColor: color }]} />
    <ThemedText type="small">{label}</ThemedText>
  </ThemedView>
);

const styles = StyleSheet.create({
  legend: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.three,
    justifyContent: "center",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.one,
    backgroundColor: "transparent",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
