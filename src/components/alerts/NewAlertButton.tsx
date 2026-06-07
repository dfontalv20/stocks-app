import { StyleSheet } from "react-native";
import { ThemedText } from "../ui/ThemedText";
import { AlertForm } from "./AlertForm";
import { Spacing } from "@/constants/theme";
import { Button, ButtonText } from "../ui/Button";
import { ComponentProps, FC, useState } from "react";
import { Modal } from "../ui/Modal";

export interface NewAlertButtonProps extends ComponentProps<typeof Button> {
  onAlertCreated?: () => void;
}

export const NewAlertButton: FC<NewAlertButtonProps> = ({
  onAlertCreated,
  ...props
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <>
      <Button onPress={openModal} style={styles.newButton} {...props}>
        <ButtonText>+ New alert</ButtonText>
      </Button>
      <Modal visible={modalVisible} onRequestClose={closeModal}>
        <ThemedText type="subtitle" style={styles.modalTitle}>
          New alert
        </ThemedText>
        <AlertForm onSuccess={closeModal} onCancel={closeModal} />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalTitle: {
    textAlign: "center",
  },
  newButton: {
    alignSelf: "flex-start",
    paddingHorizontal: Spacing.four,
  },
});
