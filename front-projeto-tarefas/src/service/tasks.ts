import axios from "axios";
import { apiUrl } from "./service";

export async function getUserTasks(userId: number): Promise<Task[]> {
  const response = await axios.get(`${apiUrl}/task?userId=${userId}`);
  return response.data;
}

export async function postTask({
  dataVencimento,
  title,
  userId = 2,
  priority = 3,
}: TaskPostBody) {
  const response = await axios.post(`${apiUrl}/task/create`, {
    dataVencimento,
    title,
    userId,
    priority,
  });
  return response.data;
}

export async function markTaskAsDone(taskId: number) {
  console.log("taskId: ", taskId);
  const response = await axios.put(`${apiUrl}/task/update`, {
    isDone: true,
    id: taskId,
  });
  return response.data;
}
