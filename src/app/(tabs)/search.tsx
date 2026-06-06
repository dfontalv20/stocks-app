import { ThemedText } from "@/components/ui/ThemedText";
import { ThemedView } from "@/components/ui/ThemedView";
import { Spacing } from "@/constants/theme";
import { StyleSheet } from "react-native";

export default function SearchScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText>Search</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.four,
  },
});
