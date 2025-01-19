import { DateMap } from "@/utils/date";
import { ICON_COLORS } from "./colors";

type MoodId = string;

export interface Mood {
  moodId: MoodId;
  note: string;
}

export interface MoodByPartOfDay {
  [partOfDay: string]: Mood | null;
}

export type DateMoodMapping = DateMap<MoodByPartOfDay>;

export interface MoodIcon {
  /** The name of the icon for "FontAwesome6" font.
   * {@link https://icons.expo.fyi/Index}
   */
  iconName: string;
  color: string;
}

/** Maps mood IDs to information about icons */
export const MOOD_ICONS: Record<MoodId, MoodIcon> = Object.freeze({
  neutral: { iconName: "face-meh", color: ICON_COLORS.BLACK },
  "neutral-positive": { iconName: "face-meh", color: ICON_COLORS.GREEN },
  sad: { iconName: "face-frown-open", color: ICON_COLORS.BLACK },
  "very-sad": { iconName: "face-frown", color: ICON_COLORS.BLUE },
  angry: { iconName: "face-angry", color: ICON_COLORS.RED },
  annoyed: { iconName: "face-grimace", color: ICON_COLORS.ORANGE },
  bitchy: { iconName: "face-rolling-eyes", color: ICON_COLORS.ORANGE },
  positive: { iconName: "face-smile", color: ICON_COLORS.GREEN },
  "super-positiv": { iconName: "face-grin-beam", color: ICON_COLORS.GREEN },
});

// Prevent changing of any object in MOOD_ICONS
Object.values(MOOD_ICONS).forEach(Object.freeze);
