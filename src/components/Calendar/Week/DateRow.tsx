import { COLORS } from "@/constants/colors";
import { MoodByPartOfDay } from "@/constants/Moods";
import { PARTS_OF_DAY } from "@/constants/PartsOfDay";
import { formatDate } from "@/utils/date";
import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MoodCell from "./MoodCell";

interface DateRowProps {
  date: Date;
  moodForDate: MoodByPartOfDay | null;
  selected: boolean;
  inactive: boolean;
}

/**
 * Component that displays a row in a calendar week view containing
 * a date and a mood information for each part of the day.
 *
 * By pressing opens a page with information for this date.
 */

export default function DateRow({
  date,
  moodForDate,
  selected,
  inactive,
}: DateRowProps) {
  return (
    <Link
      key={date.toISOString()}
      href={{
        pathname: "/(tabs)/(calendar)/day/[date]",
        params: { date: date.toISOString() },
      }}
      style={[
        styles.row,
        selected ? styles.today : null,
        inactive ? styles.inactive : null,
      ]}
      asChild //Prevents wrapping children in <Text>
    >
      {/* `Link` with `asChild` prop requires children component with `onPress`, `onClick` support*/}
      <TouchableOpacity>
        {/* Column with date */}
        <View style={styles.cell}>
          <Text style={styles.date}>{formatDate(date)}</Text>
        </View>
        {/* Columns for each part of the day with icon and note */}
        {PARTS_OF_DAY.map((partOfDay) => {
          const mood = moodForDate?.[partOfDay.id] || null;
          return (
            <View key={partOfDay.id} style={styles.cell}>
              <MoodCell mood={mood} />
            </View>
          );
        })}
      </TouchableOpacity>
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
