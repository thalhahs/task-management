import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  EyeIcon,
  TrashIcon,
  PlusIcon,
  TagIcon,
  CalendarIcon,
  FlagIcon,
  CheckCircle2Icon,
  CircleIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { TaskSchema, type Task, type Tasks } from "@/modules/task/schema";
import { Link } from "react-router";
import z from "zod";
import { initialDataTasks } from "@/modules/task/data";
import { toast } from "sonner";
import { Countdown } from "./countdown";
import { cn } from "@/lib/utils";

export function Tasks() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      try {
        const parsed = JSON.parse(storedTasks);
        // Migrate old tasks to new schema using zod defaults
        const migrated = Array.isArray(parsed)
          ? parsed.map((task: any) => {
              try {
                return TaskSchema.parse({
                  ...task,
                  tags: task.tags || [],
                  priority: task.priority || "medium",
                });
              } catch {
                // If parsing fails, return with defaults
                return {
                  ...task,
                  tags: [],
                  priority: "medium" as const,
                };
              }
            })
          : initialDataTasks;
        return migrated;
      } catch {
        return initialDataTasks;
      }
    }
    return initialDataTasks;
  });

  const [tagInput, setTagInput] = useState("");
  const [currentTags, setCurrentTags] = useState<string[]>([]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleDelete(id: number) {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    toast.success("Task deleted");
  }

  function handleToggleDone(id: number) {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, isDone: !task.isDone } : task
    );
    setTasks(updatedTasks);
  }

  function handleAddTag() {
    const tag = tagInput.trim();
    if (tag && !currentTags.includes(tag)) {
      setCurrentTags([...currentTags, tag]);
      setTagInput("");
    }
  }

  function handleRemoveTag(tagToRemove: string) {
    setCurrentTags(currentTags.filter((tag) => tag !== tagToRemove));
  }

  function handleCreate(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);

      const newId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;

      const newTask = {
        id: newId,
        title: formData.get("title")?.toString().trim() || "",
        isDone: false,
        tags: currentTags,
        dueDate: formData.get("dueDate")?.toString() || undefined,
        priority: (formData.get("priority")?.toString() || "medium") as
          | "low"
          | "medium"
          | "high",
        description: formData.get("description")?.toString().trim() || undefined,
      };

      TaskSchema.parse(newTask);

      const updatedTasks: Tasks = [...tasks, newTask];

      setTasks(updatedTasks);
      setCurrentTags([]);
      setTagInput("");
      event.currentTarget.reset();
      toast.success("Task created successfully");
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        const messages = error.issues.map((issue) => issue.message).join(", ");
        toast.error("Task invalid", { description: messages });
      }
    }
  }

  const priorityColors = {
    low: "text-blue-600 dark:text-blue-400",
    medium: "text-yellow-600 dark:text-yellow-400",
    high: "text-red-600 dark:text-red-400",
  };

  const priorityIcons = {
    low: "🔵",
    medium: "🟡",
    high: "🔴",
  };

  return (
    <div className="space-y-8">
      {/* Create Task Form */}
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
          <PlusIcon className="size-5" />
          Create New Task
        </h2>
        <form method="post" onSubmit={handleCreate} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Task Title *</Label>
            <Input
              id="title"
              type="text"
              name="title"
              placeholder="Enter task title..."
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              type="text"
              name="description"
              placeholder="Add a description (optional)..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="dueDate"
                  type="datetime-local"
                  name="dueDate"
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <select
                id="priority"
                name="priority"
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                defaultValue="medium"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tagInput">Tags</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <TagIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="tagInput"
                  type="text"
                  placeholder="Add a tag..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  className="pl-9"
                />
              </div>
              <Button type="button" onClick={handleAddTag} variant="outline">
                <PlusIcon className="size-4" />
              </Button>
            </div>
            {currentTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {currentTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:text-primary/70"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <Button type="submit" className="w-full">
            <PlusIcon className="size-4" />
            Create Task
          </Button>
        </form>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Tasks ({tasks.filter((t) => !t.isDone).length} remaining)
          </h2>
        </div>

        {tasks.length === 0 ? (
          <div className="rounded-lg border border-dashed bg-muted/50 p-12 text-center">
            <p className="text-muted-foreground">No tasks yet. Create one above!</p>
          </div>
        ) : (
          <ul className="flex flex-col gap-3">
            {tasks.map((task) => (
              <li key={task.id}>
                <TaskItem
                  task={task}
                  handleDelete={() => handleDelete(task.id)}
                  handleToggleDone={() => handleToggleDone(task.id)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export function TaskItem({
  task,
  handleDelete,
  handleToggleDone,
}: {
  task: Task;
  handleDelete?: () => void;
  handleToggleDone?: () => void;
}) {
  const priorityColors = {
    low: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    medium:
      "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
    high: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
  };

  return (
    <div
      className={cn(
        "group relative rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md",
        task.isDone && "opacity-60"
      )}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={handleToggleDone}
          className="mt-0.5 flex-shrink-0"
          aria-label={task.isDone ? "Mark as incomplete" : "Mark as complete"}
        >
          {task.isDone ? (
            <CheckCircle2Icon className="size-5 text-green-600 dark:text-green-400" />
          ) : (
            <CircleIcon className="size-5 text-muted-foreground" />
          )}
        </button>

        {/* Task Content */}
        <div className="flex-1 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h3
                className={cn(
                  "font-semibold leading-tight",
                  task.isDone && "line-through text-muted-foreground"
                )}
              >
                {task.title}
              </h3>
              {task.description && (
                <p
                  className={cn(
                    "mt-1 text-sm text-muted-foreground",
                    task.isDone && "line-through"
                  )}
                >
                  {task.description}
                </p>
              )}
            </div>
          </div>

          {/* Tags, Priority, Countdown */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Priority Badge */}
            <div
              className={cn(
                "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium",
                priorityColors[task.priority]
              )}
            >
              <FlagIcon className="size-3" />
              <span className="capitalize">{task.priority}</span>
            </div>

            {/* Tags */}
            {task.tags && task.tags.length > 0 && (
              <>
                {task.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"
                  >
                    <TagIcon className="size-3" />
                    {tag}
                  </span>
                ))}
              </>
            )}

            {/* Countdown */}
            {task.dueDate && <Countdown dueDate={task.dueDate} />}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-shrink-0 gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <Button asChild size="icon" variant="ghost">
            <Link to={`/tasks/${task.id}`}>
              <EyeIcon className="size-4" />
            </Link>
          </Button>
          {handleDelete && (
            <Button
              size="icon"
              variant="ghost"
              onClick={handleDelete}
              className="text-destructive hover:text-destructive"
            >
              <TrashIcon className="size-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
