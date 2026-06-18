import { useState, useContext } from 'react';
import { TaskContext } from '../context/DataContext';
import TarefaCard from '../components/TarefaCard';
import NotaCard from '../components/NotaCard';

export default function Home() {
  const { tasks, notes, handleAddTask, handleAddNote } = useContext(TaskContext);
  
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');

  const submitTask = (e) => {
    e.preventDefault();
    if (!taskTitle) return;
    handleAddTask(taskTitle, taskDesc);
    setTaskTitle(''); setTaskDesc('');
  };

  const submitNote = (e) => {
    e.preventDefault();
    if (!noteTitle) return;
    handleAddNote(noteTitle, noteContent);
    setNoteTitle(''); setNoteContent('');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Coluna de Tarefas */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
        <h2 className="text-2xl font-semibold mb-4 border-b dark:border-gray-700 pb-2 dark:text-gray-100">Minhas Tarefas</h2>
        <form onSubmit={submitTask} className="mb-6 flex flex-col gap-2">
          <input 
            type="text" placeholder="Título da tarefa..." 
            className="border dark:border-gray-600 p-2 rounded outline-none focus:border-blue-400 dark:bg-gray-700 dark:text-white"
            value={taskTitle} onChange={e => setTaskTitle(e.target.value)} required 
          />
          <input 
            type="text" placeholder="Descrição (opcional)" 
            className="border dark:border-gray-600 p-2 rounded outline-none focus:border-blue-400 dark:bg-gray-700 dark:text-white"
            value={taskDesc} onChange={e => setTaskDesc(e.target.value)} 
          />
          <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition font-medium">
            Adicionar Tarefa
          </button>
        </form>

        <div className="flex flex-col gap-3">
          {tasks.map(task => <TarefaCard key={task.id} task={task} />)}
        </div>
      </section>

      {/* Coluna de Notas */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
        <h2 className="text-2xl font-semibold mb-4 border-b dark:border-gray-700 pb-2 dark:text-gray-100">Anotações Rápidas</h2>
        <form onSubmit={submitNote} className="mb-6 flex flex-col gap-2">
          <input 
            type="text" placeholder="Título da nota..." 
            className="border dark:border-gray-600 p-2 rounded outline-none focus:border-yellow-400 dark:bg-gray-700 dark:text-white"
            value={noteTitle} onChange={e => setNoteTitle(e.target.value)} required 
          />
          <textarea 
            placeholder="Conteúdo..." 
            className="border dark:border-gray-600 p-2 rounded h-20 resize-none outline-none focus:border-yellow-400 dark:bg-gray-700 dark:text-white"
            value={noteContent} onChange={e => setNoteContent(e.target.value)} 
          />
          <button type="submit" className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 transition font-medium">
            Adicionar Nota
          </button>
        </form>

        <div className="grid grid-cols-1 gap-4">
          {notes.map(note => <NotaCard key={note.id} note={note} />)}
        </div>
      </section>
    </div>
  );
}