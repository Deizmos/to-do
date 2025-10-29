'use client';

import { Todo } from '@/types/todo';
import { useTodoStore } from '@/store/todoStore';
import { Trash2, Check } from 'lucide-react';

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem = ({ todo }: TodoItemProps) => {
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);

  return (
    <div
      className={`
        flex items-center gap-3 p-4 rounded-lg border-2 transition-all
        ${todo.completed
          ? 'bg-gray-50 border-gray-200'
          : 'bg-white border-gray-200 hover:border-blue-300'
        }
      `}
    >
      <button
        onClick={() => toggleTodo(todo.id)}
        className={`
          flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
          ${todo.completed
            ? 'bg-blue-600 border-blue-600'
            : 'border-gray-300 hover:border-blue-500'
          }
        `}
        aria-label={todo.completed ? 'Отметить как невыполненную' : 'Отметить как выполненную'}
      >
        {todo.completed && <Check size={16} className="text-white" />}
      </button>

      <span
        className={`
          flex-1 text-gray-800 break-words
          ${todo.completed ? 'line-through text-gray-500' : ''}
        `}
      >
        {todo.title}
      </span>

      <button
        onClick={() => deleteTodo(todo.id)}
        className="flex-shrink-0 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        aria-label="Удалить задачу"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

