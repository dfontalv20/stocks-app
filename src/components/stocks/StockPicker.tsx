import { StyleSheet, TouchableOpacity, View, ViewProps } from "react-native";
import { TextField } from "../ui/TextField";
import { StocksList } from "./StocksList";
import { useDebounce } from "use-debounce";
import { StockRow } from "./StockRow";
import { Stock } from "@/api/stocks";
import { FC } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/use-theme";
import { Spacing } from "@/constants/theme";

export interface StockPickerProps extends ViewProps {
  value?: string;
  onSelect?: (stock: Stock) => void;
}

export const StockPicker: FC<StockPickerProps> = ({
  onSelect,
  value,
  style,
  ...props
}) => {
  const theme = useTheme();
  const [search, setSearch] = useDebounce("", 800);

  return (
    <View {...props} style={[styles.container, style]}>
      <TextField
        onChangeText={setSearch}
        placeholder={value || "Search stocks"}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <StocksList
        search={search}
        renderItem={({ item }) => {
          const isSelected = value === item.symbol;
          return (
            <TouchableOpacity
              style={[
                styles.item,
                {
                  backgroundColor: isSelected
                    ? theme.backgroundSelected
                    : theme.backgroundElement,
                },
              ]}
              onPress={() => onSelect?.(item)}
            >
              <StockRow style={styles.row} stock={item} />
              {isSelected && (
                <Ionicons name="checkmark" size={24} color={theme.text} />
              )}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: Spacing.three,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.three,
  },
  row: { backgroundColor: "transparent" },
});
