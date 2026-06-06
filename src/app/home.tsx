import { Redirect, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/ui/ThemedText";
import { ThemedView } from "@/components/ui/ThemedView";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { useAuth } from "@/hooks/use-auth";
import { Button, ButtonText } from "@/components/ui/Button";

export default function HomeScreen() {
  const router = useRouter();
  const { isAuthenticated, signOut } = useAuth();

  if (!isAuthenticated) return <Redirect href="/login" />;

  const handleSignOut = async () => {
    await signOut();
    router.replace("/login");
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="title" style={styles.title}>
          Welcome!
        </ThemedText>
        <ThemedText
          type="subtitle"
          themeColor="textSecondary"
          style={styles.subtitle}
        >
          You are signed in.
        </ThemedText>
        <Button onPress={handleSignOut}>
          <ButtonText>Sign out</ButtonText>
        </Button>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
  },
  safeArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
    gap: Spacing.three,
  },
  title: {
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
  },
});
