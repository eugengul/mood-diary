import Week from "@/components/Calendar/Week/Week";
import WeekSkeleton from "@/components/Calendar/Week/WeekSkeleton";
import SkeletonAnimation from "@/components/SkeletonAnimation";
import { useMoodData } from "@/hooks/useMoodData";
import { DateOnly, getWeekDates } from "@/utils/date";
import { Link, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { Button, StyleSheet, View } from "react-native";

export default function WeekScreen() {
  const { date: dateString } = useLocalSearchParams<{ date: string }>();
  const date = new DateOnly(dateString);
  const db = useSQLiteContext();

  const daysOfWeek = getWeekDates(date);

  const nextWeek = date.shiftDays(7);

  const previousWeek = date.shiftDays(-7);

  const { moodData, isLoading, refetchMoodData } = useMoodData({
    db,
    dateRange: {
      start: daysOfWeek[0],
      end: daysOfWeek[6],
    },
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
      <SkeletonAnimation isLoading={isLoading}>
        {isLoading ? (
          <View style={{ flex: 1 }}>
            <WeekSkeleton dates={daysOfWeek} />
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <Week dates={daysOfWeek} moodData={moodData} />
          </View>
        )}
      </SkeletonAnimation>
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
