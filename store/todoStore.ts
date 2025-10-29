'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Todo, TodoStore, TodoStatus } from '@/types/todo';

const createTodo = (title: string): Todo => {
  const now = Date.now();
  return {
    id: `todo-${now}-${Math.random().toString(36).slice(2, 11)}`,
    title: title.trim(),
    completed: false,
    createdAt: now,
    updatedAt: now,
  };
};

export const useTodoStore = create<TodoStore>()(
  persist(
    (set, get) => ({
      todos: [],
      filter: 'all',

      addTodo: (title: string) => {
        if (!title.trim()) return;
        const newTodo = createTodo(title);
        set((state) => ({
          todos: [newTodo, ...state.todos],
        }));
      },

      toggleTodo: (id: string) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id
              ? { ...todo, completed: !todo.completed, updatedAt: Date.now() }
              : todo
          ),
        }));
      },

      deleteTodo: (id: string) => {
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        }));
      },

      clearCompleted: () => {
        set((state) => ({
          todos: state.todos.filter((todo) => !todo.completed),
        }));
      },

      setFilter: (filter: TodoStatus) => {
        set({ filter });
      },

      getFilteredTodos: () => {
        const { todos, filter } = get();
        if (filter === 'active') {
          return todos.filter((todo) => !todo.completed);
        }
        if (filter === 'completed') {
          return todos.filter((todo) => todo.completed);
        }
        return todos;
      },

      getActiveTodosCount: () => {
        return get().todos.filter((todo) => !todo.completed).length;
      },

      getCompletedTodosCount: () => {
        return get().todos.filter((todo) => todo.completed).length;
      },
    }),
    {
      name: 'todo-storage',
      skipHydration: true,
      partialize: (state) => ({ todos: state.todos, filter: state.filter }),
    }
  )
);

