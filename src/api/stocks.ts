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

export type RecommendationTrend = {
  symbol: string;
  buy: number;
  hold: number;
  period: string;
  sell: number;
  strongBuy: number;
  strongSell: number;
};

export type Quote = {
  currentPrice: number;
  highPriceOfTheDay: number;
  lowPriceOfTheDay: number;
  openPriceOfTheDay: number;
  previousClosePrice: number;
  change: number;
  percentChange: number;
};

export type RecommendationWithQuote = {
  recommendations: RecommendationTrend[];
  quote: Quote;
};

export async function getStocks(params: { search: string }) {
  console.log(params);
  return (await apiClient.get<StocksResponse>("/stocks", { params })).data;
}

export async function getStockRecommendations(params: { symbol: string }) {
  return (
    await apiClient.get<RecommendationWithQuote>(`/stocks/${params.symbol}`)
  ).data;
}
