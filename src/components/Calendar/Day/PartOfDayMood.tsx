import { MoodIcon } from "@/components/MoodIcon";
import { Mood } from "@/constants/Moods";
import type { PartOfDayData } from "@/constants/PartsOfDay";
import { COLORS } from "@/constants/colors";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type PartOfDayMoodProps = {
  partOfDay: PartOfDayData;
  mood: Mood | null;
  onClick: () => void;
};

export function PartOfDayMood({
  partOfDay,
  mood,
  onClick,
}: PartOfDayMoodProps) {
  return (
    <TouchableOpacity style={styles.partOfDay} onPress={onClick}>
      <View style={styles.header}>
        <Text style={styles.partOfDayName}>{partOfDay.displayName}</Text>
        <MoodIcon mood={mood?.moodId || null} size={80} />
      </View>
      {mood?.note && (
        <ScrollView persistentScrollbar style={styles.scroll}>
          {/* Use Pressable without onPress to make text scrollable */}
          <Pressable>
            <Text style={styles.note}>{mood?.note}</Text>
          </Pressable>
        </ScrollView>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  partOfDay: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    borderWidth: 1,
  },
  partOfDayName: {
    fontSize: 25,
    fontWeight: 800,
  },
  note: {
    fontSize: 22,
    padding: 5,
    opacity: 0.6,
  },
  scroll: {
    width: "95%",
    borderTopWidth: 0.7,
    borderColor: COLORS.MUTED_COLOR,
    flex: 1,
  },
  header: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
