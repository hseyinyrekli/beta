import type { Todo } from "./todoService";

export type TodoFilter = "all" | "completed" | "in-progress";

export function filterTodos(todos: Todo[], filter: TodoFilter) {
  if (filter === "completed") {
    return todos.filter((todo) => todo.completed);
  }

  if (filter === "in-progress") {
    return todos.filter((todo) => !todo.completed);
  }

  return todos;
}

export function searchTodos(todos: Todo[], query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return todos;
  }

  return todos.filter((todo) =>
    todo.title.toLowerCase().includes(normalizedQuery)
  );
}
