import { Navigate, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Template1 from './pages/Template1'

export default function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Template1 />} />
        <Route path="/template-1" element={<Navigate to="/" replace />} />
      </Routes>
    </ThemeProvider>
  )
}
