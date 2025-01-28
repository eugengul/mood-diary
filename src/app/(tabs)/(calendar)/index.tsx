import { Redirect } from "expo-router";

export default function RedirectToCurrentDay() {
  return (
    <Redirect
      href={{
        pathname: "./week/[date]",
        params: { date: new Date().toISOString() },
      }}
    />
  );
}
