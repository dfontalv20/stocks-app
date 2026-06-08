import Toast, { type ToastShowParams } from "react-native-toast-message";

export const showToast = (message: string | ToastShowParams) => {
  Toast.show(
    typeof message === "string" ? { type: "info", text2: message } : message,
  );
};
