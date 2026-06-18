import { useState, useContext, useEffect } from 'react';
import { DataContext } from '../context/DataContext';
import { Trash2, CheckCircle2, Circle } from 'lucide-react';

export default function TarefaCard({ task }) {
  const { handleToggleTask, handleDeleteTask, handleAddComment, handleDeleteComment, fetchComments } = useContext(DataContext);
  
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    if (showComments) setComments(fetchComments(task.id));
  }, [showComments, task.id, fetchComments]);

  const submitComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    handleAddComment(task.id, newComment);
    setComments(fetchComments(task.id));
    setNewComment('');
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm mb-3 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <button onClick={() => handleToggleTask(task.id)} className="mt-0.5 flex-shrink-0 text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400">
            {task.done ? <CheckCircle2 size={20} className="text-blue-500 dark:text-blue-400" /> : <Circle size={20} />}
          </button>
          <div>
            <h3 className={`font-semibold text-gray-800 dark:text-gray-100 ${task.done ? 'line-through text-gray-500 dark:text-gray-500' : ''}`}>
              {task.title}
            </h3>
            {task.description && <p className={`text-sm mt-1 ${task.done ? 'text-gray-400 dark:text-gray-600' : 'text-gray-500 dark:text-gray-400'}`}>{task.description}</p>}
            
            <div className="flex items-center gap-3 mt-3">
              <span className={`text-xs font-medium px-2 py-1 rounded ${task.done ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                {task.done ? 'Concluída' : 'Pendente'}
              </span>
              <button onClick={() => setShowComments(!showComments)} className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 font-medium">
                {showComments ? 'Ocultar comentários' : 'Ver comentários'}
              </button>
            </div>
          </div>
        </div>
        <button onClick={() => handleDeleteTask(task.id)} className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 p-1">
          <Trash2 size={16} />
        </button>
      </div>

      {showComments && (
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">COMENTÁRIOS ({comments.length})</p>
          
          {comments.length === 0 ? (
            <p className="text-sm text-gray-400 dark:text-gray-500 mb-4">Nenhum comentário ainda.</p>
          ) : (
            <div className="space-y-3 mb-4">
              {comments.map(c => (
                <div key={c.id} className="flex flex-col group">
                  <div className="flex justify-between items-start">
                    <span className="text-sm text-gray-700 dark:text-gray-300">{c.content}</span>
                    <button onClick={() => {handleDeleteComment(task.id, c.id); setComments(fetchComments(task.id))}} className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600">
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <span className="text-xs text-gray-400 mt-1">{new Date(c.createdAt).toLocaleString('pt-BR')}</span>
                </div>
              ))}
            </div>
          )}

          <form onSubmit={submitComment} className="flex gap-2">
            <input 
              type="text" placeholder="Adicionar comentário..." 
              className="flex-1 border border-gray-300 dark:border-gray-600 bg-transparent rounded p-2 text-sm outline-none focus:border-gray-500 dark:focus:border-gray-400 dark:text-white"
              value={newComment} onChange={e => setNewComment(e.target.value)}
            />
            <button type="submit" className="bg-gray-800 dark:bg-gray-100 text-white dark:text-gray-900 px-4 py-2 rounded text-sm hover:bg-black dark:hover:bg-white font-medium">
              Enviar
            </button>
          </form>
        </div>
      )}
    </div>
  );
}