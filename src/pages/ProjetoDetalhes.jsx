import { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import { ChevronLeft, Trash2 } from 'lucide-react';
import TarefaCard from '../components/TarefaCard';

export default function ProjetoDetalhes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, tasks, notes, taskMap, noteMap, handleAddTask, handleAddNote, handleDeleteNote } = useContext(DataContext);
  
  const [activeTab, setActiveTab] = useState('tarefas');
  
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');

  const project = projects.find(p => p.id === id);
  if (!project) return <p className="dark:text-white">Projeto não encontrado.</p>;

  const projectTasks = tasks.filter(t => taskMap[t.id] === project.id);
  const projectNotes = notes.filter(n => noteMap[n.id] === project.id);
  
  const completed = projectTasks.filter(t => t.done).length;
  const pending = projectTasks.length - completed;

  const submitTask = (e) => {
    e.preventDefault();
    if (!taskTitle) return;
    handleAddTask(taskTitle, taskDesc, project.id);
    setTaskTitle(''); setTaskDesc('');
  };

  const submitNote = (e) => {
    e.preventDefault();
    if (!noteTitle) return;
    handleAddNote(noteTitle, noteContent, project.id);
    setNoteTitle(''); setNoteContent('');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/')} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors">
            <ChevronLeft size={24} className="text-gray-600 dark:text-gray-300" />
          </button>
          <div className={`w-10 h-10 rounded-md flex items-center justify-center text-white font-bold text-xl ${project.color}`}>
            {project.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 dark:text-gray-500 tracking-wider">PROJETO</p>
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">{project.name}</h1>
          </div>
        </div>

        <div className="flex gap-6 pr-4">
          <div className="text-center"><p className="text-lg font-bold dark:text-white">{projectTasks.length}</p><p className="text-xs text-gray-500 dark:text-gray-400">TAREFAS</p></div>
          <div className="text-center"><p className="text-lg font-bold dark:text-white">{pending}</p><p className="text-xs text-gray-500 dark:text-gray-400">PENDENTES</p></div>
          <div className="text-center"><p className="text-lg font-bold dark:text-white">{completed}</p><p className="text-xs text-gray-500 dark:text-gray-400">FEITAS</p></div>
          <div className="text-center"><p className="text-lg font-bold dark:text-white">{projectNotes.length}</p><p className="text-xs text-gray-500 dark:text-gray-400">NOTAS</p></div>
        </div>
      </div>

      <div className="flex gap-6 border-b border-gray-200 dark:border-gray-700 mb-6 transition-colors">
        <button 
          onClick={() => setActiveTab('tarefas')} 
          className={`pb-2 font-medium text-sm ${activeTab === 'tarefas' ? 'border-b-2 border-black dark:border-white text-black dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'}`}
        >
          Tarefas ({projectTasks.length})
        </button>
        <button 
          onClick={() => setActiveTab('notas')} 
          className={`pb-2 font-medium text-sm ${activeTab === 'notas' ? 'border-b-2 border-black dark:border-white text-black dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'}`}
        >
          Notas ({projectNotes.length})
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-4">
          {activeTab === 'tarefas' ? (
            <div className="bg-white dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm transition-colors">
              <p className="text-xs font-bold text-gray-400 dark:text-gray-500 mb-4 tracking-wider">NOVA TAREFA</p>
              <form onSubmit={submitTask} className="flex flex-col gap-3">
                <input type="text" placeholder="Título da tarefa" value={taskTitle} onChange={e => setTaskTitle(e.target.value)} className="border dark:border-gray-600 bg-transparent rounded-md p-2 outline-none focus:border-gray-500 dark:focus:border-gray-400 dark:text-white" />
                <textarea placeholder="Descrição" value={taskDesc} onChange={e => setTaskDesc(e.target.value)} className="border dark:border-gray-600 bg-transparent rounded-md p-2 h-24 resize-none outline-none focus:border-gray-500 dark:focus:border-gray-400 dark:text-white" />
                <button type="submit" className="bg-black dark:bg-white text-white dark:text-gray-900 py-2 rounded-md font-medium mt-2 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">Adicionar</button>
              </form>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm transition-colors">
              <p className="text-xs font-bold text-gray-400 dark:text-gray-500 mb-4 tracking-wider">NOVA NOTA</p>
              <form onSubmit={submitNote} className="flex flex-col gap-3">
                <input type="text" placeholder="Título da nota" value={noteTitle} onChange={e => setNoteTitle(e.target.value)} className="border dark:border-gray-600 bg-transparent rounded-md p-2 outline-none focus:border-gray-500 dark:focus:border-gray-400 dark:text-white" />
                <textarea placeholder="Conteúdo" value={noteContent} onChange={e => setNoteContent(e.target.value)} className="border dark:border-gray-600 bg-transparent rounded-md p-2 h-24 resize-none outline-none focus:border-gray-500 dark:focus:border-gray-400 dark:text-white" />
                <button type="submit" className="bg-black dark:bg-white text-white dark:text-gray-900 py-2 rounded-md font-medium mt-2 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">Salvar</button>
              </form>
            </div>
          )}
        </div>

        <div className="md:col-span-8">
          {activeTab === 'tarefas' ? (
            projectTasks.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-8 text-center rounded-lg text-gray-500 dark:text-gray-400 transition-colors">Nenhuma tarefa cadastrada.</div>
            ) : (
              projectTasks.map(task => <TarefaCard key={task.id} task={task} />)
            )
          ) : (
            projectNotes.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-8 text-center rounded-lg text-gray-500 dark:text-gray-400 transition-colors">Nenhuma nota cadastrada.</div>
            ) : (
              <div className="grid gap-3">
                {projectNotes.map(note => (
                  <div key={note.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm flex justify-between items-start transition-colors">
                    <div>
                      <h3 className="font-bold text-gray-800 dark:text-white">{note.title}</h3>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 mb-2">{new Date(note.createdAt).toLocaleDateString('pt-BR')}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{note.content}</p>
                    </div>
                    <button onClick={() => handleDeleteNote(note.id)} className="text-gray-400 hover:text-red-500 dark:hover:text-red-400">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )
          )}
        </div>

      </div>
    </div>
  );
}