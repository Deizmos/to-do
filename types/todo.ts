export type TodoStatus = 'all' | 'active' | 'completed';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface TodoStore {
  todos: Todo[];
  filter: TodoStatus;
  addTodo: (title: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  clearCompleted: () => void;
  setFilter: (filter: TodoStatus) => void;
  getFilteredTodos: () => Todo[];
  getActiveTodosCount: () => number;
  getCompletedTodosCount: () => number;
}

