import apiClient from "./client";

export type Stock = {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
};

export type StocksResponse = {
  count: number;
  result: Stock[];
};

export async function getStocks(params: { search: string }) {
  console.log(params);
  return (await apiClient.get<StocksResponse>("/stocks", { params })).data;
}
