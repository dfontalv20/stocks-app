import { ThemedText } from "@/components/ui/ThemedText";
import { ThemedView } from "@/components/ui/ThemedView";
import { Loading } from "@/components/ui/Loading";
import { Spacing } from "@/constants/theme";
import { getAlerts } from "@/api/alerts";
import { useQuery } from "@tanstack/react-query";
import { FlatList, StyleSheet } from "react-native";
import { NewAlertButton } from "@/components/alerts/NewAlertButton";
import { AlertRow } from "@/components/alerts/AlertRow";
import { Separator } from "@/components/ui/Separator";

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
      <ThemedText type="title">Alerts</ThemedText>
      <NewAlertButton onAlertCreated={refetch} />
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
        ItemSeparatorComponent={Separator}
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
