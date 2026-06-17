import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from '../components/Header'
import Home from '../pages/Home'
import Projeto from '../pages/Projeto'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projeto/:id" element={<Projeto />} />
      </Routes>
    </BrowserRouter>
  )
}
