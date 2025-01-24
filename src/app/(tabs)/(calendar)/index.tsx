import { Redirect } from "expo-router";

export default function Index() {
  return (
    <Redirect
      href={{
        pathname: "./week/[date]",
        params: { date: new Date().toISOString() },
      }}
    />
  );
}
