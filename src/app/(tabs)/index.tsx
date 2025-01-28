import Day from "@/components/Calendar/Day/Day";
import { getLocalMidnight } from "@/utils/date";

export default function CurrentDayScreen() {
  const currentDate = getLocalMidnight(new Date());

  return <Day date={currentDate} />;
}
