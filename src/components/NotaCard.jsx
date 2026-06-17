import { useNotas } from '../context/TaskContext'

export default function NotaCard({ nota, cor }) {
  const { deleteNota } = useNotas()

  return (
    <article className="group relative rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
      <span
        className="absolute inset-y-4 left-0 w-1 rounded-r"
        style={{ backgroundColor: cor }}
      />

      <div className="flex items-start justify-between gap-3 pl-2">
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-bold text-slate-950">{nota.titulo}</h3>
          {nota.conteudo && (
            <p className="mt-2 line-clamp-4 text-sm leading-6 text-slate-600">{nota.conteudo}</p>
          )}
          <p className="mt-3 text-xs font-medium text-slate-400">
            {new Date(nota.criadoEm).toLocaleDateString('pt-BR')}
          </p>
        </div>

        <button
          onClick={() => deleteNota(nota.id)}
          className="rounded-lg p-1 text-slate-300 transition hover:bg-red-50 hover:text-red-500"
          aria-label="Excluir nota"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
            <polyline points="3,4 13,4" />
            <path d="M5 4V2h6v2" />
            <path d="M4 4l1 9h6l1-9" />
          </svg>
        </button>
      </div>
    </article>
  )
}
