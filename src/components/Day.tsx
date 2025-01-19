import { MoodModal } from "@/components/MoodModal";
import { PartOfDayMood } from "@/components/PartOfDayMood";
import { PartOfDayId, PARTS_OF_DAY } from "@/constants/PartsOfDay";
import { useMoodData } from "@/hooks/useMoodData";
import { addReplaceMoodAsync } from "@/utils/db";
import { useFocusEffect } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { MoodEdit } from "./MoodEdit";

interface DayProps {
  date: Readonly<Date>;
}

export default function Day({ date }: DayProps) {
  const db = useSQLiteContext();
  const [moodData, refetchItems] = useMoodData({
    db,
    startDate: date,
    endDate: date,
  });
  const moodForDate = moodData.get(date) || null;

  useFocusEffect(refetchItems);

  const setMood = (partOfDay: PartOfDayId, moodId: string, note: string) => {
    try {
      addReplaceMoodAsync(db, {
        date: date,
        partOfDay: partOfDay,
        moodId: moodId,
        note: note,
      }).then(() => refetchItems());
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const [selectedPartOfDay, setSelectedPartOfDay] =
    useState<null | PartOfDayId>(null);

  const isModalVisible = selectedPartOfDay !== null;

  const closeModal = () => setSelectedPartOfDay(null);

  return (
    <View style={styles.column}>
      {PARTS_OF_DAY.map((partOfDay) => (
        <PartOfDayMood
          key={partOfDay.id}
          partOfDay={partOfDay}
          onClick={() => setSelectedPartOfDay(partOfDay.id)}
          mood={moodForDate && moodForDate[partOfDay.id]}
        />
      ))}
      {isModalVisible && (
        <MoodModal isVisible={isModalVisible} onClose={closeModal}>
          <MoodEdit
            mood={moodForDate && moodForDate[selectedPartOfDay]}
            onSave={({ mood, note }) => {
              setMood(selectedPartOfDay, mood, note);
              closeModal();
            }}
          />
        </MoodModal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  column: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
