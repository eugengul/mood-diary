import { Stack } from "expo-router";

export default function StackLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, title: "Calendar" }}
      />
      <Stack.Screen name="day/[date]" options={{ title: "Date Info" }} />
      <Stack.Screen
        name="week/[date]"
        options={{ headerShown: false, title: "Calendar" }}
      />
    </Stack>
  );
}
