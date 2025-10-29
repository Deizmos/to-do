'use client';

import { useMemo } from 'react';
import { useTodoStore } from '@/store/todoStore';
import type { TodoStatus } from '@/types/todo';

const filters: { label: string; value: TodoStatus }[] = [
  { label: 'Все', value: 'all' },
  { label: 'Активные', value: 'active' },
  { label: 'Завершенные', value: 'completed' },
];

export const FilterBar = () => {
  const todos = useTodoStore((state) => state.todos);
  const filter = useTodoStore((state) => state.filter);
  const setFilter = useTodoStore((state) => state.setFilter);
  const clearCompleted = useTodoStore((state) => state.clearCompleted);

  const activeCount = useMemo(
    () => todos.filter((todo) => !todo.completed).length,
    [todos]
  );

  const completedCount = useMemo(
    () => todos.filter((todo) => todo.completed).length,
    [todos]
  );

  return (
    <div className="mt-6 pt-6 border-t-2 border-gray-200">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex gap-2 flex-wrap">
          {filters.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`
                px-4 py-2 rounded-lg font-medium transition-colors
                ${filter === value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>
            Активных: <strong className="text-blue-600">{activeCount}</strong>
          </span>
          <span>
            Завершено: <strong className="text-green-600">{completedCount}</strong>
          </span>
          {completedCount > 0 && (
            <button
              onClick={clearCompleted}
              className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
            >
              Очистить завершенные
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

