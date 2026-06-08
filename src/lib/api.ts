import { ApiErrorResponse } from "@/api/shared";
import { isAxiosError } from "axios";

export const getApiErrorMessage = (
  error: unknown,
): string | string[] | null => {
  if (isAxiosError<ApiErrorResponse>(error) && error.response?.data.message) {
    return error.response.data.message;
  }
  return null;
};
