import { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/ui/ThemedText";
import { ThemedView } from "@/components/ui/ThemedView";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { useAuth } from "@/hooks/use-auth";
import { TextField } from "@/components/ui/TextField";
import { Button, ButtonText } from "@/components/ui/Button";
import { Credentials, signUp } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { Loading } from "@/components/ui/Loading";
import { showToast } from "@/lib/toast";
import { getApiErrorMessage } from "@/lib/api";
import { getToken, getMessaging } from "@react-native-firebase/messaging";

type Mode = "login" | "register";

export default function LoginScreen() {
  const { signIn } = useAuth();
  const [mode, setMode] = useState<Mode>("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const isValid = username.length && password.length;

  const {
    mutateAsync: signInMutation,
    isPending: isSigningIn,
    error: signInError,
  } = useMutation({
    mutationFn: async (credentials: Credentials) =>
      signIn({ ...credentials, fcmToken: await getToken(getMessaging()) }),
  });

  const {
    mutateAsync: signUpMutation,
    isPending: isSigningUp,
    error: signUpError,
  } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      showToast("User created! Now you can sign in");
      setMode("login");
    },
  });

  const errorMessage = useMemo(() => {
    const err = signInError ?? signUpError;
    if (!err) return null;
    return getApiErrorMessage(err) ?? "Error authenticating";
  }, [signInError, signUpError]);

  const submitting = isSigningIn || isSigningUp;

  const isLogin = mode === "login";
  const title = isLogin ? "Sign in" : "Create account";

  const submitLabel = useMemo(() => {
    if (submitting) return <Loading />;
    return isLogin ? "Sign in" : "Create account";
  }, [submitting, isLogin]);

  const switchLabel = isLogin
    ? "Don't have an account? Create one"
    : "Already have an account? Sign in";

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        await signInMutation({ username, password });
      } else {
        await signUpMutation({ username, password });
      }
    } catch {}
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

          {errorMessage && (
            <View style={styles.errorBox}>
              <ThemedText type="small" themeColor="error">
                {Array.isArray(errorMessage)
                  ? errorMessage.map((m) => `- ${m}`).join("\n")
                  : errorMessage}
              </ThemedText>
            </View>
          )}

          <View style={styles.field}>
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
            />
          </View>

          <ThemedView type="background" style={styles.field}>
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
            />
          </ThemedView>

          <Button onPress={handleSubmit} disabled={submitting || !isValid}>
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
