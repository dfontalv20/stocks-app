import { ThemedText } from "@/components/ui/ThemedText";
import { ThemedView } from "@/components/ui/ThemedView";
import { TextField } from "@/components/ui/TextField";
import { Loading } from "@/components/ui/Loading";
import { Separator } from "@/components/ui/Separator";
import { Spacing } from "@/constants/theme";
import { getStocks } from "@/api/stocks";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { FlatList, StyleSheet } from "react-native";
import { StockRow } from "@/components/stocks/StockRow";

export default function SearchScreen() {
  const [search, setSearch] = useDebounce("", 800);
  const { data, isLoading, error } = useQuery({
    queryKey: ["stocks", { search }],
    queryFn: () => getStocks({ search }),
  });

  const renderStocks = () => {
    if (!search)
      return (
        <ThemedView style={styles.centered}>
          <ThemedText>Enter a search term</ThemedText>
        </ThemedView>
      );
    if (isLoading) return <Loading />;
    if (error) {
      return (
        <ThemedView style={styles.centered}>
          <ThemedText>Failed to load stocks</ThemedText>
        </ThemedView>
      );
    }
    const stocks = data?.result ?? [];
    return (
      <FlatList
        data={stocks}
        keyExtractor={(item) => item.symbol}
        renderItem={({ item }) => <StockRow stock={item} />}
        ListEmptyComponent={
          <ThemedText themeColor="textSecondary" style={styles.empty}>
            No stocks match your search
          </ThemedText>
        }
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={Separator}
      />
    );
  };

  return (
    <ThemedView style={styles.container}>
      <TextField
        onChangeText={setSearch}
        placeholder="Search stocks"
        autoCapitalize="none"
        autoCorrect={false}
      />
      {renderStocks()}
    </ThemedView>
  );
}

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
  },
  empty: {
    textAlign: "center",
    marginTop: Spacing.four,
  },
});
