import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from '../components/Header'
import Home from '../pages/Home'
import NovaTarefa from '../pages/NovaTarefa'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nova" element={<NovaTarefa />} />
      </Routes>
    </BrowserRouter>
  )
}
