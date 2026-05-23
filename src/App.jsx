import { TaskProvider } from './context/TaskContext'
import AppRoutes from './routes/AppRoutes'

export default function App() {
  return (
    <TaskProvider>
      <AppRoutes />
    </TaskProvider>
  )
}
