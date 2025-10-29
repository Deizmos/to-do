'use client';

import { useState, FormEvent } from 'react';
import { useTodoStore } from '@/store/todoStore';
import { Plus } from 'lucide-react';

export const TodoForm = () => {
  const [title, setTitle] = useState('');
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim()) {
      addTodo(title);
      setTitle('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full mb-6"
    >
      <div className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Добавить новую задачу..."
          className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors text-gray-800 placeholder-gray-400"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!title.trim()}
        >
          <Plus size={20} />
          <span className="hidden sm:inline">Добавить</span>
        </button>
      </div>
    </form>
  );
};

