import { createContext, useContext, useState } from 'react'
import {
  getProjetos,
  addProjeto as dbAddProjeto,
  deleteProjeto as dbDeleteProjeto,
  getTarefas,
  addTarefa as dbAddTarefa,
  toggleTarefa as dbToggle,
  deleteTarefa as dbDeleteTarefa,
  getNotas,
  addNota as dbAddNota,
  deleteNota as dbDeleteNota,
  getComentarios,
  addComentario as dbAddComentario,
  deleteComentario as dbDeleteComentario,
} from '../db'

const ProjetoCtx = createContext(null)
const TarefaCtx = createContext(null)
const NotaCtx = createContext(null)
const ComentarioCtx = createContext(null)

export function ProjetoProvider({ children }) {
  const [projetos, setProjetos] = useState(() => getProjetos())

  const addProjeto = (nome, cor) => setProjetos(dbAddProjeto(nome, cor))
  const deleteProjeto = id => setProjetos(dbDeleteProjeto(id))

  return (
    <ProjetoCtx.Provider value={{ projetos, addProjeto, deleteProjeto }}>
      {children}
    </ProjetoCtx.Provider>
  )
}

export function TarefaProvider({ projetoId, children }) {
  const [tarefas, setTarefas] = useState(() => getTarefas(projetoId))

  const addTarefa = data => setTarefas(dbAddTarefa(data))

  const toggleTarefa = id => {
    dbToggle(id)
    setTarefas(getTarefas(projetoId))
  }

  const deleteTarefa = id => {
    dbDeleteTarefa(id)
    setTarefas(getTarefas(projetoId))
  }

  return (
    <TarefaCtx.Provider value={{ tarefas, addTarefa, toggleTarefa, deleteTarefa }}>
      {children}
    </TarefaCtx.Provider>
  )
}

export function NotaProvider({ projetoId, children }) {
  const [notas, setNotas] = useState(() => getNotas(projetoId))

  const addNota = data => setNotas(dbAddNota(data))

  const deleteNota = id => {
    dbDeleteNota(id)
    setNotas(getNotas(projetoId))
  }

  return (
    <NotaCtx.Provider value={{ notas, addNota, deleteNota }}>
      {children}
    </NotaCtx.Provider>
  )
}

export function ComentarioProvider({ tarefaId, children }) {
  const [comentarios, setComentarios] = useState(() => getComentarios(tarefaId))

  const addComentario = conteudo => setComentarios(dbAddComentario(tarefaId, conteudo))
  const deleteComentario = id => setComentarios(dbDeleteComentario(tarefaId, id))

  return (
    <ComentarioCtx.Provider value={{ comentarios, addComentario, deleteComentario }}>
      {children}
    </ComentarioCtx.Provider>
  )
}

export const useProjetos = () => useContext(ProjetoCtx)
export const useTarefas = () => useContext(TarefaCtx)
export const useNotas = () => useContext(NotaCtx)
export const useComentarios = () => useContext(ComentarioCtx)
