import { MoodByPartOfDay } from "@/constants/Moods";
import { DateMap, getLocalMidnight } from "@/utils/date";
import React from "react";
import DateRow from "./DateRow";

interface WeekProps {
  dates: Date[];
  moodData: DateMap<MoodByPartOfDay>;
}

export default function Week({ dates, moodData }: WeekProps) {
  const today = getLocalMidnight(new Date());
  return (
    <>
      {/* Rows for each day in the week */}
      {dates.map((date) => {
        return (
          <DateRow
            key={date.getTime()}
            date={date}
            moodForDate={moodData.get(date) || null}
            selected={date.getTime() === today.getTime()}
            inactive={date.getTime() > today.getTime()}
          />
        );
      })}
    </>
  );
}
