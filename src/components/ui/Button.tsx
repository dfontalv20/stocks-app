import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { FC } from "react";
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  TextProps,
} from "react-native";

export const Button: FC<PressableProps> = ({ children, ...props }) => {
  const theme = useTheme();
  return (
    <Pressable
      {...props}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: theme.backgroundSelected,
          opacity: pressed || props.disabled ? 0.3 : 1,
        },
      ]}
    >
      {children}
    </Pressable>
  );
};

export const ButtonText: FC<TextProps> = ({ children, ...props }) => {
  const theme = useTheme();
  return (
    <Text
      {...props}
      style={[styles.buttonText, { color: theme.text }, props.style]}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.four,
    borderRadius: Spacing.three,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
