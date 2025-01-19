import { MOOD_ICONS } from "@/constants/Moods";
import FontAwesomeIcon from "@expo/vector-icons/FontAwesome6";

export function MoodIcon({
  mood,
  size,
}: {
  mood: string | null;
  size: number;
}) {
  return (
    <FontAwesomeIcon
      name={
        mood && mood in MOOD_ICONS
          ? MOOD_ICONS[mood]?.iconName
          : "circle-question"
      }
      color={mood && mood in MOOD_ICONS ? MOOD_ICONS[mood].color : "black"}
      size={size}
    />
  );
}
