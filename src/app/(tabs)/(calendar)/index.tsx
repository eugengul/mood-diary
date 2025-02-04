import { Redirect } from "expo-router";

export default function RedirectToCurrentWeek() {
  return (
    <Redirect
      href={{
        pathname: "./week/[date]",
        params: { date: new Date().toISOString() },
      }}
    />
  );
}
