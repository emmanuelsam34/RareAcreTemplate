import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useConsultationForm } from '../../context/ConsultationFormContext'
import { useTheme } from '../../context/ThemeContext'
import {
  developmentFeasibilityOptions,
  propertyLocations,
  propertyTypes,
  verificationOptions,
  type ConsultationPreset,
} from '../../data/consultationForm'
import { formatFileSize, validateDocument } from '../../lib/documentUpload'
import { sanitizeFileName } from '../../lib/sanitize'
import {
  buildSanitizedSubmission,
  submitConsultationEnquiry,
} from '../../services/submitConsultationEnquiry'

type FormState = {
  development: string[]
  verification: string[]
  projectPlanning: boolean
  propertyLocation: string
  propertyType: string
  propertySize: string
  name: string
  email: string
  address: string
  phone: string
}

const emptyForm: FormState = {
  development: [],
  verification: [],
  projectPlanning: false,
  propertyLocation: '',
  propertyType: '',
  propertySize: '',
  name: '',
  email: '',
  address: '',
  phone: '',
}

function buildInitialForm(preset: ConsultationPreset | null): FormState {
  return {
    ...emptyForm,
    development: preset?.development ? [...preset.development] : [],
    verification: preset?.verification ? [...preset.verification] : [],
    projectPlanning: preset?.projectPlanning ?? false,
  }
}

function toggleValue(list: string[], value: string) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value]
}

