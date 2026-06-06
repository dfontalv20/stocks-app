import { ThemedView } from "./ThemedView";
import { Spacing } from "@/constants/theme";
import { StyleSheet } from "react-native";
import { ComponentProps, FC } from "react";

export const Separator: FC<ComponentProps<typeof ThemedView>> = (props) => {
  return <ThemedView {...props} style={[styles.separator, props.style]} />;
};

const styles = StyleSheet.create({
  separator: {
    height: Spacing.two,
    backgroundColor: "transparent",
  },
});
