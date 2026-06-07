import { Alert, deleteAlert } from "@/api/alerts";
import { ThemedView } from "../ui/ThemedView";
import { ThemedText } from "../ui/ThemedText";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ComponentProps, FC } from "react";
import { Spacing } from "@/constants/theme";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/use-theme";
import { showToast } from "@/lib/toast";
import { Loading } from "../ui/Loading";

export const AlertRow: FC<
  ComponentProps<typeof ThemedView> & { alert: Alert }
> = ({ alert, ...props }) => {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteAlert(alert.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alerts"] });
    },
    onError: (error) => {
      showToast("Failed to delete alert");
    },
  });
  return (
    <ThemedView
      type="backgroundElement"
      {...props}
      style={[styles.row, props.style]}
    >
      <ThemedView type="backgroundElement" style={styles.content}>
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
      <TouchableOpacity onPress={() => mutate()} disabled={isPending}>
        {isPending ? (
          <Loading />
        ) : (
          <Ionicons name="trash-bin-outline" size={24} color={theme.text} />
        )}
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.three,
    borderRadius: Spacing.two,
    gap: Spacing.three,
  },
  content: {
    flex: 1,
    gap: Spacing.half,
  },
  deleteButton: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: Spacing.two,
  },
});
