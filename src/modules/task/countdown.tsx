import { useEffect, useState } from "react";
import { ClockIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CountdownProps {
  dueDate: string;
  className?: string;
}

export function Countdown({ dueDate, className }: CountdownProps) {
  const [timeRemaining, setTimeRemaining] = useState<string>("");

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const due = new Date(dueDate).getTime();
      const difference = due - now;

      if (difference < 0) {
        setTimeRemaining("Overdue");
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

      if (days > 0) {
        setTimeRemaining(`${days}d ${hours}h`);
      } else if (hours > 0) {
        setTimeRemaining(`${hours}h ${minutes}m`);
      } else {
        setTimeRemaining(`${minutes}m`);
      }
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [dueDate]);

  const isOverdue = timeRemaining === "Overdue";
  const isUrgent =
    !isOverdue &&
    new Date(dueDate).getTime() - new Date().getTime() < 24 * 60 * 60 * 1000;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        isOverdue
          ? "bg-destructive/10 text-destructive"
          : isUrgent
            ? "bg-orange-500/10 text-orange-600 dark:text-orange-400"
            : "bg-muted text-muted-foreground",
        className
      )}
    >
      <ClockIcon className="size-3" />
      <span>{timeRemaining}</span>
    </div>
  );
}


