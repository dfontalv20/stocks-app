import { useTheme } from "@/hooks/use-theme";
import { useQuery } from "@tanstack/react-query";
import { ReactNode } from "react";
import { ThemedView } from "./ui/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "./ui/ThemedText";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Spacing } from "@/constants/theme";
import { getUser } from "@/api/auth";
import { useAuth } from "@/hooks/use-auth";

export const Header = (): ReactNode => {
  const theme = useTheme();
  const { signOut } = useAuth();
  const { data: user } = useQuery({ queryKey: ["user"], queryFn: getUser });
  return (
    <ThemedView>
      <SafeAreaView style={styles.container}>
        <View style={styles.user}>
          <Ionicons name="person" size={24} color={theme.text} />
          <ThemedText>{user?.username}</ThemedText>
        </View>
        <TouchableOpacity onPress={signOut}>
          <Ionicons name="log-out-outline" size={24} color={theme.text} />
        </TouchableOpacity>
      </SafeAreaView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: Spacing.four,
    justifyContent: "space-between",
    alignItems: "center",
  },
  user: {
    gap: Spacing.two,
    flexDirection: "row",
    alignItems: "center",
  },
});
