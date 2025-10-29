'use client';

import { useMemo } from 'react';
import { useTodoStore } from '@/store/todoStore';
import { TodoItem } from './TodoItem';

export const TodoList = () => {
  const todos = useTodoStore((state) => state.todos);
  const filter = useTodoStore((state) => state.filter);

  const filteredTodos = useMemo(() => {
    if (filter === 'active') {
      return todos.filter((todo) => !todo.completed);
    }
    if (filter === 'completed') {
      return todos.filter((todo) => todo.completed);
    }
    return todos;
  }, [todos, filter]);

  if (filteredTodos.length === 0) {
    const emptyMessage =
      filter === 'all'
        ? 'У вас пока нет задач. Добавьте новую задачу выше!'
        : filter === 'active'
        ? 'Нет активных задач'
        : 'Нет завершенных задач';

    return (
      <div className="text-center py-12 px-4">
        <p className="text-gray-400 text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

