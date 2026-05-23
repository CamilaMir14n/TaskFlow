import { useTasks } from '../context/TaskContext'

export default function TaskCard({ task }) {
  const { toggleTask, deleteTask } = useTasks()

  return (
    <div
      className={`bg-white border rounded-xl p-4 flex items-start gap-3 transition-all ${
        task.done ? 'opacity-60 border-gray-200' : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      {/* Checkbox */}
      <button
        onClick={() => toggleTask(task.id)}
        aria-label={task.done ? 'Desmarcar tarefa' : 'Concluir tarefa'}
        className={`mt-0.5 w-5 h-5 min-w-[20px] rounded-full border-2 flex items-center justify-center transition-all ${
          task.done ? 'bg-gray-900 border-gray-900' : 'border-gray-300 hover:border-gray-500'
        }`}
      >
        {task.done && (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="white" strokeWidth="2.5">
            <polyline points="1.5,5 4,7.5 8.5,2.5" />
          </svg>
        )}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium ${task.done ? 'line-through text-gray-400' : 'text-gray-900'}`}>
          {task.title}
        </p>
        {task.description && (
          <p className="text-xs text-gray-500 mt-1">{task.description}</p>
        )}
        <span
          className={`inline-block mt-2 text-xs font-medium px-2 py-0.5 rounded-full ${
            task.done ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
          }`}
        >
          {task.done ? 'Concluída' : 'Pendente'}
        </span>
      </div>

      {/* Delete */}
      <button
        onClick={() => deleteTask(task.id)}
        aria-label="Excluir tarefa"
        className="text-gray-300 hover:text-red-400 transition-colors p-1 rounded-lg"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polyline points="3,4 13,4" />
          <path d="M5 4V2h6v2" />
          <path d="M4 4l1 9h6l1-9" />
        </svg>
      </button>
    </div>
  )
}
