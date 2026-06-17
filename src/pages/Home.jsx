import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProjetos } from '../context/TaskContext'
import { getNotas, getTarefas } from '../db'

const CORES = ['#2563eb', '#059669', '#d97706', '#dc2626', '#7c3aed', '#0891b2']

function ProjetoCard({ projeto, onOpen, onDelete }) {
  const tarefas = getTarefas(projeto.id)
  const notas = getNotas(projeto.id)
  const feitas = tarefas.filter(tarefa => tarefa.feita).length

  return (
    <article
      onClick={onOpen}
      className="group cursor-pointer rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span
            className="grid h-10 w-10 shrink-0 place-items-center rounded-lg text-sm font-bold text-white"
            style={{ backgroundColor: projeto.cor }}
          >
            {projeto.nome.charAt(0).toUpperCase()}
          </span>
          <div className="min-w-0">
            <h2 className="truncate text-base font-bold text-slate-950">{projeto.nome}</h2>
            <p className="mt-1 text-xs font-medium text-slate-500">
              {new Date(projeto.criadoEm).toLocaleDateString('pt-BR')}
            </p>
          </div>
        </div>

        <button
          onClick={event => {
            event.stopPropagation()
            onDelete()
          }}
          className="rounded-lg p-1 text-slate-300 opacity-100 transition hover:bg-red-50 hover:text-red-500 sm:opacity-0 sm:group-hover:opacity-100"
          aria-label="Excluir projeto"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
            <polyline points="3,4 13,4" />
            <path d="M5 4V2h6v2" />
            <path d="M4 4l1 9h6l1-9" />
          </svg>
        </button>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="rounded-lg bg-slate-50 px-3 py-2">
          <p className="text-sm font-bold text-slate-900">{tarefas.length}</p>
          <p className="text-[11px] font-semibold uppercase text-slate-500">Tarefas</p>
        </div>
        <div className="rounded-lg bg-slate-50 px-3 py-2">
          <p className="text-sm font-bold text-slate-900">{feitas}</p>
          <p className="text-[11px] font-semibold uppercase text-slate-500">Feitas</p>
        </div>
        <div className="rounded-lg bg-slate-50 px-3 py-2">
          <p className="text-sm font-bold text-slate-900">{notas.length}</p>
          <p className="text-[11px] font-semibold uppercase text-slate-500">Notas</p>
        </div>
      </div>
    </article>
  )
}

export default function Home() {
  const { projetos, addProjeto, deleteProjeto } = useProjetos()
  const navigate = useNavigate()
  const [nome, setNome] = useState('')
  const [cor, setCor] = useState(CORES[0])
  const [mostraForm, setMostraForm] = useState(false)

  const resumo = useMemo(() => {
    const tarefas = projetos.flatMap(projeto => getTarefas(projeto.id))
    const notas = projetos.flatMap(projeto => getNotas(projeto.id))

    return {
      projetos: projetos.length,
      tarefas: tarefas.length,
      notas: notas.length,
    }
  }, [projetos])

  const handleAdd = () => {
    if (!nome.trim()) return
    addProjeto(nome.trim(), cor)
    setNome('')
    setCor(CORES[0])
    setMostraForm(false)
  }

  return (
    <main className="min-h-[calc(100vh-65px)] bg-slate-50">
      <section className="mx-auto max-w-5xl px-5 py-8">
        <div className="flex flex-col gap-5 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-blue-700">TaskFlow</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">Projetos</h1>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:w-[360px]">
            <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
              <p className="text-lg font-bold text-slate-950">{resumo.projetos}</p>
              <p className="text-[11px] font-semibold uppercase text-slate-500">Projetos</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
              <p className="text-lg font-bold text-slate-950">{resumo.tarefas}</p>
              <p className="text-[11px] font-semibold uppercase text-slate-500">Tarefas</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
              <p className="text-lg font-bold text-slate-950">{resumo.notas}</p>
              <p className="text-[11px] font-semibold uppercase text-slate-500">Notas</p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {projetos.map(projeto => (
            <ProjetoCard
              key={projeto.id}
              projeto={projeto}
              onOpen={() => navigate(`/projeto/${projeto.id}`)}
              onDelete={() => deleteProjeto(projeto.id)}
            />
          ))}

          {mostraForm ? (
            <div className="rounded-lg border border-dashed border-slate-300 bg-white p-4">
              <label className="text-xs font-bold uppercase tracking-wide text-slate-500" htmlFor="nome-projeto">
                Novo projeto
              </label>
              <input
                id="nome-projeto"
                autoFocus
                value={nome}
                onChange={event => setNome(event.target.value)}
                onKeyDown={event => event.key === 'Enter' && handleAdd()}
                placeholder="Nome do projeto"
                className="mt-3 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
              />

              <div className="mt-3 flex flex-wrap gap-2">
                {CORES.map(item => (
                  <button
                    key={item}
                    onClick={() => setCor(item)}
                    className={`h-7 w-7 rounded-full transition ${cor === item ? 'ring-2 ring-slate-400 ring-offset-2' : ''}`}
                    style={{ backgroundColor: item }}
                    aria-label={`Selecionar cor ${item}`}
                  />
                ))}
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={handleAdd}
                  className="flex-1 rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Criar
                </button>
                <button
                  onClick={() => setMostraForm(false)}
                  className="flex-1 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setMostraForm(true)}
              className="flex min-h-[172px] flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 bg-white p-4 text-slate-500 transition hover:border-blue-400 hover:text-blue-700"
            >
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-slate-100 text-2xl leading-none">+</span>
              <span className="text-sm font-semibold">Novo projeto</span>
            </button>
          )}
        </div>
      </section>
    </main>
  )
}
