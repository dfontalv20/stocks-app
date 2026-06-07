import { FC } from "react";
import { ThemedView } from "../ui/ThemedView";
import { ThemedText } from "../ui/ThemedText";
import { Spacing } from "@/constants/theme";
import { FlatList, FlatListProps, StyleSheet } from "react-native";
import { Separator } from "../ui/Separator";
import { useStocksQuery } from "@/hooks/use-stocks-query";
import { Loading } from "../ui/Loading";
import { StockRow } from "./StockRow";
import { Stock } from "@/api/stocks";
import { View } from "react-native";

export interface StocksListProps extends Omit<
  Partial<FlatListProps<Stock>>,
  "data"
> {
  search: string;
}

export const StocksList: FC<StocksListProps> = ({ search, ...props }) => {
  const { data, isLoading, error } = useStocksQuery({ search });
  if (!search)
    return (
      <View style={styles.centered}>
        <ThemedText>Enter a search term</ThemedText>
      </View>
    );
  if (isLoading) return <Loading />;
  if (error) {
    return (
      <View style={styles.centered}>
        <ThemedText>Failed to load stocks</ThemedText>
      </View>
    );
  }
  const stocks = data?.result ?? [];
  return (
    <FlatList
      keyExtractor={(item) => `${item.symbol}-${item.displaySymbol}`}
      renderItem={({ item }) => <StockRow stock={item} />}
      ListEmptyComponent={
        <ThemedText themeColor="textSecondary" style={styles.empty}>
          No stocks match your search
        </ThemedText>
      }
      ItemSeparatorComponent={Separator}
      {...props}
      contentContainerStyle={[styles.list, props.contentContainerStyle]}
      data={stocks}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.four,
    gap: Spacing.three,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  list: {
    paddingBottom: Spacing.four,
    gap: Spacing.two,
  },
  empty: {
    textAlign: "center",
    marginTop: Spacing.four,
  },
});
