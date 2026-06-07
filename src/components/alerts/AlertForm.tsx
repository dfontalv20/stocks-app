import { ThemedText } from "../ui/ThemedText";
import { ThemedView } from "../ui/ThemedView";
import { TextField } from "../ui/TextField";
import { Button, ButtonText } from "../ui/Button";
import { Spacing } from "@/constants/theme";
import { createAlert, type CreateAlertDto } from "@/api/alerts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { getApiErrorMessage } from "@/lib/api";

type AlertFormProps = {
  onSuccess?: () => void;
  onCancel?: () => void;
};

export const AlertForm: FC<AlertFormProps> = ({ onSuccess, onCancel }) => {
  const queryClient = useQueryClient();
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
      <ThemedView type="backgroundElement" style={styles.field}>
        <ThemedText type="smallBold" style={styles.label}>
          Stock symbol
        </ThemedText>
        <Controller
          control={control}
          name="stock"
          rules={{ required: "Must select a stock" }}
          render={({ field }) => (
            <TextField
              value={field.value}
              onChangeText={field.onChange}
              placeholder="e.g. AAPL"
              autoCapitalize="characters"
              autoCorrect={false}
              autoComplete="off"
              editable={!isPending}
            />
          )}
        />
      </ThemedView>

      <ThemedView type="backgroundElement" style={styles.field}>
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
      </ThemedView>

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
    padding: Spacing.three,
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
