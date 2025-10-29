'use client';

import { TodoForm } from './TodoForm';
import { TodoList } from './TodoList';
import { FilterBar } from './FilterBar';
import { useEffect } from 'react';
import { useTodoStore } from '@/store/todoStore';

export const TodoApp = () => {
  useEffect(() => {
    // Гидратация Zustand store после монтирования на клиенте
    useTodoStore.persist.rehydrate();
  }, []);

  return (
    <>
      {/* Todo Form */}
      <TodoForm />

      {/* Todo List */}
      <TodoList />

      {/* Filter Bar */}
      <FilterBar />
    </>
  );
};

