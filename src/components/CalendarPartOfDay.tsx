import { Mood } from "@/constants/Moods";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { MoodIcon } from "./MoodIcon";

const MAX_NOTE_LENGTH = 20;

const truncateNote = (note: string, maxLength: number = MAX_NOTE_LENGTH) =>
  note.length > maxLength ? `${note.slice(0, maxLength)}...` : note;

export default function CalendarPartOfDay({ mood }: { mood: Mood | null }) {
  const { moodId, note } = mood || {};
  return (
    <>
      <MoodIcon mood={moodId || null} size={40} />
      {note ? <Text style={styles.note}>{truncateNote(note)}</Text> : null}
    </>
  );
}

const styles = StyleSheet.create({
  note: {
    opacity: 0.5,
    textAlign: "center",
  },
});
