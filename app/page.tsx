'use client';

import dynamic from 'next/dynamic';
import { CheckSquare2 } from 'lucide-react';

// Динамически загружаем компоненты с отключенным SSR
// Это предотвращает серверный рендеринг компонентов, использующих Zustand store
const TodoApp = dynamic(() => import('@/components/TodoApp').then(mod => ({ default: mod.TodoApp })), {
  ssr: false,
  loading: () => (
    <div className="text-center py-8 text-gray-400">Загрузка...</div>
  ),
});

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-blue-100 rounded-xl">
              <CheckSquare2 className="text-blue-600" size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Мой To-Do List</h1>
              <p className="text-gray-500 text-sm mt-1">Организуйте свои задачи</p>
            </div>
          </div>

          {/* Todo App - загружается только на клиенте */}
          <TodoApp />
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Нажмите на задачу, чтобы отметить её как выполненную</p>
        </div>
      </div>
    </div>
  );
}
