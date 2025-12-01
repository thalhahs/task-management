import type { Tasks } from "@/modules/task/schema";
import { useParams } from "react-router";

const initialDataTasks: Tasks = [
  { id: 1, title: "Breakfast", isDone: true },
  { id: 2, title: "Lunch", isDone: false },
  { id: 3, title: "Dinner", isDone: false },
];

export function TaskId() {
  const params = useParams();
  const { taskId } = params;

  const task = initialDataTasks.find((task) => task.id === Number(taskId));

  if (!task) {
    return (
      <div>
        <h1>Task not found</h1>
      </div>
    );
  }

  return (
    <section className="flex justify-between gap-4 rounded-lg bg-sky-100 p-4">
      <div>
        <h2 className="text-lg font-bold">{task.title}</h2>
        <p>{task.isDone ? "✅ Done" : "📝 Todo"}</p>
      </div>
    </section>
  );
}
