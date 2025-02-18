import Day from "@/components/Calendar/Day/Day";
import { DateOnly } from "@/utils/date";

export default function CurrentDayScreen() {
  return <Day date={new DateOnly()} />;
}
