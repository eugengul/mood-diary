import Day from "@/components/Calendar/Day/Day";
import { formatDate } from "@/utils/date";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";

export default function DayScreen() {
  const { date: dateString } = useLocalSearchParams<{ date: string }>();
  const date = new Date(dateString);
  return (
    <>
      {/* Set current date as title in the header */}
      <Stack.Screen options={{ title: formatDate(new Date(date)) }} />
      <Day date={date} />
    </>
  );
}
