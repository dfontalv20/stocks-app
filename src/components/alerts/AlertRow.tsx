import { Alert } from "@/api/alerts";
import { ThemedView } from "../ui/ThemedView";
import { ThemedText } from "../ui/ThemedText";
import { ComponentProps, FC } from "react";
import { Spacing } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const AlertRow: FC<
  ComponentProps<typeof ThemedView> & { alert: Alert }
> = ({ alert, ...props }) => {
  return (
    <ThemedView
      type="backgroundElement"
      {...props}
      style={[styles.row, props.style]}
    >
      <ThemedText type="smallBold">{alert.stock}</ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        {`Target: $${alert.price.toFixed(2)}`}
      </ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        {alert.notifiedAt
          ? `Notified: ${new Date(alert.notifiedAt).toLocaleString()}`
          : "Not notified yet"}
      </ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  row: {
    padding: Spacing.three,
    borderRadius: Spacing.two,
    gap: Spacing.half,
  },
});
