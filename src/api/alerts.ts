import apiClient from "./client";

export type CreateAlertDto = {
  stock: string;
  price: number;
};

export type Alert = {
  id: number;
  stock: string;
  price: number;
  notifiedAt: string | null;
};

export async function createAlert(payload: CreateAlertDto) {
  return (await apiClient.post<Alert>("/alerts", payload)).data;
}

export async function getAlerts() {
  return (await apiClient.get<Alert[]>("/alerts")).data;
}

export async function deleteAlert(id: string | number) {
  return (await apiClient.delete<Alert>(`/alerts/${id}`)).data;
}
