import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

type MessageTradeItem = {
  p: number;
  s: string;
  t: string;
  v: number;
};

type Message = {
  data?: MessageTradeItem[];
  type: string;
};

const WS_URL = process.env.EXPO_PUBLIC_WS_URL;
const RECONNECT_DELAY = 5000;

export function useStocksWebSocket(): void {
  const queryClient = useQueryClient();
  const wsRef = useRef<WebSocket | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function connect() {
      if (!WS_URL) return;
      const ws = new WebSocket(WS_URL);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("Websocket connected");
      };

      ws.onmessage = (event) => {
        try {
          const msg: Message = JSON.parse(event.data);
          console.log("Message received", msg);
          if (msg.type !== "trade" || !msg.data) return;
          msg.data.forEach((trade) => {
            queryClient.invalidateQueries({
              queryKey: ["stock", trade.s],
            });
          });
        } catch {
          // Ignore malformed messages
        }
      };

      ws.onclose = () => {
        timerRef.current = setTimeout(connect, RECONNECT_DELAY);
      };

      ws.onerror = () => {
        ws.close();
      };
    }

    connect();

    return () => {
      clearTimeout(timerRef.current);
      if (wsRef.current) {
        wsRef.current.onclose = null;
        wsRef.current.close();
      }
    };
  }, [queryClient]);
}
