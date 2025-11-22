import { Button } from "@/components/ui/button";
import { EyeIcon, TrashIcon } from "lucide-react";
import { useState } from "react";

type Task = {
  id: number;
  title: string;
  isDone: boolean;
};

type Tasks = Task[];

const initialDataTasks: Tasks = [
  { id: 1, title: "Breakfast", isDone: true },
  { id: 2, title: "Lunch", isDone: false },
  { id: 3, title: "Dinner", isDone: false },
];

export function Tasks() {
  const [tasks, setTasks] = useState(initialDataTasks);

  function handleDelete() {
    console.log("Deleted");
  }

  return (
    <ul className="flex flex-col gap-4">
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskItem task={task} handleDelete={handleDelete} />
        </li>
      ))}
    </ul>
  );
}

export function TaskItem({
  task,
  handleDelete,
}: {
  task: Task;
  handleDelete: () => void;
}) {
  return (
    <section className="flex justify-between gap-4 rounded-lg bg-sky-100 p-4">
      <div>
        <h2 className="text-lg font-bold">{task.title}</h2>
        <p>{task.isDone ? "✅ Done" : "📝 Todo"}</p>
      </div>
      <div className="flex gap-2">
        <Button size="xs">
          <EyeIcon className="size-3" />
          <span className="text-xs">View</span>
        </Button>
        <Button variant="destructive" size="xs" onClick={handleDelete}>
          <TrashIcon className="size-3" />
          <span className="text-xs">Delete</span>
        </Button>
      </div>
    </section>
  );
}
