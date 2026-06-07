import { Tabs } from "expo-router";
import { Header } from "@/components/Header";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/use-theme";
import { StyleSheet } from "react-native";
import { useEffect } from "react";
import {
  getMessaging,
  onMessage,
  setBackgroundMessageHandler,
} from "@react-native-firebase/messaging";
import { showToast } from "@/lib/toast";
import { useStocksWebSocket } from "@/hooks/use-finnhub-websocket";
import { useQueryClient } from "@tanstack/react-query";

export default function HomeLayout() {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const styles = StyleSheet.create({
    label: { color: theme.text },
  });

  useStocksWebSocket();

  useEffect(() => {
    const invalidateData = () => {
      queryClient.invalidateQueries({ queryKey: ["stock"] });
      queryClient.invalidateQueries({ queryKey: ["alerts"] });
    };
    setBackgroundMessageHandler(getMessaging(), () => {
      invalidateData();
      return Promise.resolve();
    });
    const unsubscribe = onMessage(getMessaging(), (msg) => {
      if (!msg.notification) return;
      invalidateData();
      showToast({
        text1: msg.notification.title,
        text2: msg.notification.body,
      });
    });
    return () => unsubscribe();
  }, [queryClient]);

  return (
    <Tabs screenOptions={{ header: () => <Header /> }}>
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "search" : "search-outline"}
              size={24}
              color={styles.label.color}
            />
          ),
          tabBarLabel: "Search",
          tabBarLabelStyle: styles.label,
        }}
      />
      <Tabs.Screen
        name="alerts"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "notifications" : "notifications-outline"}
              size={24}
              color={styles.label.color}
            />
          ),
          tabBarLabel: "Alerts",
          tabBarLabelStyle: styles.label,
        }}
      />
    </Tabs>
  );
}
