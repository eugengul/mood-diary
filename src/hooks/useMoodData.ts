import { MoodByPartOfDay } from "@/constants/Moods";
import {
  DateMap,
  DateRange,
  getUTCMidnightFromLocalDate,
  isDateRangesEqual,
} from "@/utils/date";
import { getMoodBetweenDates, mapMoodEntriesToDateMapping } from "@/utils/db";
import { SQLiteDatabase } from "expo-sqlite";
import { useCallback, useState } from "react";

interface useMoodDataProps {
  db: SQLiteDatabase;
  dateRange: DateRange;
}

/**
 * Custom hook to fetch mood data from DB for date range and manually refetch it.
 * It doesn't fetch data automatically, to fetch data manually call refetch function
 *
 * @returns An array containing:
 *  - moodData: Map of dates to mood data for each part of day
 *  - isLoading: Loading status
 *  - refetchMoodData: Callback to manually trigger a data refresh
 *
 * @throws Will throw an error if database query fails
 *
 * @example
 * ```tsx
 * const [moodData, isLoading, refetchMoodData] = useMoodData({
 *   db: db,
 *   dateRange: {
 *     start: new Date('2024-01-01'),
 *     end: new Date('2024-01-02')
 *   }
 * });
 *
 * useEffect(refetchMoodData, [])
 * ```
 */
export const useMoodData = ({ db, dateRange }: useMoodDataProps) => {
  const [moodData, setMoodData] = useState(new DateMap<MoodByPartOfDay>());
  const [isLoading, setIsLoading] = useState(true);
  const [currentDateRange, setCurrentDateRange] = useState({ ...dateRange });

  // Sets loading status immediately on date change to avoid UI delay
  // because (useEffect runs after render)
  if (!isDateRangesEqual(dateRange, currentDateRange)) {
    setIsLoading(true);
    setCurrentDateRange({ ...dateRange });
  }

  const startDateString = getUTCMidnightFromLocalDate(dateRange.start);
  const endDateString = getUTCMidnightFromLocalDate(dateRange.end);

  const refetchMoodData = useCallback(() => {
    let isActive = true;
    setIsLoading(true);
    async function refetch() {
      try {
        await db.withExclusiveTransactionAsync(async () => {
          const moodResult = await getMoodBetweenDates(
            db,
            new Date(startDateString),
            new Date(endDateString),
          );
          const moodData = mapMoodEntriesToDateMapping(moodResult);
          if (isActive) {
            setMoodData(moodData);
            setIsLoading(false);
          }
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

  return { moodData, isLoading, refetchMoodData };
};
