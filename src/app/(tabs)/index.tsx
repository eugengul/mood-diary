import Day from "@/components/Day";
import { getLocalMidnight } from "@/utils/date";

export default function Index() {
  const currentDate = getLocalMidnight(new Date());

  return <Day date={currentDate} />;
}
