import { useState, useMemo } from 'react';
import { useTodos } from '@/hooks/useTodos';
import TodoItem from '@/components/TodoItem';
import TodoForm from '@/components/TodoForm';
import { Plus, ListTodo, Filter, CheckCircle, Clock } from 'lucide-react';
import { clsx } from 'clsx';

type FilterStatus = 'all' | 'active' | 'completed';

export default function Dashboard() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [filter, setFilter] = useState<FilterStatus>('all');

  const stats = useMemo(() => ({
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    active: todos.filter(t => !t.completed).length,
  }), [todos]);

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active': return todos.filter(t => !t.completed);
      case 'completed': return todos.filter(t => t.completed);
      default: return todos;
    }
  }, [todos, filter]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <header className="mb-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
              <ListTodo className="w-8 h-8 text-blue-600" />
              Task Master
            </h1>
            <p className="text-gray-500 mt-1">Stay organized and productive.</p>
          </div>
          <button
            onClick={() => setIsFormOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full font-semibold flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all active:scale-95"
          >
            <Plus className="w-5 h-5" />
            Create Task
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800">
            <div className="text-gray-500 text-sm font-medium mb-1">Total</div>
            <div className="text-2xl font-bold">{stats.total}</div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800">
            <div className="text-gray-500 text-sm font-medium mb-1">Completed</div>
            <div className="text-2xl font-bold text-green-500">{stats.completed}</div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800">
            <div className="text-gray-500 text-sm font-medium mb-1">Active</div>
            <div className="text-2xl font-bold text-blue-500">{stats.active}</div>
          </div>
        </div>
      </header>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex bg-gray-100 dark:bg-gray-800/50 p-1 rounded-xl">
            {[ 
              { id: 'all', label: 'All', icon: ListTodo },
              { id: 'active', label: 'Active', icon: Clock },
              { id: 'completed', label: 'Done', icon: CheckCircle }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id as FilterStatus)}
                className={clsx(
                  "px-4 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2",
                  filter === f.id 
                    ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm" 
                    : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                )}
              >
                <f.icon className="w-4 h-4" />
                {f.label}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
            <Filter className="w-4 h-4" />
            Sorted by latest
          </div>
        </div>

        <div className="space-y-3">
          {filteredTodos.length > 0 ? (
            filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))
          ) : (
            <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/20 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-800">
              <div className="bg-gray-100 dark:bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ListTodo className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">No tasks found</h3>
              <p className="text-gray-500 max-w-xs mx-auto">
                {filter === 'all' 
                  ? "You haven't added any tasks yet. Start by creating one!" 
                  : `No ${filter} tasks matching your current view.`}
              </p>
            </div>
          )}
        </div>
      </div>

      {isFormOpen && (
        <TodoForm 
          onAdd={addTodo} 
          onClose={() => setIsFormOpen(false)} 
        />
      )}
    </div>
  );
}