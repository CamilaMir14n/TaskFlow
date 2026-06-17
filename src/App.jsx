import { ProjetoProvider } from './context/TaskContext'
import AppRoutes from './routes/AppRoutes'

export default function App() {
  return (
    <ProjetoProvider>
      <AppRoutes />
    </ProjetoProvider>
  )
}
