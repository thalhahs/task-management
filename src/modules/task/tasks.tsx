import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { TaskSchema, type Task, type Tasks } from "@/modules/task/schema";
import { Link } from "react-router";
import z from "zod";
import { initialDataTasks } from "@/modules/task/data";
import { toast } from "sonner";

export function Tasks() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? (JSON.parse(storedTasks) as Tasks) : initialDataTasks;
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleDelete(id: number) {
    const updatedTasks = tasks.filter((task) => task.id !== id);

    setTasks(updatedTasks);
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
      };

      TaskSchema.parse(newTask);

      const updatedTasks: Tasks = [...tasks, newTask];

      setTasks(updatedTasks);

      event.currentTarget.reset();
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        const messages = error.issues.map((issue) => issue.message).join(", ");
        toast.error("Task invalid", { description: messages });
      }
    }
  }

  return (
    <section className="space-y-8">
      <form method="post" onSubmit={handleCreate} className="space-y-2">
        <div className="space-y-2">
          <Label htmlFor="title">Title:</Label>
          <Input id="title" type="text" name="title" required />
        </div>
        <Button type="submit">Create Task</Button>
      </form>

      <ul className="flex flex-col gap-4">
        {tasks.map((task) => (
          <li key={task.id}>
            <TaskItem task={task} handleDelete={() => handleDelete(task.id)} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export function TaskItem({
  task,
  handleDelete,
}: {
  task: Task;
  handleDelete?: () => void;
}) {
  return (
    <section className="flex justify-between gap-4 rounded-lg bg-sky-100 p-4">
      <div>
        <h2 className="text-lg font-bold">{task.title}</h2>
        <p>{task.isDone ? "✅ Done" : "📝 Todo"}</p>
      </div>
      <div className="flex gap-2">
        <Button asChild size="xs">
          <Link to={`/tasks/${task.id}`}>
            <EyeIcon className="size-3" />
            <span className="text-xs">View</span>
          </Link>
        </Button>
        {handleDelete && (
          <Button variant="destructive" size="xs" onClick={handleDelete}>
            <TrashIcon className="size-3" />
            <span className="text-xs">Delete</span>
          </Button>
        )}
      </div>
    </section>
  );
}
