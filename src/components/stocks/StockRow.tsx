import { Stock } from "@/api/stocks";
import { Spacing } from "@/constants/theme";
import { ThemedView } from "../ui/ThemedView";
import { ThemedText } from "../ui/ThemedText";
import { StyleSheet, View } from "react-native";
import { ComponentProps, FC } from "react";

export const StockRow: FC<
  ComponentProps<typeof ThemedView> & { stock: Stock }
> = ({ stock, ...props }) => {
  return (
    <ThemedView
      type="backgroundElement"
      {...props}
      style={[styles.row, props.style]}
    >
      <View style={styles.rowContent}>
        <ThemedText type="smallBold" style={styles.name}>
          {stock.description}
        </ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {stock.displaySymbol}
        </ThemedText>
      </View>
      <ThemedText type="small" themeColor="textSecondary">
        {stock.type}
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
  name: {
    fontSize: 18,
  },
  rowContent: {
    gap: Spacing.two,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
