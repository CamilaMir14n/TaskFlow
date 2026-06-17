import { useState } from 'react'
import { ComentarioProvider, useComentarios, useTarefas } from '../context/TaskContext'

function Comentarios() {
  const { comentarios, addComentario, deleteComentario } = useComentarios()
  const [texto, setTexto] = useState('')

  const handleAdd = event => {
    event.preventDefault()
    if (!texto.trim()) return
    addComentario(texto.trim())
    setTexto('')
  }

  return (
    <div className="border-t border-slate-100 px-4 pb-4 pt-3">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
        Comentarios ({comentarios.length})
      </p>

      <div className="mt-3 space-y-2">
        {comentarios.length === 0 ? (
          <p className="text-sm text-slate-400">Nenhum comentario ainda.</p>
        ) : (
          comentarios.map(comentario => (
            <div key={comentario.id} className="group flex items-start gap-2">
              <div className="flex-1 rounded-lg bg-slate-50 px-3 py-2">
                <p className="text-sm text-slate-700">{comentario.conteudo}</p>
                <p className="mt-1 text-[11px] font-medium text-slate-400">
                  {new Date(comentario.criadoEm).toLocaleString('pt-BR', {
                    dateStyle: 'short',
                    timeStyle: 'short',
                  })}
                </p>
              </div>
              <button
                onClick={() => deleteComentario(comentario.id)}
                className="rounded-lg p-1 text-slate-300 transition hover:bg-red-50 hover:text-red-500"
                aria-label="Remover comentario"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="4" y1="4" x2="12" y2="12" />
                  <line x1="12" y1="4" x2="4" y2="12" />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleAdd} className="mt-3 flex gap-2">
        <input
          value={texto}
          onChange={event => setTexto(event.target.value)}
          placeholder="Adicionar comentario"
          className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-500"
        />
        <button className="rounded-lg bg-slate-950 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
          Enviar
        </button>
      </form>
    </div>
  )
}

export default function TarefaCard({ tarefa, cor }) {
  const { toggleTarefa, deleteTarefa } = useTarefas()
  const [aberto, setAberto] = useState(false)

  return (
    <article className={`rounded-lg border bg-white transition ${tarefa.feita ? 'border-slate-200 opacity-70' : 'border-slate-200 hover:border-slate-300'}`}>
      <div className="flex items-start gap-3 p-4">
        <button
          onClick={() => toggleTarefa(tarefa.id)}
          aria-label={tarefa.feita ? 'Desmarcar tarefa' : 'Concluir tarefa'}
          className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 transition"
          style={tarefa.feita ? { backgroundColor: cor, borderColor: cor } : { borderColor: '#cbd5e1' }}
        >
          {tarefa.feita && (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="white" strokeWidth="2.5">
              <polyline points="1.5,5 4,7.5 8.5,2.5" />
            </svg>
          )}
        </button>

        <div className="min-w-0 flex-1">
          <p className={`font-semibold ${tarefa.feita ? 'text-slate-400 line-through' : 'text-slate-950'}`}>
            {tarefa.titulo}
          </p>
          {tarefa.descricao && (
            <p className="mt-1 text-sm leading-6 text-slate-600">{tarefa.descricao}</p>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-3 py-1 text-xs font-bold ${tarefa.feita ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
              {tarefa.feita ? 'Concluida' : 'Pendente'}
            </span>
            <button
              onClick={() => setAberto(value => !value)}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 transition hover:bg-slate-200"
            >
              {aberto ? 'Ocultar comentarios' : 'Ver comentarios'}
            </button>
          </div>
        </div>

        <button
          onClick={() => deleteTarefa(tarefa.id)}
          aria-label="Excluir tarefa"
          className="rounded-lg p-1 text-slate-300 transition hover:bg-red-50 hover:text-red-500"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
            <polyline points="3,4 13,4" />
            <path d="M5 4V2h6v2" />
            <path d="M4 4l1 9h6l1-9" />
          </svg>
        </button>
      </div>

      {aberto && (
        <ComentarioProvider tarefaId={tarefa.id}>
          <Comentarios />
        </ComentarioProvider>
      )}
    </article>
  )
}