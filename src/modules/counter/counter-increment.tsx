import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/modules/common/use-local-storage";

export function CounterIncrement() {
  const [count, setCount] = useLocalStorage("count", 0);

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
