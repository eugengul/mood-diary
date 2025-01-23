import { COLORS } from "@/constants/colors";
import { MAX_NOTE_LENGTH } from "@/constants/constants";
import { Mood } from "@/constants/Moods";
import React from "react";
import { Button, ScrollView, StyleSheet, TextInput, View } from "react-native";
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
      <ScrollView
        persistentScrollbar={true}
        style={styles.scroll}
        contentContainerStyle={styles.scrollContainer}
      >
        <TextInput
          editable
          multiline
          maxLength={MAX_NOTE_LENGTH}
          onChangeText={(input) => onChangeNoteInput(input)}
          placeholder="Add your note..."
          value={noteInput}
          style={styles.input}
        />
      </ScrollView>
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
    gap: 15,
  },
  scroll: {
    flex: 1,
    flexGrow: 0.5,
    borderWidth: 1,
    borderColor: COLORS.MUTED_COLOR,
  },
  scrollContainer: {
    flexGrow: 1, // Allow the TextInput to fill the ScrollView
  },
  input: {
    flex: 1, // Fill all available height of the ScrollView
    fontSize: 20,
    textAlignVertical: "top",
    padding: 10,
  },
});
