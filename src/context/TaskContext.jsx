import { createContext, useContext, useState } from 'react'
import { getTasks, getNotes, addTask as dbAddTask, addNote as dbAddNote, toggleTask as dbToggle, deleteTask as dbDeleteTask, deleteNote as dbDeleteNote } from '../db'

const TaskContext = createContext(null)
const NotesContext = createContext(null)

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => getTasks())

  const addTask = (data) => {
    setTasks(dbAddTask(data))
  }

  const toggleTask = (id) => {
    setTasks(dbToggle(id))
  }

  const deleteTask = (id) => {
    setTasks(dbDeleteTask(id))
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  )
}

export function NoteProvider({ children }) {
  const [notes, setNotes] = useState(() => getNotes())

  const addNote = (data) => {
    setNotes(dbAddNote(data))
  }

  const deleteNote = (id) => {
    setNotes(dbDeleteNote(id))
  }

  return (
    <NotesContext.Provider value={{ notes, addNote, deleteNote }}>
      {children}
    </NotesContext.Provider>
  )
}

export function useTasks() {
  return useContext(TaskContext)
}

export function useNotes() {
  return useContext(NotesContext)
}