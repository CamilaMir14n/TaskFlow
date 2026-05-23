export default function StatsBar({ tasks }) {
  const total = tasks.length
  const done = tasks.filter(t => t.done).length
  const pending = total - done

  const stats = [
    { label: 'Total', value: total },
    { label: 'Pendentes', value: pending },
    { label: 'Concluídas', value: done },
  ]

  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map(s => (
        <div key={s.label} className="bg-gray-100 rounded-xl p-3">
          <p className="text-2xl font-medium text-gray-900">{s.value}</p>
          <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
        </div>
      ))}
    </div>
  )
}
