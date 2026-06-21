import { useConsultationForm } from '../../context/ConsultationFormContext'
import type { ConsultationPreset } from '../../data/consultationForm'

type BookConsultationButtonProps = {
  children: React.ReactNode
  className?: string
  preset?: ConsultationPreset
}

export function BookConsultationButton({
  children,
  className,
  preset,
}: BookConsultationButtonProps) {
  const { openForm } = useConsultationForm()

  return (
    <button type="button" onClick={() => openForm(preset)} className={className}>
      {children}
    </button>
  )
}
