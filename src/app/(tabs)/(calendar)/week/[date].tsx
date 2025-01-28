import Week from "@/components/Calendar/Week/Week";
import { useMoodData } from "@/hooks/useMoodData";
import { getWeekDates, shiftDate } from "@/utils/date";
import { Link, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { Button, StyleSheet, View } from "react-native";

export default function WeekScreen() {
  const { date: dateString } = useLocalSearchParams<{ date: string }>();
  const date = new Date(dateString);

  const db = useSQLiteContext();

  const daysOfWeek = getWeekDates(date);

  const nextWeek = shiftDate(date, 7);

  const previousWeek = shiftDate(date, -7);

  const [moodData, refetchMoodData] = useMoodData({
    db,
    startDate: daysOfWeek[0],
    endDate: daysOfWeek[6],
  });

  // Refetch items whenever the route is focused
  useFocusEffect(refetchMoodData);

  return (
    <View style={styles.container}>
      <Link
        href={{
          pathname: "./[date]",
          params: { date: previousWeek.toISOString() },
        }}
        asChild
      >
        <Button title="Previous Week" />
      </Link>

      {/* Rows for each day in the week */}
      <Week dates={daysOfWeek} moodData={moodData} />

      <Link
        href={{
          pathname: "./[date]",
          params: { date: nextWeek.toISOString() },
        }}
        asChild
      >
        <Button title="Next Week" />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
