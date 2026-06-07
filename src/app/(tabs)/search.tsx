import { ThemedView } from "@/components/ui/ThemedView";
import { TextField } from "@/components/ui/TextField";
import { Spacing } from "@/constants/theme";
import { useDebounce } from "use-debounce";
import { StocksList } from "@/components/stocks/StocksList";
import { StyleSheet } from "react-native";
import { StockSearchListItem } from "@/components/stocks/StockSearchListItem";
import { ThemedText } from "@/components/ui/ThemedText";

export default function SearchScreen() {
  const [search, setSearch] = useDebounce("", 800);
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Stocks</ThemedText>
      <TextField
        onChangeText={setSearch}
        placeholder="Search stocks"
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.input}
      />
      <StocksList
        search={search}
        renderItem={({ item }) => <StockSearchListItem stock={item} />}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.four,
    gap: Spacing.three,
  },
  input: {
    marginBottom: Spacing.four,
  },
});
