import {
  Pressable,
  Modal as NativeModal,
  ModalProps,
  StyleSheet,
  Dimensions,
} from "react-native";
import { ThemedView } from "./ThemedView";
import { ComponentProps, FC } from "react";
import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

export const Modal: FC<
  ModalProps & { contentStyle?: ComponentProps<typeof ThemedView>["style"] }
> = ({ children, contentStyle, ...props }) => {
  const theme = useTheme();
  const { height } = Dimensions.get("screen");
  return (
    <NativeModal animationType="slide" transparent {...props}>
      <Pressable style={styles.backdrop} onPress={props.onRequestClose}>
        <Pressable style={styles.modalCard}>
          <ThemedView
            style={[
              styles.modalContent,
              { borderColor: theme.backgroundSelected, maxHeight: height },
              contentStyle,
            ]}
          >
            {children}
          </ThemedView>
        </Pressable>
      </Pressable>
    </NativeModal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalCard: {
    backgroundColor: "transparent",
  },
  modalContent: {
    padding: Spacing.four,
    borderTopLeftRadius: Spacing.four,
    borderTopRightRadius: Spacing.four,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    gap: Spacing.three,
  },
  modalTitle: {
    textAlign: "center",
  },
});
