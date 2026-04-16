import axios from "axios";

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export async function getTodos(limit = 100) {
  const endpoint = import.meta.env.VITE_TODOS_ENDPOINT;
  const response = await axios.get<Todo[]>(endpoint);

  return response.data.slice(0, limit);
}
