import { Button } from "@/components/ui/button";
import { useState } from "react";

export function CounterIncrement() {
  const [count, setCount] = useState(0);

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
