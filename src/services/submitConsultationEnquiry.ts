import { EMAIL } from '../data/content'
import {
  developmentFeasibilityOptions,
  propertyLocations,
  propertyTypes,
  verificationOptions,
} from '../data/consultationForm'
import { isValidEmail, sanitizeEmail, sanitizePhone, sanitizeText } from '../lib/sanitize'

export const CONSULTATION_EMAIL = EMAIL

export type ConsultationSubmission = {
  packageName?: string
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

const allowedDevelopment = new Set<string>(developmentFeasibilityOptions)
const allowedVerification = new Set<string>(verificationOptions)
const allowedLocations = new Set<string>(propertyLocations)
const allowedTypes = new Set<string>(propertyTypes)

export function buildSanitizedSubmission(
  raw: ConsultationSubmission,
  packageName?: string,
): ConsultationSubmission {
  const name = sanitizeText(raw.name, 120)
  const email = sanitizeEmail(raw.email)
  const address = sanitizeText(raw.address, 1000)
  const phone = sanitizePhone(raw.phone)

  if (!name || !email || !address) {
    throw new Error('Name, email, and address are required.')
  }

  if (!isValidEmail(email)) {
    throw new Error('Please enter a valid email address.')
  }

  return {
    packageName: packageName ? sanitizeText(packageName, 120) : undefined,
    development: raw.development.filter((item) => allowedDevelopment.has(item)),
    verification: raw.verification.filter((item) => allowedVerification.has(item)),
    projectPlanning: raw.projectPlanning,
    propertyLocation:
      raw.propertyLocation && allowedLocations.has(raw.propertyLocation) ? raw.propertyLocation : '',
    propertyType: raw.propertyType && allowedTypes.has(raw.propertyType) ? raw.propertyType : '',
    propertySize: sanitizeText(raw.propertySize, 200),
    name,
    email,
    address,
    phone,
  }
}

export async function submitConsultationEnquiry(
  payload: ConsultationSubmission,
  document?: File | null,
): Promise<void> {
  const formData = new FormData()
  formData.append('data', JSON.stringify(payload))

  if (document) {
    formData.append('document', document, document.name)
  }

  const response = await fetch('/api/consultation', {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as { message?: string } | null
    throw new Error(body?.message || 'Unable to submit your enquiry. Please try again.')
  }
}
