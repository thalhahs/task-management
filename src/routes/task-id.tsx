import { useParams } from "react-router";

export function TaskId() {
  const params = useParams();
  const { taskId } = params;

  return (
    <div>
      <h1>Task ID: {taskId}</h1>
    </div>
  );
}
