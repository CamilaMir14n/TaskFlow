import { createContext, useContext, useState } from 'react'
import { getTasks, addTask as dbAdd, toggleTask as dbToggle, deleteTask as dbDelete } from '../db'

const TaskContext = createContext(null)

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => getTasks())

  const addTask = (data) => {
    setTasks(dbAdd(data))
  }

  const toggleTask = (id) => {
    setTasks(dbToggle(id))
  }

  const deleteTask = (id) => {
    setTasks(dbDelete(id))
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  )
}

export function useTasks() {
  return useContext(TaskContext)
}
