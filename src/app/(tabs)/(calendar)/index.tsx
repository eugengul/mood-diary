import CalendarRow from "@/components/CalendarRow";
import { useMoodData } from "@/hooks/useMoodData";
import { getLocalMidnight, getWeekDates } from "@/utils/date";
import { useFocusEffect } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { StyleSheet, View } from "react-native";

export default function Calendar() {
  const db = useSQLiteContext();

  const today = getLocalMidnight(new Date());

  const daysOfWeek = getWeekDates(today);
  const startOfWeek = daysOfWeek[0];
  const endOfWeek = daysOfWeek[daysOfWeek.length - 1];

  const [moodData, refetchMoodData] = useMoodData({
    db,
    startDate: startOfWeek,
    endDate: endOfWeek,
  });

  // Refetch items whenever the route is focused
  useFocusEffect(refetchMoodData);

  return (
    <View style={styles.container}>
      {daysOfWeek.map((date) => {
        const moodForDate = moodData.get(date) || null;
        return (
          <CalendarRow
            key={date.getTime()}
            date={date}
            moodForDate={moodForDate}
            selected={date.getTime() === today.getTime()}
            inactive={date.getTime() > today.getTime()}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
  },
});
