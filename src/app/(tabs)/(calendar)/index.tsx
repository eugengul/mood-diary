import { DateOnly } from "@/utils/date";
import { Redirect } from "expo-router";

export default function RedirectToCurrentWeek() {
  return (
    <Redirect
      href={{
        pathname: "./week/[date]",
        params: { date: new DateOnly().toISOString() },
      }}
    />
  );
}
