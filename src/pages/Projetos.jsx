import { useState, useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';

const COLORS = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500', 'bg-teal-500'];

export default function Projetos() {
  const { projects, tasks, notes, handleAddProject, taskMap } = useContext(DataContext);
  const navigate = useNavigate();

  const [newProjectName, setNewProjectName] = useState('');
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);

  const submitProject = (e) => {
    e.preventDefault();
    if (!newProjectName) return;
    handleAddProject(newProjectName, selectedColor);
    setNewProjectName('');
  };

  return (
    <div>
      <div className="flex justify-between items-end mb-8">
        <div>
          <p className="text-xs font-bold text-gray-400 dark:text-gray-500 tracking-wider">TASKFLOW</p>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Projetos</h1>
        </div>
        
        <div className="flex gap-4">
          <div className="bg-white dark:bg-gray-800 px-6 py-3 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm text-center transition-colors">
            <p className="text-lg font-bold text-gray-800 dark:text-gray-100">{projects.length}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">PROJETOS</p>
          </div>
          <div className="bg-white dark:bg-gray-800 px-6 py-3 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm text-center transition-colors">
            <p className="text-lg font-bold text-gray-800 dark:text-gray-100">{tasks.length}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">TAREFAS</p>
          </div>
          <div className="bg-white dark:bg-gray-800 px-6 py-3 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm text-center transition-colors">
            <p className="text-lg font-bold text-gray-800 dark:text-gray-100">{notes.length}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">NOTAS</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map(proj => {
          const projTasks = tasks.filter(t => taskMap[t.id] === proj.id);
          const completed = projTasks.filter(t => t.done).length;
          
          return (
            <div 
              key={proj.id} 
              onClick={() => navigate(`/projeto/${proj.id}`)}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 shadow-sm hover:shadow-md cursor-pointer transition-all"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-md flex items-center justify-center text-white font-bold text-xl ${proj.color}`}>
                  {proj.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 dark:text-white">{proj.name}</h3>
                  <p className="text-xs text-gray-400 dark:text-gray-500">{new Date(proj.createdAt).toLocaleDateString('pt-BR')}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-center border-t border-gray-100 dark:border-gray-700 pt-4">
                <div>
                  <p className="text-lg font-bold text-gray-800 dark:text-gray-100">{projTasks.length}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">TAREFAS</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-800 dark:text-gray-100">{completed}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">FEITAS</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-800 dark:text-gray-100">-</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">NOTAS</p>
                </div>
              </div>
            </div>
          );
        })}

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 shadow-sm transition-colors">
          <p className="text-xs font-bold text-gray-400 dark:text-gray-500 mb-3 tracking-wider">NOVO PROJETO</p>
          <form onSubmit={submitProject} className="flex flex-col gap-4">
            <input 
              type="text" placeholder="Nome do projeto" 
              className="w-full border border-gray-300 dark:border-gray-600 bg-transparent rounded-md p-2 outline-none focus:border-gray-500 dark:focus:border-gray-400 dark:text-white"
              value={newProjectName} onChange={e => setNewProjectName(e.target.value)}
            />
            <div className="flex gap-2">
              {COLORS.map(color => (
                <button 
                  key={color} type="button" onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full ${color} ${selectedColor === color ? 'ring-2 ring-offset-2 dark:ring-offset-gray-800 ring-gray-800 dark:ring-white' : ''}`}
                />
              ))}
            </div>
            <div className="flex gap-2 mt-2">
              <button type="submit" className="bg-black dark:bg-white text-white dark:text-gray-900 px-6 py-2 rounded-md font-medium hover:bg-gray-800 dark:hover:bg-gray-200 w-full transition-colors">Criar</button>
              <button type="button" onClick={() => setNewProjectName('')} className="bg-transparent text-gray-600 dark:text-gray-400 px-6 py-2 rounded-md font-medium hover:bg-gray-100 dark:hover:bg-gray-700 w-full transition-colors">Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}