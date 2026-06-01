import { useState } from 'react';
import { Priority } from '@/types';
import { Plus, X } from 'lucide-react';

type TodoFormProps = {
  onAdd: (todo: { title: string; description: string; priority: Priority; category: string; dueDate: string }) => void;
  onClose: () => void;
};

export default function TodoForm({ onAdd, onClose }: TodoFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [category, setCategory] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title, description, priority, category, dueDate });
    setTitle('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">New Task</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
            <input
              autoFocus
              type="text"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 dark:bg-gray-950 focus:ring-2 focus:ring-blue-500 outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs to be done?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
            <textarea
              rows={3}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 dark:bg-gray-950 focus:ring-2 focus:ring-blue-500 outline-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add more details..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label>
              <select
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 dark:bg-gray-950 focus:ring-2 focus:ring-blue-500 outline-none"
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Due Date</label>
              <input
                type="date"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 dark:bg-gray-950 focus:ring-2 focus:ring-blue-500 outline-none"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 dark:bg-gray-950 focus:ring-2 focus:ring-blue-500 outline-none"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Work, Personal, etc."
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}