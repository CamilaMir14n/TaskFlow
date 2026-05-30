// db.js — Banco de dados local (localStorage)
// As tarefas persistem mesmo após fechar o navegador.

const DB_KEY = 'taskflow_tasks'

const DEFAULT_TASKS = [
  { id: 1, title: 'Estudar React JS', description: 'Revisar hooks e componentização', done: false },
  { id: 2, title: 'Configurar o projeto', description: 'Instalar dependências e Tailwind CSS', done: true },
  { id: 3, title: 'Criar os componentes', description: 'Header, cards e formulário', done: false },
]

const NOTES = [
  { id: 1, title: 'O que é TaskFlow', content: 'TaskFlow é o melhor gerenciador de tarefas criado pela raça humana, de acordo com pelo menos uma pessoa.' }
]

// Lê todas as tarefas
export function getTasks() {
  const raw = localStorage.getItem(DB_KEY)
  if (!raw) {
    saveTasks(DEFAULT_TASKS)
    return DEFAULT_TASKS
  }
  return JSON.parse(raw)
}

// Lê todas as notas
export function getNotes() {
  const raw = localStorage.getItem(DB_KEY)
  if (!raw){
    saveNotes(NOTES)
    return NOTES
  }
  return JSON.parse(raw)
}

// Salva a lista inteira
export function saveTasks(tasks) {
  localStorage.setItem(DB_KEY, JSON.stringify(tasks))
}

// Salva todas as notas
export function saveNotes(notes) {
  localStorage.setItem(DB_KEY, JSON.stringify(notes))
}

// Adiciona uma tarefa nova
export function addTask({ title, description }) {
  const tasks = getTasks()
  const newTask = {
    id: Date.now(),
    title,
    description: description || '',
    done: false,
    createdAt: new Date().toISOString(),
  }
  const updated = [newTask, ...tasks]
  saveTasks(updated)
  return updated
}

// Adiciona uma nota nova
export function addNote({ title, content }) {
  const notes = getNotes()
  const newNote = {
    id: Date.now() * 2,
    title,
    content: content || '',
    createdAt: new Date().toISOString()
  }
  const updated = [newNote, ...notes]
  saveNotes(updated)
  return updated
}

// Alterna tarefa concluída / pendente
export function toggleTask(id) {
  const tasks = getTasks().map(t =>
    t.id === id ? { ...t, done: !t.done } : t
  )
  saveTasks(tasks)
  return tasks
}

// Remove uma tarefa
export function deleteTask(id) {
  const tasks = getTasks().filter(t => t.id !== id)
  saveTasks(tasks)
  return tasks
}

// Remove uma nota
export function deleteNote(id) {
  const notes = getNotes().filter(t => t.id !== id)
  saveNotes(notes)
  return notes
}

// Apaga tudo (útil pra testes)
export function clearTasks() {
  localStorage.removeItem(DB_KEY)
}
