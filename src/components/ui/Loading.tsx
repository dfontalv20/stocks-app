import { useTheme } from "@/hooks/use-theme";
import { FC } from "react";
import { ActivityIndicator, StyleSheet, View, ViewProps } from "react-native";

export const Loading: FC<ViewProps> = ({ style, ...props }) => {
  const theme = useTheme();
  return (
    <View {...props} style={[styles.container, style]}>
      <ActivityIndicator color={theme.text} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
