import { useState, useCallback } from "react";
import { mapMoodEntriesToDateMapping, getMoodBetweenDates } from "@/utils/db";
import { SQLiteDatabase } from "expo-sqlite";
import { DateMap, getUTCMidnightFromLocalDate } from "@/utils/date";
import { DateMoodMapping, MoodByPartOfDay } from "@/constants/Moods";

interface useMoodDataProps {
  db: SQLiteDatabase;
  startDate: Date;
  endDate: Date;
}

/**
 * Custom hook to fetch mood data from DB for date range and manually refetch it.
 *
 * @returns An array containing:
 *  - moodData: Map of dates to mood data for each part of day
 *  - refetch function: Callback to manually trigger a data refresh
 *
 * @throws Will throw an error if database query fails
 *
 * @example
 * ```tsx
 * const [moodData, refetchMoodData] = useMoodData({
 *   db: db,
 *   startDate: new Date('2024-01-01'),
 *   endDate: new Date('2024-01-02')
 * });
 * ```
 */
export const useMoodData = ({
  db,
  startDate,
  endDate,
}: useMoodDataProps): [DateMoodMapping, () => void] => {
  const [moodData, setMoodData] = useState(new DateMap<MoodByPartOfDay>());
  const startDateString = getUTCMidnightFromLocalDate(startDate);
  const endDateString = getUTCMidnightFromLocalDate(endDate);

  const refetchMoodData = useCallback(() => {
    let isActive = true;
    async function refetch() {
      try {
        await db.withExclusiveTransactionAsync(async () => {
          const moodResult = await getMoodBetweenDates(
            db,
            new Date(startDateString),
            new Date(endDateString),
          );
          const moodData = mapMoodEntriesToDateMapping(moodResult);
          if (isActive) setMoodData(moodData);
        });
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
    refetch();
    return () => {
      isActive = false;
    };
  }, [db, startDateString, endDateString]);

  return [moodData, refetchMoodData];
};
