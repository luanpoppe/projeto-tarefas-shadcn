import axios from "axios";
import { apiUrl } from "./service";

export async function getUserTasks(
  userId: number,
  isDone: boolean = false,
  project?: string
): Promise<Task[]> {
  const projectQuery = project ? `&project=${project}` : "";

  const response = await axios.get(
    `${apiUrl}/task?userId=${userId}&isDone=${isDone}${projectQuery}`
  );
  return response.data;
}

export async function postTask({
  dataVencimento,
  title,
  userId = 2,
  priority = 3,
  projetoTitle,
  position,
}: TaskPostBody) {
  const response = await axios.post(`${apiUrl}/task/create`, {
    dataVencimento,
    title,
    userId,
    priority,
    projetoTitle,
    position,
  });
  return response.data;
}

export async function markTaskAsDone(taskId: number) {
  const body: TaskPutBody = {
    isDone: true,
    id: taskId,
  };
  const response = await axios.put(`${apiUrl}/task/update`, body);
  return response.data;
}

export async function changeTaskPostion(taskId: number, newPosition: number) {
  console.log("taskId: ", taskId);
  const body: TaskPutBody = {
    id: taskId,
    position: newPosition,
  };
  const response = await axios.put(`${apiUrl}/task/update`, body);
  return response.data;
}
