import { Redirect, useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/ui/ThemedText";
import { ThemedView } from "@/components/ui/ThemedView";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { useAuth } from "@/hooks/use-auth";
import { useTheme } from "@/hooks/use-theme";
import { TextField } from "@/components/ui/TextField";
import { Button, ButtonText } from "@/components/ui/Button";

type Mode = "login" | "register";

export default function LoginScreen() {
  const router = useRouter();
  const { isAuthenticated, signIn, signUp } = useAuth();
  const [mode, setMode] = useState<Mode>("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (isAuthenticated) return <Redirect href="/home" />;

  const isLogin = mode === "login";
  const title = isLogin ? "Sign in" : "Create account";
  const submitLabel = submitting
    ? "..."
    : isLogin
      ? "Sign in"
      : "Create account";
  const switchLabel = isLogin
    ? "Don't have an account? Create one"
    : "Already have an account? Sign in";

  const handleSubmit = async () => {
    setError(null);
    setSubmitting(true);
    try {
      if (isLogin) {
        await signIn({ username, password });
      } else {
        await signUp({ username, password });
      }
      router.replace("/home");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Authentication failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.form}
        >
          <ThemedText type="title" style={styles.title}>
            {title}
          </ThemedText>

          {error && (
            <ThemedView type="backgroundElement" style={styles.errorBox}>
              <ThemedText type="small" themeColor="textSecondary">
                {error}
              </ThemedText>
            </ThemedView>
          )}

          <ThemedView type="backgroundElement" style={styles.field}>
            <ThemedText type="smallBold" style={styles.label}>
              Username
            </ThemedText>
            <TextField
              value={username}
              onChangeText={setUsername}
              placeholder="Enter your username"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="username"
              editable={!submitting}
            />
          </ThemedView>

          <ThemedView type="backgroundElement" style={styles.field}>
            <ThemedText type="smallBold" style={styles.label}>
              Password
            </ThemedText>
            <TextField
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete={isLogin ? "current-password" : "new-password"}
              editable={!submitting}
            />
          </ThemedView>

          <Button onPress={handleSubmit} disabled={submitting}>
            <ButtonText>{submitLabel}</ButtonText>
          </Button>

          <Pressable
            onPress={() => setMode(isLogin ? "register" : "login")}
            disabled={submitting}
            style={styles.switch}
          >
            <ThemedText type="link" themeColor="textSecondary">
              {switchLabel}
            </ThemedText>
          </Pressable>
        </KeyboardAvoidingView>
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
    paddingHorizontal: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  form: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "center",
    gap: Spacing.three,
  },
  title: {
    textAlign: "center",
    marginBottom: Spacing.four,
  },
  field: {
    gap: Spacing.one,
    padding: Spacing.three,
    borderRadius: Spacing.three,
  },
  label: {
    marginBottom: Spacing.half,
  },
  errorBox: {
    padding: Spacing.three,
    borderRadius: Spacing.two,
  },
  switch: {
    alignItems: "center",
    marginTop: Spacing.two,
  },
});
