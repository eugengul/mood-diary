import React from "react";
import DateRow from "./DateRow";
import { DateOnly } from "@/utils/date";

interface SkeletonWeekProps {
  dates: DateOnly[];
}

export default function WeekSkeleton({ dates }: SkeletonWeekProps) {
  return (
    <>
      {dates.map((date) => (
        <DateRow
          key={date.toISOString()}
          date={date}
          moodForDate={null}
          isSkeleton={true}
        />
      ))}
    </>
  );
}
