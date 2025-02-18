import Day from "@/components/Calendar/Day/Day";
import { DateOnly } from "@/utils/date";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";

export default function DayScreen() {
  const { date: dateString } = useLocalSearchParams<{ date: string }>();
  const date = new DateOnly(dateString);
  return (
    <>
      {/* Set current date as title in the header */}
      <Stack.Screen options={{ title: date.format() }} />
      <Day date={date} />
    </>
  );
}
