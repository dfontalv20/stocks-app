import { ThemedText } from "../ui/ThemedText";
import { TextField } from "../ui/TextField";
import { Button, ButtonText } from "../ui/Button";
import { Spacing } from "@/constants/theme";
import { createAlert, type CreateAlertDto } from "@/api/alerts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  Dimensions,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { getApiErrorMessage } from "@/lib/api";
import { StockPicker } from "../stocks/StockPicker";

type AlertFormProps = {
  onSuccess?: () => void;
  onCancel?: () => void;
};

export const AlertForm: FC<AlertFormProps> = ({ onSuccess, onCancel }) => {
  const queryClient = useQueryClient();

  const { height } = Dimensions.get("screen");
  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
    setError,
  } = useForm<Pick<CreateAlertDto, "stock"> & { price: string }>({
    defaultValues: {
      stock: "",
      price: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: CreateAlertDto) => createAlert(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alerts"] });
      onSuccess?.();
    },
    onError: (error) => {
      let message = getApiErrorMessage(error);
      if (Array.isArray(message)) message = message[0];
      setError("root", { message: message ?? "Error creating stock alert" });
    },
  });

  const errorMessage = (errors.root || errors.stock || errors.price)?.message;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <View style={styles.field}>
        <Controller
          control={control}
          name="stock"
          rules={{ required: "Must select a stock" }}
          render={({ field }) => (
            <>
              <ThemedText type="smallBold" style={styles.label}>
                Stock symbol{" "}
                {field.value && (
                  <ThemedText type="smallBold" themeColor="textSecondary">
                    (Selected: {field.value})
                  </ThemedText>
                )}
              </ThemedText>
              <StockPicker
                onSelect={(stock) => {
                  field.onChange(stock.symbol);
                }}
                value={field.value}
                style={{ height: height * 0.3 }}
              />
            </>
          )}
        />
      </View>

      <View style={styles.field}>
        <ThemedText type="smallBold" style={styles.label}>
          Target price
        </ThemedText>
        <Controller
          control={control}
          name="price"
          rules={{
            required: "Price is required",
            pattern: { value: /^\d*\.?\d{0,2}$/, message: "Invalid price" },
            min: { value: 1, message: "Price must be greater than 1" },
          }}
          render={({ field }) => (
            <TextField
              value={field.value + ""}
              onChangeText={(text) => {
                if (/^\d*\.?\d{0,2}?$/.test(text)) field.onChange(text);
              }}
              inputMode="decimal"
              placeholder="0.00"
              keyboardType="decimal-pad"
              autoCorrect={false}
              autoComplete="off"
              editable={!isPending}
            />
          )}
        />
      </View>

      {errorMessage && (
        <ThemedText type="small" themeColor="error" style={styles.error}>
          {errorMessage}
        </ThemedText>
      )}

      <Button
        disabled={isPending || !isValid}
        onPress={handleSubmit((values) =>
          mutate({ ...values, price: parseFloat(values.price) }),
        )}
      >
        <ButtonText>{isPending ? "Creating..." : "Create alert"}</ButtonText>
      </Button>

      {onCancel && (
        <Button onPress={onCancel} disabled={isPending} style={styles.cancel}>
          <ButtonText>Cancel</ButtonText>
        </Button>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: Spacing.three,
  },
  field: {
    gap: Spacing.one,
    borderRadius: Spacing.three,
  },
  label: {
    marginBottom: Spacing.half,
  },
  error: {
    color: "#c0392b",
  },
  cancel: {
    backgroundColor: "transparent",
  },
});
