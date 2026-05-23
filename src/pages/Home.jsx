import { useState } from 'react'
import { useTasks } from '../context/TaskContext'
import TaskCard from '../components/TaskCard'
import FilterBar from '../components/FilterBar'
import StatsBar from '../components/StatsBar'

export default function Home() {
  const { tasks } = useTasks()
  const [filter, setFilter] = useState('all')

  const visible = tasks.filter(t => {
    if (filter === 'pending') return !t.done
    if (filter === 'done') return t.done
    return true
  })

  return (
    <main className="max-w-2xl mx-auto px-6 py-8 space-y-6">
      <StatsBar tasks={tasks} />

      <FilterBar active={filter} onChange={setFilter} />

      <div className="space-y-2">
        {visible.length === 0 ? (
          <div className="text-center py-16 text-gray-400 text-sm">
            Nenhuma tarefa encontrada.
          </div>
        ) : (
          visible.map(task => <TaskCard key={task.id} task={task} />)
        )}
      </div>
    </main>
  )
}
