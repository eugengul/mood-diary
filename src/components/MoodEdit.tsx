import { Mood } from "@/constants/Moods";
import { Button, StyleSheet, TextInput, View } from "react-native";
import React from "react";
import { MoodList } from "./MoodList";

interface MoodListProps {
  mood: null | Mood;
  onSave: ({ mood, note }: { mood: string; note: string }) => void;
}

export function MoodEdit({ mood, onSave }: MoodListProps) {
  const [selectedMood, onChangeSelectedMood] = React.useState(
    mood?.moodId || null,
  );
  const [noteInput, onChangeNoteInput] = React.useState(mood?.note || "");

  return (
    <View style={styles.container}>
      <MoodList selectedMood={selectedMood} onSelect={onChangeSelectedMood} />
      <TextInput
        editable
        maxLength={25}
        onChangeText={(input) => onChangeNoteInput(input)}
        placeholder="Add your note..."
        value={noteInput}
        style={styles.input}
      />
      <Button
        title="Save"
        onPress={() =>
          selectedMood !== null &&
          onSave({ mood: selectedMood, note: noteInput })
        }
        disabled={selectedMood === null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    gap: 15,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
  },
});
