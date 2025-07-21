import { TabBar } from "@/components/TabBar";
import "@/styles/global.css";
import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" options={{ title: "transaction" }} />
    </Tabs>
  );
}
