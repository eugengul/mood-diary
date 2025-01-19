import { Stack } from "expo-router";

export default function StackLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, title: "Calendar" }}
      />
      <Stack.Screen
        name="[date]"
        options={{ title: "Date Info", presentation: "modal" }}
      />
    </Stack>
  );
}
