export type PartOfDayId = "morning" | "afternoon" | "evening";

export interface PartOfDayData {
  readonly id: PartOfDayId;
  readonly displayName: string;
}

/**
 * The array of parts of the day. Contains ID and human readable name
 * */
export const PARTS_OF_DAY: readonly Readonly<PartOfDayData>[] = Object.freeze(
  [
    { id: "morning", displayName: "Morning" },
    { id: "afternoon", displayName: "Afternoon" },
    { id: "evening", displayName: "Evening" },
  ].map<PartOfDayData>(Object.freeze), // Freeze each object in array
);
