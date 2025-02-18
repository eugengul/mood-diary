import { MoodByPartOfDay } from "@/constants/Moods";
import { DateMap, DateOnly } from "@/utils/date";
import React from "react";
import DateRow from "./DateRow";

interface WeekProps {
  dates: DateOnly[];
  moodData: DateMap<MoodByPartOfDay>;
}

export default function Week({ dates, moodData }: WeekProps) {
  return (
    <>
      {/* Rows for each day in the week */}
      {dates.map((date) => {
        return (
          <DateRow
            key={date.toISOString()}
            date={date}
            moodForDate={moodData.get(date) || null}
          />
        );
      })}
    </>
  );
}
