import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const { pathname } = useLocation()

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        <Link to="/" className="font-['Playfair_Display'] text-2xl font-bold text-gray-900 tracking-tight">
          TaskFlow
        </Link>
        <nav className="flex gap-2">
          <Link
            to="/"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              pathname === '/' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Tarefas
          </Link>
          <Link
            to="/nova"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              pathname === '/nova' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            + Nova tarefa
          </Link>
        </nav>
      </div>
    </header>
  )
}
