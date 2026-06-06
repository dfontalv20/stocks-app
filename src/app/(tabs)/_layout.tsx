import { Tabs } from "expo-router";
import { Header } from "@/components/Header";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/use-theme";
import { StyleSheet } from "react-native";

export default function HomeLayout() {
  const theme = useTheme();

  const styles = StyleSheet.create({
    label: { color: theme.text },
  });

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
