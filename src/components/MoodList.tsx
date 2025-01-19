import { MOOD_ICONS } from "@/constants/Moods";
import {
  FlatList,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { MoodIcon } from "./MoodIcon";
import React from "react";
import { COLORS } from "@/constants/colors";

interface MoodListProps {
  selectedMood: null | string;
  onSelect: (item: string) => void;
}

export function MoodList({ selectedMood, onSelect }: MoodListProps) {
  const { width } = useWindowDimensions();
  const moodKeys = Object.keys(MOOD_ICONS);

  return (
    <FlatList
      data={moodKeys}
      numColumns={4}
      columnWrapperStyle={styles.column}
      persistentScrollbar={true}
      style={styles.list}
      renderItem={({ item }) => (
        <Pressable
          key={item}
          style={[styles.mood, selectedMood === item && styles.selected]}
          onPress={() => onSelect(item)}
        >
          <MoodIcon mood={item} size={width * 0.18} />
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { flex: 1 },
  column: {
    justifyContent: "space-between",
  },
  mood: {
    justifyContent: "center",
    alignItems: "center",
    width: "25%",
    aspectRatio: 1,
  },
  selected: {
    borderColor: COLORS.SELECTED_ICON,
    borderRadius: 10,
    borderWidth: 3,
  },
  input: {
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
