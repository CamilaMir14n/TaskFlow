import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { NotaProvider, TarefaProvider, useNotas, useProjetos, useTarefas } from '../context/TaskContext'
import NotaCard from '../components/NotaCard'
import TarefaCard from '../components/TarefaCard'

function InfoBox({ label, value }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
      <p className="text-lg font-bold text-slate-950">{value}</p>
      <p className="text-[11px] font-semibold uppercase text-slate-500">{label}</p>
    </div>
  )
}

function ProjetoInner({ projeto }) {
  const { tarefas, addTarefa } = useTarefas()
  const { notas, addNota } = useNotas()
  const [aba, setAba] = useState('tarefas')
  const [tituloTarefa, setTituloTarefa] = useState('')
  const [descricaoTarefa, setDescricaoTarefa] = useState('')
  const [tituloNota, setTituloNota] = useState('')
  const [conteudoNota, setConteudoNota] = useState('')

  const pendentes = tarefas.filter(tarefa => !tarefa.feita).length
  const feitas = tarefas.filter(tarefa => tarefa.feita).length

  const handleAddTarefa = event => {
    event.preventDefault()
    if (!tituloTarefa.trim()) return
    addTarefa({
      projetoId: projeto.id,
      titulo: tituloTarefa.trim(),
      descricao: descricaoTarefa.trim(),
    })
    setTituloTarefa('')
    setDescricaoTarefa('')
  }

  const handleAddNota = event => {
    event.preventDefault()
    if (!tituloNota.trim()) return
    addNota({
      projetoId: projeto.id,
      titulo: tituloNota.trim(),
      conteudo: conteudoNota.trim(),
    })
    setTituloNota('')
    setConteudoNota('')
  }

  return (
    <main className="min-h-[calc(100vh-65px)] bg-slate-50">
      <section className="mx-auto max-w-5xl px-5 py-8">
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex min-w-0 items-center gap-4">
              <span
                className="grid h-12 w-12 shrink-0 place-items-center rounded-lg text-xl font-bold text-white"
                style={{ backgroundColor: projeto.cor }}
              >
                {projeto.nome.charAt(0).toUpperCase()}
              </span>
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-wide text-blue-700">Projeto</p>
                <h1 className="mt-1 truncate text-3xl font-bold tracking-tight text-slate-950">{projeto.nome}</h1>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:w-[360px] sm:grid-cols-4">
              <InfoBox label="Tarefas" value={tarefas.length} />
              <InfoBox label="Pendentes" value={pendentes} />
              <InfoBox label="Feitas" value={feitas} />
              <InfoBox label="Notas" value={notas.length} />
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-1 border-b border-slate-200">
          {[
            { id: 'tarefas', label: `Tarefas (${tarefas.length})` },
            { id: 'notas', label: `Notas (${notas.length})` },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setAba(item.id)}
              className={`border-b-2 px-4 py-3 text-sm font-bold transition ${
                aba === item.id
                  ? 'border-slate-950 text-slate-950'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {aba === 'tarefas' && (
          <div className="mt-6 grid gap-5 lg:grid-cols-[320px_minmax(0,1fr)]">
            <form onSubmit={handleAddTarefa} className="h-fit rounded-lg border border-slate-200 bg-white p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Nova tarefa</p>
              <input
                value={tituloTarefa}
                onChange={event => setTituloTarefa(event.target.value)}
                placeholder="Titulo da tarefa"
                className="mt-3 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
              />
              <textarea
                value={descricaoTarefa}
                onChange={event => setDescricaoTarefa(event.target.value)}
                placeholder="Descricao"
                rows={3}
                className="mt-2 w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
              />
              <button className="mt-3 w-full rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
                Adicionar
              </button>
            </form>

            <div className="space-y-3">
              {tarefas.length === 0 ? (
                <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-sm font-medium text-slate-500">
                  Nenhuma tarefa cadastrada.
                </div>
              ) : (
                tarefas.map(tarefa => (
                  <TarefaCard key={tarefa.id} tarefa={tarefa} cor={projeto.cor} />
                ))
              )}
            </div>
          </div>
        )}

        {aba === 'notas' && (
          <div className="mt-6 grid gap-5 lg:grid-cols-[320px_minmax(0,1fr)]">
            <form onSubmit={handleAddNota} className="h-fit rounded-lg border border-slate-200 bg-white p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Nova nota</p>
              <input
                value={tituloNota}
                onChange={event => setTituloNota(event.target.value)}
                placeholder="Titulo da nota"
                className="mt-3 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
              />
              <textarea
                value={conteudoNota}
                onChange={event => setConteudoNota(event.target.value)}
                placeholder="Conteudo"
                rows={5}
                className="mt-2 w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
              />
              <button className="mt-3 w-full rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
                Salvar
              </button>
            </form>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {notas.length === 0 ? (
                <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-sm font-medium text-slate-500 sm:col-span-2">
                  Nenhuma nota cadastrada.
                </div>
              ) : (
                notas.map(nota => (
                  <NotaCard key={nota.id} nota={nota} cor={projeto.cor} />
                ))
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  )
}

export default function Projeto() {
  const { id } = useParams()
  const { projetos } = useProjetos()
  const navigate = useNavigate()
  const projeto = projetos.find(item => item.id === Number(id))

  if (!projeto) {
    return (
      <main className="min-h-[calc(100vh-65px)] bg-slate-50 px-5 py-12">
        <div className="mx-auto max-w-xl rounded-lg border border-slate-200 bg-white p-8 text-center">
          <p className="font-semibold text-slate-800">Projeto nao encontrado.</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Voltar
          </button>
        </div>
      </main>
    )
  }

  return (
    <TarefaProvider projetoId={projeto.id}>
      <NotaProvider projetoId={projeto.id}>
        <ProjetoInner projeto={projeto} />
      </NotaProvider>
    </TarefaProvider>
  )
}