import axios from "axios";
import { apiUrl } from "./service";

export async function getUserTasks(
  userId: number,
  isDone: boolean = false
): Promise<Task[]> {
  const response = await axios.get(
    `${apiUrl}/task?userId=${userId}&isDone=${isDone}`
  );
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
