// db.js — Banco de dados local (localStorage)
// As tarefas persistem mesmo após fechar o navegador.

const DB_KEY_TASKS = 'taskflow_tasks'
const DB_KEY_COMMENTS = 'taskflow_comments'
const DB_KEY_NOTES = 'taskflow_notes'

const DEFAULT_TASKS = [
  { id: 1, title: 'Estudar React JS', description: 'Revisar hooks e componentização', done: false },
  { id: 2, title: 'Configurar o projeto', description: 'Instalar dependências e Tailwind CSS', done: true },
  { id: 3, title: 'Criar os componentes', description: 'Header, cards e formulário', done: false },
]

const TASK_COMMENTS = [
  { id: 1, taskId: 1, content: 'Também utilizar o material didático no Moodle' }
]

const NOTES = [
  { id: 1, title: 'O que é TaskFlow', content: 'TaskFlow é o melhor gerenciador de tarefas criado pela raça humana, de acordo com pelo menos uma pessoa.' }
]

// Lê todas as tarefas
export function getTasks() {
  const raw = localStorage.getItem(DB_KEY_TASKS)
  if (!raw) {
    saveTasks(DEFAULT_TASKS)
    return DEFAULT_TASKS
  }
  return JSON.parse(raw)
}

// Lê os comentários de uma tarefa
export function getComments(taskId) {
  const raw = localStorage.getItem(DB_KEY_COMMENTS)
  if (!raw) {
    saveComments(taskId, TASK_COMMENTS.filter(c => c.taskId === taskId))
    return TASK_COMMENTS.filter(c => c.taskId === taskId)
  }
  return JSON.parse(raw).filter(c => c.taskId === taskId)
}

// Lê todas as notas
export function getNotes() {
  const raw = localStorage.getItem(DB_KEY_NOTES)
  if (!raw){
    saveNotes(NOTES)
    return NOTES
  }
  return JSON.parse(raw)
}

// Salva a lista inteira
export function saveTasks(tasks) {
  localStorage.setItem(DB_KEY_TASKS, JSON.stringify(tasks))
}

// Salva os comentários de uma tarefa
export function saveComments(taskId, comments) {
  const others = TASK_COMMENTS.filter(c => c.taskId !== taskId)
  const updated = [...others, ...comments]
  localStorage.setItem(DB_KEY_COMMENTS, JSON.stringify(updated))
}

// Salva todas as notas
export function saveNotes(notes) {
  localStorage.setItem(DB_KEY_NOTES, JSON.stringify(notes))
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

// Adiciona um comentário novo numa tarefa
export function addComment(taskId, content) {
  const newComment = {
    id: Date.now() * 3,
    taskId,
    content: content || '',
    createdAt: new Date().toISOString()
  }
  const comments = getComments(taskId)
  const updated = [...comments, newComment]
  saveComments(taskId, updated)
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
  const comments = getComments(id).filter(c => c.taskId !== id)
  //comments.forEach(c => deleteComment(id, c.id)) // alternativa: apagar os comentários um a um
  const tasks = getTasks().filter(t => t.id !== id)
  saveTasks(tasks)
  saveComments(id, comments)
  return tasks
}

// Remove um comentário
export function deleteComment(taskId, commentId) {
  const comments = getComments(taskId).filter(c => c.id !== commentId)
  saveComments(taskId, comments)
  return comments
}

// Remove uma nota
export function deleteNote(id) {
  const notes = getNotes().filter(t => t.id !== id)
  saveNotes(notes)
  return notes
}

// Apaga tudo (útil pra testes)
export function clearEverything() {
  localStorage.removeItem(DB_KEY_TASKS)
  localStorage.removeItem(DB_KEY_COMMENTS)
  localStorage.removeItem(DB_KEY_NOTES)
}
