import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useTasks } from '../context/TaskContext'

export default function NovaTarefa() {
  const { addTask } = useTasks()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    addTask(data)
    navigate('/')
  }

  return (
    <main className="max-w-2xl mx-auto px-6 py-8">
      <h1 className="font-['Playfair_Display'] text-2xl font-bold text-gray-900 mb-6">
        Nova tarefa
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
        {/* Título */}
        <div>
          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">
            Título *
          </label>
          <input
            {...register('title', { required: 'O título é obrigatório' })}
            placeholder="Ex: Estudar React JS"
            className={`w-full px-3 py-2 text-sm border rounded-lg bg-gray-50 text-gray-900 outline-none transition-colors focus:border-gray-400 ${
              errors.title ? 'border-red-300' : 'border-gray-200'
            }`}
          />
          {errors.title && (
            <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Descrição */}
        <div>
          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">
            Descrição <span className="normal-case">(opcional)</span>
          </label>
          <textarea
            {...register('description')}
            placeholder="Detalhes da tarefa..."
            rows={3}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-900 outline-none resize-none transition-colors focus:border-gray-400"
          />
        </div>

        {/* Botões */}
        <div className="flex gap-3 pt-1">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex-1 py-2.5 text-sm font-medium border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="flex-1 py-2.5 text-sm font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Adicionar tarefa
          </button>
        </div>
      </form>
    </main>
  )
}
