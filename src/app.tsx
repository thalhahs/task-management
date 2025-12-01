import { Tasks } from "@/modules/task/tasks";
import { TimerInterval } from "@/modules/timer/timer-interval";

export function App() {
  return (
    <>
      <TimerInterval />
      <Tasks />
    </>
  );
}
