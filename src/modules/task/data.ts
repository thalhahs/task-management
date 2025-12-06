import type { Tasks } from "@/modules/task/schema";

export const initialDataTasks: Tasks = [
  {
    id: 1,
    title: "Complete project proposal",
    isDone: true,
    tags: ["work", "urgent"],
    priority: "high",
    dueDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    title: "Team meeting preparation",
    isDone: false,
    tags: ["work", "meeting"],
    priority: "medium",
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 3,
    title: "Review code changes",
    isDone: false,
    tags: ["development"],
    priority: "high",
    dueDate: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
  },
];
