import { createContext, useState, useEffect } from 'react';
import * as db from '../db.js'; // db.js intocado!

export const DataContext = createContext();

export function DataProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [notes, setNotes] = useState([]);
  const [projects, setProjects] = useState([]);
  
  // Mapeamentos: guarda qual ID de tarefa/nota pertence a qual ID de projeto
  const [taskMap, setTaskMap] = useState({});
  const [noteMap, setNoteMap] = useState({});

  useEffect(() => {
    // Carrega do db.js original
    const loadedTasks = db.getTasks();
    const loadedNotes = db.getNotes();
    setTasks(loadedTasks);
    setNotes(loadedNotes);

    // Carrega nossa camada extra de projetos
    const savedProjects = JSON.parse(localStorage.getItem('taskflow_ext_projects')) || [];
    const savedTaskMap = JSON.parse(localStorage.getItem('taskflow_ext_taskMap')) || {};
    const savedNoteMap = JSON.parse(localStorage.getItem('taskflow_ext_noteMap')) || {};

    // Se for o primeiro acesso, cria um projeto inicial para abrigar os dados padrão do db.js
    if (savedProjects.length === 0) {
      const defaultProj = { 
        id: '1', name: 'Projeto Inicial', color: 'bg-red-500', createdAt: new Date().toISOString() 
      };
      setProjects([defaultProj]);
      
      const initialTaskMap = {};
      const initialNoteMap = {};
      loadedTasks.forEach(t => initialTaskMap[t.id] = '1');
      loadedNotes.forEach(n => initialNoteMap[n.id] = '1');
      
      setTaskMap(initialTaskMap);
      setNoteMap(initialNoteMap);
    } else {
      setProjects(savedProjects);
      setTaskMap(savedTaskMap);
      setNoteMap(savedNoteMap);
    }
  }, []);

  // Salva a camada extra sempre que mudar
  useEffect(() => {
    if (projects.length > 0) {
      localStorage.setItem('taskflow_ext_projects', JSON.stringify(projects));
      localStorage.setItem('taskflow_ext_taskMap', JSON.stringify(taskMap));
      localStorage.setItem('taskflow_ext_noteMap', JSON.stringify(noteMap));
    }
  }, [projects, taskMap, noteMap]);

  // --- Funções com a nossa camada de Projetos ---
  const handleAddProject = (name, color) => {
    const newProj = { id: Date.now().toString(), name, color, createdAt: new Date().toISOString() };
    setProjects(prev => [...prev, newProj]);
  };

  const handleAddTask = (title, description, projectId) => {
    const updatedTasks = db.addTask({ title, description });
    const newTask = updatedTasks[0]; // db.js adiciona no começo da lista
    setTaskMap(prev => ({ ...prev, [newTask.id]: projectId }));
    setTasks(updatedTasks);
  };

  const handleAddNote = (title, content, projectId) => {
    const updatedNotes = db.addNote({ title, content });
    const newNote = updatedNotes[0];
    setNoteMap(prev => ({ ...prev, [newNote.id]: projectId }));
    setNotes(updatedNotes);
  };

  // --- Funções de repasse direto pro db.js ---
  const handleToggleTask = (id) => setTasks(db.toggleTask(id));
  const handleDeleteTask = (id) => setTasks(db.deleteTask(id));
  const handleDeleteNote = (id) => setNotes(db.deleteNote(id));
  const handleAddComment = (taskId, content) => db.addComment(taskId, content);
  const handleDeleteComment = (taskId, commentId) => db.deleteComment(taskId, commentId);
  const fetchComments = (taskId) => db.getComments(taskId);

  return (
    <DataContext.Provider value={{
      tasks, notes, projects, taskMap, noteMap,
      handleAddProject, handleAddTask, handleAddNote,
      handleToggleTask, handleDeleteTask, handleDeleteNote,
      handleAddComment, handleDeleteComment, fetchComments
    }}>
      {children}
    </DataContext.Provider>
  );
}