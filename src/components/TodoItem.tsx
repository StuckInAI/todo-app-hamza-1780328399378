import { Todo } from '@/types';
import { CheckCircle2, Circle, Trash2, Calendar, Tag } from 'lucide-react';
import { clsx } from 'clsx';
import { format } from 'date-fns';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const priorityColors = {
    low: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    high: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  };

  return (
    <div className={clsx(
      "group flex items-start gap-4 p-4 rounded-xl border transition-all duration-200",
      todo.completed 
        ? "bg-gray-50 border-gray-100 dark:bg-gray-800/20 dark:border-gray-800" 
        : "bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-800 shadow-sm hover:shadow-md"
    )}>
      <button 
        onClick={() => onToggle(todo.id)}
        className="mt-1 shrink-0 text-gray-400 hover:text-blue-500 transition-colors"
      >
        {todo.completed ? (
          <CheckCircle2 className="w-6 h-6 text-green-500" />
        ) : (
          <Circle className="w-6 h-6" />
        )}
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className={clsx(
            "font-semibold truncate text-lg transition-colors",
            todo.completed ? "text-gray-400 line-through" : "text-gray-900 dark:text-gray-100"
          )}>
            {todo.title}
          </h3>
          <span className={clsx("text-xs px-2 py-0.5 rounded-full font-medium", priorityColors[todo.priority])}>
            {todo.priority}
          </span>
        </div>
        
        {todo.description && (
          <p className={clsx(
            "text-sm mb-3 line-clamp-2",
            todo.completed ? "text-gray-400" : "text-gray-600 dark:text-gray-400"
          )}>
            {todo.description}
          </p>
        )}

        <div className="flex flex-wrap gap-4 items-center text-xs font-medium text-gray-500">
          {todo.category && (
            <div className="flex items-center gap-1">
              <Tag className="w-3 h-3" />
              {todo.category}
            </div>
          )}
          {todo.dueDate && (
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {format(new Date(todo.dueDate), 'MMM d, yyyy')}
            </div>
          )}
        </div>
      </div>

      <button 
        onClick={() => onDelete(todo.id)}
        className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
        title="Delete task"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}