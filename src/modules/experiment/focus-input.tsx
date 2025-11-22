import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef } from "react";

export function FocusInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFocus() {
    inputRef.current?.focus();
  }

  return (
    <div>
      <Input ref={inputRef} type="text" placeholder="Type here..." />
      <Button onClick={handleFocus}>Focus Input</Button>
    </div>
  );
}
