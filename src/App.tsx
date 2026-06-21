import { Navigate, Route, Routes } from 'react-router-dom'
import { ConsultationFormModal } from './components/shared/ConsultationFormModal'
import { ConsultationFormProvider } from './context/ConsultationFormContext'
import { ThemeProvider } from './context/ThemeContext'
import Template1 from './pages/Template1'

export default function App() {
  return (
    <ThemeProvider>
      <ConsultationFormProvider>
        <Routes>
          <Route path="/" element={<Template1 />} />
          <Route path="/template-1" element={<Navigate to="/" replace />} />
        </Routes>
        <ConsultationFormModal />
      </ConsultationFormProvider>
    </ThemeProvider>
  )
}
