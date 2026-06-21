import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { ConsultationPreset } from '../data/consultationForm'

type ConsultationFormContextValue = {
  isOpen: boolean
  preset: ConsultationPreset | null
  openForm: (preset?: ConsultationPreset) => void
  closeForm: () => void
}

const ConsultationFormContext = createContext<ConsultationFormContextValue | null>(null)

export function ConsultationFormProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [preset, setPreset] = useState<ConsultationPreset | null>(null)

  const openForm = useCallback((nextPreset?: ConsultationPreset) => {
    setPreset(nextPreset ?? null)
    setIsOpen(true)
  }, [])

  const closeForm = useCallback(() => {
    setIsOpen(false)
  }, [])

  const value = useMemo(
    () => ({ isOpen, preset, openForm, closeForm }),
    [isOpen, preset, openForm, closeForm],
  )

  return (
    <ConsultationFormContext.Provider value={value}>{children}</ConsultationFormContext.Provider>
  )
}

export function useConsultationForm() {
  const context = useContext(ConsultationFormContext)
  if (!context) {
    throw new Error('useConsultationForm must be used within ConsultationFormProvider')
  }
  return context
}
