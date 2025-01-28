import { MoodIcon } from "@/components/MoodIcon";
import { COLORS } from "@/constants/colors";
import { Mood } from "@/constants/Moods";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const MAX_NOTE_LENGTH = 20;

const truncateNote = (note: string, maxLength: number = MAX_NOTE_LENGTH) =>
  note.length > maxLength ? `${note.slice(0, maxLength)}...` : note;

export default function MoodCell({ mood }: { mood: Mood | null }) {
  const { moodId, note } = mood || {};
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <MoodIcon mood={moodId || null} size={40} />
      </View>
      <Text style={styles.note}>{note && truncateNote(note)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  note: {
    flex: 1,
    opacity: 0.5,
    textAlign: "center",
    borderTopWidth: 1,
    borderColor: COLORS.MUTED_COLOR,
  },
});
