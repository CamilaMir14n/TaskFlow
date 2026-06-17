import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 px-5 py-3 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center gap-3">
        {!isHome && (
          <Link
            to="/"
            className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
            aria-label="Voltar"
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="12,4 6,10 12,16" />
            </svg>
          </Link>
        )}
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-slate-950 text-xs font-bold text-white">
            TF
          </span>
          <span className="text-lg font-bold tracking-tight text-slate-950">TaskFlow</span>
        </Link>
      </div>
    </header>
  )
}
