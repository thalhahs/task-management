import * as z from "zod";

export const TaskSchema = z.object({
  id: z.number().positive(),
  title: z.string().min(2).max(100),
  isDone: z.boolean(),
});

export const TasksSchema = TaskSchema.array();

export type Task = z.infer<typeof TaskSchema>;
export type Tasks = z.infer<typeof TasksSchema>;
