export const MAX_DOCUMENT_SIZE_BYTES = 2 * 1024 * 1024

export const ALLOWED_DOCUMENT_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/png',
] as const

export const ALLOWED_DOCUMENT_EXTENSIONS = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'] as const

export function validateDocument(file: File): string | null {
  if (file.size > MAX_DOCUMENT_SIZE_BYTES) {
    return 'Document must be 2MB or smaller.'
  }

  if (!ALLOWED_DOCUMENT_MIME_TYPES.includes(file.type as (typeof ALLOWED_DOCUMENT_MIME_TYPES)[number])) {
    return 'Allowed formats: PDF, DOC, DOCX, JPG, or PNG.'
  }

  const dotIndex = file.name.lastIndexOf('.')
  if (dotIndex === -1) {
    return 'File must include a valid extension.'
  }

  const extension = file.name.slice(dotIndex).toLowerCase()
  if (!ALLOWED_DOCUMENT_EXTENSIONS.includes(extension as (typeof ALLOWED_DOCUMENT_EXTENSIONS)[number])) {
    return 'Invalid file extension.'
  }

  if (/[^\w.\- ()]/i.test(file.name)) {
    return 'File name contains invalid characters.'
  }

  return null
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
