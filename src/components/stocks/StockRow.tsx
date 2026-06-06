import { Stock } from "@/api/stocks";
import { Spacing } from "@/constants/theme";
import { ThemedView } from "../ui/ThemedView";
import { ThemedText } from "../ui/ThemedText";
import { StyleSheet } from "react-native";
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
      <ThemedText type="smallBold">{stock.displaySymbol}</ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        {stock.description}
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