export function ConsultationFormModal() {
  const { isOpen, preset, closeForm } = useConsultationForm()
  const { isDark } = useTheme()
  const [form, setForm] = useState<FormState>(() => buildInitialForm(preset))
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [documentError, setDocumentError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isOpen) {
      setForm(buildInitialForm(preset))
      setUploadedFile(null)
      setDocumentError('')
      setSubmitted(false)
      setError('')
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = ''
      }
    }
    document.body.style.overflow = ''
  }, [isOpen, preset])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) closeForm()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, closeForm])

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }))
  }

  const handleDocumentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) {
      setUploadedFile(null)
      setDocumentError('')
      return
    }

    const validationError = validateDocument(file)
    if (validationError) {
      setUploadedFile(null)
      setDocumentError(validationError)
      event.target.value = ''
      return
    }

    setUploadedFile(file)
    setDocumentError('')
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError('')

    if (documentError) {
      setError(documentError)
      return
    }

    setSubmitting(true)
    try {
      const payload = buildSanitizedSubmission(form, preset?.packageName)
      await submitConsultationEnquiry(payload, uploadedFile)
      setSubmitted(true)
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Unable to submit your enquiry. Please try again.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  const labelClass = 'font-poppins text-[11px] font-semibold uppercase tracking-[0.12em] text-ink/60 dark:text-white/55'
  const inputClass =
    'mt-1.5 w-full rounded-xl border border-black/10 bg-white px-3.5 py-3 font-lato text-sm text-ink outline-none transition focus:border-red dark:border-white/15 dark:bg-white/5 dark:text-white'
  const sectionClass = 'rounded-2xl border border-black/8 bg-cloud/70 p-5 dark:border-white/10 dark:bg-white/5'
  const checkboxClass =
    'flex cursor-pointer items-start gap-3 rounded-xl border border-black/8 bg-white px-4 py-3 text-sm transition hover:border-red/40 dark:border-white/10 dark:bg-white/5 dark:hover:border-red/40'

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 p-0 sm:items-center sm:p-6"
          onClick={closeForm}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="consultation-form-title"
            className={`relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl shadow-2xl sm:rounded-3xl ${
              isDark ? 'bg-[#181818] text-white' : 'bg-white text-ink'
            }`}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-black/8 px-6 py-5 dark:border-white/10">
              <div>
                <p className="font-poppins text-xs font-semibold uppercase tracking-[0.18em] text-red">
                  RareAcre Consultation
                </p>
                <h2
                  id="consultation-form-title"
                  className="mt-2 font-poppins text-2xl font-semibold text-ink-dark dark:text-white"
                >
                  Consultation &amp; Advisory Services
                </h2>
                {preset?.packageName && (
                  <p className="mt-2 inline-block rounded-full bg-red/10 px-3 py-1 font-poppins text-xs font-semibold text-red">
                    Selected: {preset.packageName}
                  </p>
                )}
              </div>
              <button
                type="button"
                aria-label="Close form"
                onClick={closeForm}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-xl transition hover:border-red hover:text-red dark:border-white/15"
              >
                ×
              </button>
            </div>

            <div className="overflow-y-auto px-6 py-6">
              {submitted ? (
                <div className="py-10 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red text-2xl text-white">
                    ✓
                  </div>
                  <h3 className="mt-6 font-poppins text-2xl font-semibold text-ink-dark dark:text-white">
                    Thanks for submitting your contact info!
                  </h3>
                  <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink/75 dark:text-white/70">
                    Our advisory team will review your enquiry and respond within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={closeForm}
                    className="mt-8 rounded-full bg-black px-8 py-3.5 font-poppins text-xs font-bold uppercase tracking-[0.12em] text-white transition hover:bg-red"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <section className={sectionClass}>
                    <h3 className="font-poppins text-sm font-bold uppercase tracking-[0.14em] text-red">
                      Development Feasibility Assessment
                    </h3>
                    <div className="mt-4 space-y-3">
                      {developmentFeasibilityOptions.map((option) => (
                        <label key={option} className={checkboxClass}>
                          <input
                            type="checkbox"
                            checked={form.development.includes(option)}
                            onChange={() =>
                              update('development', toggleValue(form.development, option))
                            }
                            className="mt-0.5 accent-red"
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </section>

                  <section className={sectionClass}>
                    <h3 className="font-poppins text-sm font-bold uppercase tracking-[0.14em] text-red">
                      Property Verification &amp; Acquisition Advisory
                    </h3>
                    <div className="mt-4 space-y-3">
                      {verificationOptions.map((option) => (
                        <label key={option} className={checkboxClass}>
                          <input
                            type="checkbox"
                            checked={form.verification.includes(option)}
                            onChange={() =>
                              update('verification', toggleValue(form.verification, option))
                            }
                            className="mt-0.5 accent-red"
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </section>

                  <section className={sectionClass}>
                    <h3 className="font-poppins text-sm font-bold uppercase tracking-[0.14em] text-red">
                      Project Planning &amp; Structuring
                    </h3>
                    <label className={`${checkboxClass} mt-4`}>
                      <input
                        type="checkbox"
                        checked={form.projectPlanning}
                        onChange={(event) => update('projectPlanning', event.target.checked)}
                        className="mt-0.5 accent-red"
                      />
                      <span>Project Planning &amp; Structuring</span>
                    </label>
                  </section>

                  <section className={sectionClass}>
                    <label className={labelClass} htmlFor="documents-upload">
                      Upload Documents
                    </label>
                    <p className="mt-1 text-xs t1-body opacity-70 dark:text-white/55">
                      PDF, DOC, DOCX, JPG, or PNG. Maximum file size: 2MB.
                    </p>
                    <input
                      id="documents-upload"
                      type="file"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/jpeg,image/png"
                      onChange={handleDocumentChange}
                      className="mt-3 block w-full cursor-pointer rounded-xl border border-dashed border-black/15 bg-white px-3.5 py-3 text-sm file:mr-4 file:rounded-full file:border-0 file:bg-red file:px-4 file:py-2 file:font-poppins file:text-xs file:font-bold file:uppercase file:tracking-wide file:text-white dark:border-white/15 dark:bg-white/5"
                    />
                    {uploadedFile && (
                      <p className="mt-2 text-xs text-ink/70 dark:text-white/60">
                        Selected: {sanitizeFileName(uploadedFile.name)} ({formatFileSize(uploadedFile.size)})
                      </p>
                    )}
                    {documentError && (
                      <p className="mt-2 text-xs text-red">{documentError}</p>
                    )}
                  </section>

                  <section className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className={labelClass} htmlFor="property-location">
                        Property Location
                      </label>
                      <select
                        id="property-location"
                        value={form.propertyLocation}
                        onChange={(event) => update('propertyLocation', event.target.value)}
                        className={inputClass}
                      >
                        <option value="">Choose location...</option>
                        {propertyLocations.map((location) => (
                          <option key={location} value={location}>
                            {location}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={labelClass} htmlFor="property-type">
                        Property Type
                      </label>
                      <select
                        id="property-type"
                        value={form.propertyType}
                        onChange={(event) => update('propertyType', event.target.value)}
                        className={inputClass}
                      >
                        <option value="">Choose property type...</option>
                        {propertyTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className={labelClass} htmlFor="property-size">
                        Property Size
                      </label>
                      <input
                        id="property-size"
                        value={form.propertySize}
                        onChange={(event) => update('propertySize', event.target.value)}
                        placeholder="e.g. 500 sqm, 1 acre, 3-bedroom duplex plot..."
                        className={inputClass}
                      />
                    </div>
                  </section>

                  <section className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className={labelClass} htmlFor="client-name">
                        Name *
                      </label>
                      <input
                        id="client-name"
                        required
                        value={form.name}
                        onChange={(event) => update('name', event.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass} htmlFor="client-email">
                        Email *
                      </label>
                      <input
                        id="client-email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(event) => update('email', event.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className={labelClass} htmlFor="client-address">
                        Address *
                      </label>
                      <textarea
                        id="client-address"
                        required
                        value={form.address}
                        onChange={(event) => update('address', event.target.value)}
                        className={`${inputClass} min-h-24 resize-y`}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className={labelClass} htmlFor="client-phone">
                        Phone Number
                      </label>
                      <input
                        id="client-phone"
                        type="tel"
                        value={form.phone}
                        onChange={(event) => update('phone', event.target.value)}
                        placeholder="+234 or international number"
                        className={inputClass}
                      />
                    </div>
                  </section>

                  {error && (
                    <p className="rounded-xl border border-red/20 bg-red/10 px-4 py-3 text-sm text-red">
                      {error}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="rounded-full bg-red px-8 py-3.5 font-poppins text-xs font-bold uppercase tracking-[0.12em] text-white transition hover:bg-pink disabled:opacity-60"
                    >
                      {submitting ? 'Submitting...' : 'Submit Enquiry'}
                    </button>
                    <button
                      type="button"
                      onClick={closeForm}
                      className="rounded-full border border-black/10 px-8 py-3.5 font-poppins text-xs font-bold uppercase tracking-[0.12em] transition hover:border-red hover:text-red dark:border-white/15"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
