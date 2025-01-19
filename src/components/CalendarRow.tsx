import { MoodByPartOfDay } from "@/constants/Moods";
import { PARTS_OF_DAY } from "@/constants/PartsOfDay";
import { formatDate } from "@/utils/date";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import CalendarPartOfDay from "./CalendarPartOfDay";
import { COLORS } from "@/constants/colors";

interface CalendarRowProps {
  date: Date;
  moodForDate: MoodByPartOfDay | null;
  selected: boolean;
  inactive: boolean;
}

/**
 * Component that displays a row in a calendar containing a date and
 * a mood information for each part of the day.
 *
 * By pressing opens a page with information for this date.
 */

export default function CalendarRow({
  date,
  moodForDate,
  selected,
  inactive,
}: CalendarRowProps) {
  return (
    <Link
      key={date.toISOString()}
      href={{
        pathname: "./[date]",
        params: { date: date.toISOString() },
      }}
      style={[
        styles.row,
        selected ? styles.today : null,
        inactive ? styles.inactive : null,
      ]}
      asChild
    >
      <Pressable>
        <View style={styles.cell}>
          <Text style={styles.date}>{formatDate(date)}</Text>
        </View>
        {PARTS_OF_DAY.map((partOfDay) => {
          const mood = moodForDate?.[partOfDay.id] || null;
          return (
            <View key={partOfDay.id} style={styles.cell}>
              <CalendarPartOfDay mood={mood} />
            </View>
          );
        })}
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flex: 1,
    flexGrow: 1,
  },
  cell: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  date: {
    textAlign: "center",
  },
  today: {
    backgroundColor: COLORS.CALENDAR_TODAY,
  },
  inactive: {
    opacity: 0.2,
  },
});
