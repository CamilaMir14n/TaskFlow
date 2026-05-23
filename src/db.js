// db.js — Banco de dados local (localStorage)
// As tarefas persistem mesmo após fechar o navegador.

const DB_KEY = 'taskflow_tasks'

const DEFAULT_TASKS = [
  { id: 1, title: 'Estudar React JS', description: 'Revisar hooks e componentização', done: false },
  { id: 2, title: 'Configurar o projeto', description: 'Instalar dependências e Tailwind CSS', done: true },
  { id: 3, title: 'Criar os componentes', description: 'Header, cards e formulário', done: false },
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

// Salva a lista inteira
export function saveTasks(tasks) {
  localStorage.setItem(DB_KEY, JSON.stringify(tasks))
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

// Alterna concluída / pendente
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

// Apaga tudo (útil pra testes)
export function clearTasks() {
  localStorage.removeItem(DB_KEY)
}
