// db.js — Banco de dados local (localStorage)
// As tarefas persistem mesmo após fechar o navegador.

const DB_KEY_PROJECTS = 'taskflow_projects'
const DB_KEY_TASKS = 'taskflow_tasks'
const DB_KEY_COMMENTS = 'taskflow_comments'
const DB_KEY_NOTES = 'taskflow_notes'

const DEFAULT_PROJECTS = [
  { id: 1, name: 'Bem-vindo ao TaskFlow!'}
]

const DEFAULT_TASKS = [
  { id: 1, projectId: 1, title: 'Estudar React JS', description: 'Revisar hooks e componentização', done: false },
  { id: 2, projectId: 1, title: 'Configurar o projeto', description: 'Instalar dependências e Tailwind CSS', done: true },
  { id: 3, projectId: 1, title: 'Criar os componentes', description: 'Header, cards e formulário', done: false },
]

const TASK_COMMENTS = [
  { id: 1, taskId: 1, content: 'Também utilizar o material didático no Moodle' }
]

const NOTES = [
  { id: 1, title: 'O que é TaskFlow', content: 'TaskFlow é o melhor gerenciador de tarefas criado pela raça humana, de acordo com pelo menos uma pessoa.' }
]

// Lê todos os projetos
export function getProjects() {
  const raw = localStorage.getItem(DB_KEY_PROJECTS)
  if (!raw) {
    saveProjects(DEFAULT_PROJECTS)
    return DEFAULT_PROJECTS
  }
  return JSON.parse(raw)
}

// Lê todas as tarefas de um projeto
export function getTasks(projectId) {
  const raw = localStorage.getItem(DB_KEY_TASKS)
  if (!raw) {
    saveTasks(DEFAULT_TASKS)
    return DEFAULT_TASKS
  }
  return JSON.parse(raw).filter(t => t.projectId === projectId)
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

// Salva todos os projetos
export function saveProjects(projects) {
  localStorage.setItem(DB_KEY_PROJECTS, JSON.stringify(projects))
}

// Salva todas as tarefas
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

// Adiciona um projeto novo
export function addProject(name) {
  const projects = getProjects()
  const newProject = {
    id: Date.now(),
    name: name || 'Novo Projeto',
    createdAt: new Date().toISOString()
  }
  const updated = [newProject, ...projects]
  saveProjects(updated)
  return updated
}

// Adiciona uma tarefa nova
export function addTask({ projectId, title, description }) {
  const tasks = getTasks(projectId)
  const newTask = {
    id: Date.now(),
    projectId,
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

// Remove um projeto (e todas as suas tarefas e comentários)
export function deleteProject(id) {
  const tasks = getTasks(id)
  tasks.forEach(t => deleteTask(t.id)) // apaga as tarefas e seus comentários
  const projects = getProjects().filter(p => p.id !== id)
  saveProjects(projects)
  return projects
}

// Remove uma tarefa
export function deleteTask(id) {
  const comments = getComments(id).filter
  comments.forEach(c => deleteComment(id, c.id)) // apaga os comentários um a um
  const tasks = getTasks().filter(t => t.id !== id)
  saveTasks(tasks)
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
  localStorage.removeItem(DB_KEY_PROJECTS)
  localStorage.removeItem(DB_KEY_TASKS)
  localStorage.removeItem(DB_KEY_COMMENTS)
  localStorage.removeItem(DB_KEY_NOTES)
}
