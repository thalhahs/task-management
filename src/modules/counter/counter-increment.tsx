import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function CounterIncrement() {
  const [count, setCount] = useState(() => {
    const storedCount = localStorage.getItem("count");
    return storedCount ? Number(storedCount) : 0;
  });

  useEffect(() => {
    localStorage.setItem("count", String(count));
  }, [count]);

  function handleIncrement() {
    setCount(count + 1);
  }

  return (
    <div>
      <p>Count Value: {count}</p>
      <Button onClick={handleIncrement}>Increment</Button>
    </div>
  );
}
