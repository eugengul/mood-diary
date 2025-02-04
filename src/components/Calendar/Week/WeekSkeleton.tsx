import React from "react";
import DateRow from "./DateRow";

interface SkeletonWeekProps {
  dates: Date[];
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
