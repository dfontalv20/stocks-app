import { useTheme } from "@/hooks/use-theme";
import { FC } from "react";
import { TextInput, TextInputProps } from "react-native";

export const TextField: FC<TextInputProps> = (props) => {
  const theme = useTheme();

  const inputStyle = [
    props.style,
    {
      backgroundColor: theme.backgroundElement,
      color: theme.text,
      borderColor: theme.backgroundSelected,
    },
  ];

  return (
    <TextInput
      placeholderTextColor={theme.textSecondary}
      {...props}
      style={[inputStyle, props.style]}
    />
  );
};
