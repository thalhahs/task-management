import { useEffect } from "react";

export function TimerInterval() {
  useEffect(() => {
    const timer = setInterval(() => {
      console.log("Timer ticked");
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return <div>Timer</div>;
}
