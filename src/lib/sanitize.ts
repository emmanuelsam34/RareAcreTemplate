const CONTROL_CHARS = /[\0-\x08\x0B\x0C\x0E-\x1F\x7F]/g
const HTML_TAG = /<[^>]*>/g

export function sanitizeText(input: string, maxLength = 500): string {
  return input.replace(CONTROL_CHARS, '').replace(HTML_TAG, '').trim().slice(0, maxLength)
}

export function sanitizeEmail(input: string): string {
  return sanitizeText(input, 254).toLowerCase()
}

export function sanitizePhone(input: string): string {
  return input.replace(/[^\d+\s()-]/g, '').trim().slice(0, 30)
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function sanitizeFileName(name: string): string {
  const base = name.replace(/[^\w.\- ()]/g, '_').replace(/\.{2,}/g, '.')
  return base.slice(0, 120) || 'document'
}
