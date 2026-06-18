import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import Projetos from '../pages/Projetos';
import ProjetoDetalhes from '../pages/ProjetoDetalhes';

export default function AppRoutes() {
  return (
    // Adicionamos a propriedade "future" aqui para silenciar os avisos e ativar o modo v7
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-sans transition-colors duration-300">
        <Header />
        <main className="max-w-6xl mx-auto px-6 py-8">
          <Routes>
            <Route path="/" element={<Projetos />} />
            <Route path="/projeto/:id" element={<ProjetoDetalhes />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}