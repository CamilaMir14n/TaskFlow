import { Link } from 'react-router-dom';
import { Layers, Sun, Moon } from 'lucide-react';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function Header() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-3 flex items-center justify-between transition-colors duration-300">
      <Link to="/" className="flex items-center gap-2 font-bold text-xl text-gray-800 dark:text-white">
        <div className="bg-gray-100 dark:bg-gray-700 p-1.5 rounded-md border border-gray-200 dark:border-gray-600">
          <Layers size={20} className="text-gray-700 dark:text-gray-300" />
        </div>
        TaskFlow
      </Link>

      <button 
        onClick={toggleTheme}
        className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </header>
  );
}