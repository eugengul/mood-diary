import { Text, StyleSheet, Pressable } from "react-native";
import type { PartOfDayData } from "../constants/PartsOfDay";
import { MoodIcon } from "./MoodIcon";
import { Mood } from "@/constants/Moods";

type PartOfDayProps = {
  partOfDay: PartOfDayData;
  mood: Mood | null;
  onClick: () => void;
};

export function PartOfDayMood({ partOfDay, mood, onClick }: PartOfDayProps) {
  return (
    <Pressable onPress={onClick} style={styles.partOfDay}>
      <Text style={styles.partOfDayName}>{partOfDay.displayName}</Text>
      <MoodIcon mood={mood?.moodId || null} size={80} />
      <Text style={styles.note}>{mood?.note}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  partOfDay: {
    padding: 10,
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    borderWidth: 1,
    gap: "20px",
  },
  partOfDayName: {
    fontSize: 25,
    fontWeight: 800,
  },
  note: {
    fontSize: 25,
    opacity: 0.5,
  },
});
