import { Routes, Route } from 'react-router-dom'
import { TemplateThemeProvider } from './context/ThemeContext'
import Home from './pages/Home'
import Template1 from './pages/Template1'
import Template2 from './pages/Template2'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/template-1"
        element={
          <TemplateThemeProvider templateId="1">
            <Template1 />
          </TemplateThemeProvider>
        }
      />
      <Route
        path="/template-2"
        element={
          <TemplateThemeProvider templateId="2">
            <Template2 />
          </TemplateThemeProvider>
        }
      />
    </Routes>
  )
}
