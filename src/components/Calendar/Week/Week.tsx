import { MoodByPartOfDay } from "@/constants/Moods";
import { DateMap } from "@/utils/date";
import React from "react";
import DateRow from "./DateRow";

interface WeekProps {
  dates: Date[];
  moodData: DateMap<MoodByPartOfDay>;
}

export default function Week({ dates, moodData }: WeekProps) {
  return (
    <>
      {/* Rows for each day in the week */}
      {dates.map((date) => {
        return (
          <DateRow
            key={date.getTime()}
            date={date}
            moodForDate={moodData.get(date) || null}
          />
        );
      })}
    </>
  );
}
