import { getStocks, StocksResponse } from "@/api/stocks";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useStocksQuery = (
  params: { search: string },
  options?: Omit<
    UseQueryOptions<StocksResponse, Error, StocksResponse>,
    "queryKey" | "queryFn"
  >,
) =>
  useQuery({
    ...options,
    queryKey: ["stocks", params],
    queryFn: () => getStocks(params),
    enabled: !!params.search,
  });
