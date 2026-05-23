const FILTERS = [
  { value: 'all', label: 'Todas' },
  { value: 'pending', label: 'Pendentes' },
  { value: 'done', label: 'Concluídas' },
]

export default function FilterBar({ active, onChange }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {FILTERS.map(f => (
        <button
          key={f.value}
          onClick={() => onChange(f.value)}
          className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all ${
            active === f.value
              ? 'bg-gray-900 text-white border-gray-900'
              : 'border-gray-200 text-gray-500 hover:border-gray-400'
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  )
}
