import { ThemedText } from "@/components/ui/ThemedText";
import { ThemedView } from "@/components/ui/ThemedView";
import { Loading } from "@/components/ui/Loading";
import { Spacing } from "@/constants/theme";
import { getAlerts } from "@/api/alerts";
import { useQuery } from "@tanstack/react-query";
import { FlatList, StyleSheet } from "react-native";
import { AlertRow } from "@/components/alerts/AlertRow";

export default function AlertsScreen() {
  const { data, isLoading, error, refetch, isRefetching } = useQuery({
    queryKey: ["alerts"],
    queryFn: getAlerts,
  });

  if (isLoading) return <Loading />;
  if (error) {
    return (
      <ThemedView style={styles.centered}>
        <ThemedText>Failed to load alerts</ThemedText>
      </ThemedView>
    );
  }

  const alerts = data ?? [];

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={alerts}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <AlertRow alert={item} />}
        ListEmptyComponent={
          <ThemedText themeColor="textSecondary" style={styles.empty}>
            You have no alerts yet.
          </ThemedText>
        }
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <ThemedView style={styles.separator} />}
        refreshing={isRefetching}
        onRefresh={refetch}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.four,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    paddingBottom: Spacing.four,
  },
  separator: {
    height: Spacing.two,
    backgroundColor: "transparent",
  },
  empty: {
    textAlign: "center",
    marginTop: Spacing.four,
  },
});
