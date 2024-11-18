import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="home"
          options={{
            drawerLabel: "Main",
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="notifications"
          options={{
            drawerLabel: "User",
            title: "overview",
          }}
        />
        <Drawer.Screen
          name="tasks"
          options={{
            drawerLabel: "User",
            title: "overview",
          }}
        />
        <Drawer.Screen
          name="settings"
          options={{
            drawerLabel: "User",
            title: "overview",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
