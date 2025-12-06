import type { Tasks } from "@/modules/task/schema";
import { Link, useParams } from "react-router";
import { Button } from "@/components/ui/button";
import {
  ArrowLeftIcon,
  CheckCircle2Icon,
  CircleIcon,
  FlagIcon,
  TagIcon,
  CalendarIcon,
  FileTextIcon,
} from "lucide-react";
import { Countdown } from "@/modules/task/countdown";
import { cn } from "@/lib/utils";

export function TaskId() {
  const params = useParams();
  const { taskId } = params;

  const storedTasks = localStorage.getItem("tasks");
  if (!storedTasks) {
    return (
      <div className="rounded-lg border bg-card p-8 text-center">
        <h1 className="mb-4 text-2xl font-bold">Tasks data unavailable</h1>
        <Button asChild>
          <Link to="/">Go to home</Link>
        </Button>
      </div>
    );
  }

  const parsedTasks = JSON.parse(storedTasks) as Tasks;

  const task = parsedTasks.find((task) => task.id === Number(taskId));

  if (!task) {
    return (
      <div className="rounded-lg border bg-card p-8 text-center">
        <h1 className="mb-4 text-2xl font-bold">Task not found</h1>
        <Button asChild>
          <Link to="/">Go to home</Link>
        </Button>
      </div>
    );
  }

  const priorityColors = {
    low: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    medium:
      "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
    high: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" className="mb-4">
        <Link to="/">
          <ArrowLeftIcon className="size-4" />
          Back to Tasks
        </Link>
      </Button>

      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              {task.isDone ? (
                <CheckCircle2Icon className="mt-1 size-6 text-green-600 dark:text-green-400" />
              ) : (
                <CircleIcon className="mt-1 size-6 text-muted-foreground" />
              )}
              <div className="flex-1">
                <h1
                  className={cn(
                    "text-2xl font-bold",
                    task.isDone && "line-through text-muted-foreground"
                  )}
                >
                  {task.title}
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  {task.isDone ? "Completed" : "In Progress"}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          {task.description && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <FileTextIcon className="size-4" />
                Description
              </div>
              <p
                className={cn(
                  "rounded-md bg-muted/50 p-3 text-sm",
                  task.isDone && "line-through opacity-60"
                )}
              >
                {task.description}
              </p>
            </div>
          )}

          {/* Metadata Grid */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* Priority */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <FlagIcon className="size-4" />
                Priority
              </div>
              <div
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium",
                  priorityColors[task.priority]
                )}
              >
                <FlagIcon className="size-4" />
                <span className="capitalize">{task.priority}</span>
              </div>
            </div>

            {/* Due Date */}
            {task.dueDate && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <CalendarIcon className="size-4" />
                  Due Date
                </div>
                <div className="space-y-2">
                  <p className="text-sm">{formatDate(task.dueDate)}</p>
                  <Countdown dueDate={task.dueDate} />
                </div>
              </div>
            )}
          </div>

          {/* Tags */}
          {task.tags && task.tags.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <TagIcon className="size-4" />
                Tags
              </div>
              <div className="flex flex-wrap gap-2">
                {task.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary"
                  >
                    <TagIcon className="size-3.5" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Task ID */}
          <div className="pt-4 border-t">
            <p className="text-xs text-muted-foreground">Task ID: #{task.id}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
