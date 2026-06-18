import { DataProvider } from './context/DataContext';
import { ThemeProvider } from './context/ThemeContext'; // <-- Importação do tema
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    // O ThemeProvider precisa ficar por fora de tudo para "espalhar" o tema para o AppRoutes e o Header
    <ThemeProvider>
      <DataProvider>
        <AppRoutes />
      </DataProvider>
    </ThemeProvider>
  );
}