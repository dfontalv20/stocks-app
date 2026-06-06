import { Modal, Pressable, StyleSheet } from "react-native";
import { ThemedView } from "../ui/ThemedView";
import { ThemedText } from "../ui/ThemedText";
import { AlertForm } from "./AlertForm";
import { Spacing } from "@/constants/theme";
import { Button, ButtonText } from "../ui/Button";
import { ComponentProps, FC, useState } from "react";
import { useTheme } from "@/hooks/use-theme";

export interface NewAlertButtonProps extends ComponentProps<typeof Button> {
  onAlertCreated?: () => void;
}

export const NewAlertButton: FC<NewAlertButtonProps> = ({
  onAlertCreated,
  ...props
}) => {
  const theme = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <>
      <Button onPress={openModal} style={styles.newButton} {...props}>
        <ButtonText>+ New alert</ButtonText>
      </Button>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={closeModal}
      >
        <Pressable style={styles.backdrop} onPress={closeModal}>
          <Pressable style={styles.modalCard}>
            <ThemedView
              style={[
                styles.modalContent,
                { borderColor: theme.backgroundSelected },
              ]}
            >
              <ThemedText type="subtitle" style={styles.modalTitle}>
                New alert
              </ThemedText>
              <AlertForm onSuccess={closeModal} onCancel={closeModal} />
            </ThemedView>
          </Pressable>
        </Pressable>
      </Modal>
    </>
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
  newButton: {
    alignSelf: "flex-start",
    paddingHorizontal: Spacing.four,
  },
});

export default NewAlertButton;
