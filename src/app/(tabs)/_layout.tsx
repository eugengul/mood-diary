import { DateOnly } from "@/utils/date";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs, useRouter } from "expo-router";
import React from "react";
import { Platform } from "react-native";

export default function TabLayout() {
  const router = useRouter();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Today",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(calendar)"
        options={{
          title: "Calendar",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="calendar-month" color={color} />
          ),
        }}
        // Reset tab to current week if user pressed tab's icon second time
        listeners={{
          tabPress: () => {
            router.push({
              pathname: "/week/[date]",
              params: { date: new DateOnly().toISOString() },
            });
          },
        }}
      />
    </Tabs>
  );
}
