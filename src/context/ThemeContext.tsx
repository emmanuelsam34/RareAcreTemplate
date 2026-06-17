import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type Theme = 'light' | 'dark'
export type TemplateId = '1' | '2'

const storageKey = (templateId: TemplateId) => `rareacre-theme-${templateId}`

const defaultTheme = (templateId: TemplateId): Theme => (templateId === '2' ? 'dark' : 'light')

function readTheme(templateId: TemplateId): Theme {
  if (typeof window === 'undefined') return defaultTheme(templateId)
  const stored = window.localStorage.getItem(storageKey(templateId))
  if (stored === 'light' || stored === 'dark') return stored
  return defaultTheme(templateId)
}

function applyTheme(theme: Theme) {
  const root = document.documentElement
  root.classList.toggle('dark', theme === 'dark')
  root.style.colorScheme = theme
}

type ThemeContextValue = {
  theme: Theme
  isDark: boolean
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function TemplateThemeProvider({
  templateId,
  children,
}: {
  templateId: TemplateId
  children: ReactNode
}) {
  const [theme, setThemeState] = useState<Theme>(() => readTheme(templateId))

  useEffect(() => {
    setThemeState(readTheme(templateId))
  }, [templateId])

  useEffect(() => {
    applyTheme(theme)
    window.localStorage.setItem(storageKey(templateId), theme)
  }, [theme, templateId])

  const setTheme = useCallback((next: Theme) => setThemeState(next), [])

  const toggleTheme = useCallback(() => {
    setThemeState((current) => (current === 'dark' ? 'light' : 'dark'))
  }, [])

  const value = useMemo(
    () => ({
      theme,
      isDark: theme === 'dark',
      setTheme,
      toggleTheme,
    }),
    [theme, setTheme, toggleTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within TemplateThemeProvider')
  }
  return context
}
