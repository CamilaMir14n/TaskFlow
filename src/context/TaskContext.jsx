import { createContext, useContext, useState } from 'react'
import {
  getProjects, getTasks, getComments, getNotes,
  addProject as dbAddProject, addTask as dbAddTask, addComment as dbAddComment, addNote as dbAddNote,
  toggleTask as dbToggle,
  deleteProject as dbDeleteProject, deleteTask as dbDeleteTask, deleteComment as dbDeleteComment, deleteNote as dbDeleteNote } from '../db'

const ProjectContext = createContext(null)
const TaskContext = createContext(null)
const CommentsContext = createContext(null)
const NotesContext = createContext(null)

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState(() => getProjects())

  const addProject = (name) => {
    setProjects(dbAddProject(name))
  }

  const deleteProject = (id) => {
    setProjects(dbDeleteProject(id))
  }

  return (
    <ProjectContext.Provider value={{ projects, addProject, deleteProject }}>
      {children}
    </ProjectContext.Provider>
  )
}

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

export function CommentsProvider({ taskId, children }) {
  const [comments, setComments] = useState(() => getComments(taskId))

  const addComment = (content) => {
    setComments(dbAddComment(taskId, content))
  }

  const deleteComment = (commentId) => {
    setComments(dbDeleteComment(taskId, commentId))
  }

  return (
    <CommentsContext.Provider value={{ comments, addComment, deleteComment }}>
      {children}
    </CommentsContext.Provider>
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

export function useProjects() {
  return useContext(ProjectContext)
}

export function useTasks() {
  return useContext(TaskContext)
}

export function useComments() {
  return useContext(CommentsContext)
}

export function useNotes() {
  return useContext(NotesContext)
}