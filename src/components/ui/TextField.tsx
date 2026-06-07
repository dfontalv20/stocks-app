import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { FC } from "react";
import { TextInput, TextInputProps } from "react-native";

export const TextField: FC<TextInputProps> = (props) => {
  const theme = useTheme();

  const inputStyle = {
    backgroundColor: theme.backgroundElement,
    color: theme.text,
    borderColor: theme.backgroundSelected,
    borderRadius: 12,
    borderWidth: 2,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
  };

  return (
    <TextInput
      placeholderTextColor={theme.textSecondary}
      {...props}
      style={[inputStyle, props.style]}
    />
  );
};
