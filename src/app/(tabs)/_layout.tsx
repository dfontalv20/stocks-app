import { Tabs } from "expo-router";
import { Header } from "@/components/Header";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/use-theme";

export default function HomeLayout() {
  const theme = useTheme();
  return (
    <Tabs screenOptions={{ header: () => <Header /> }}>
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: () => (
            <Ionicons name="search" size={24} color={theme.text} />
          ),
          tabBarLabel: "Search",
          tabBarLabelStyle: { color: theme.text },
        }}
      />
    </Tabs>
  );
}
