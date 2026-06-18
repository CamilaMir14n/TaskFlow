import { useContext } from 'react';
import { TaskContext } from '../context/DataContext';

export default function NotaCard({ note }) {
  const { handleDeleteNote } = useContext(TaskContext);

  return (
    <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded shadow-sm border border-yellow-200 dark:border-yellow-700/50 relative group transition-colors">
      <button 
        onClick={() => handleDeleteNote(note.id)}
        className="absolute top-2 right-2 text-red-400 hover:text-red-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity"
      >
        X
      </button>
      <h3 className="font-bold text-lg mb-1 pr-6 text-yellow-900 dark:text-yellow-200">{note.title}</h3>
      <p className="text-yellow-800 dark:text-yellow-100 text-sm whitespace-pre-wrap">{note.content}</p>
    </div>
  );
}