import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Template1 from './pages/Template1'
import Template2 from './pages/Template2'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/template-1" element={<Template1 />} />
      <Route path="/template-2" element={<Template2 />} />
    </Routes>
  )
}
