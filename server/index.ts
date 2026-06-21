import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import multer from 'multer'
import nodemailer from 'nodemailer'
import {
  ALLOWED_DOCUMENT_EXTENSIONS,
  ALLOWED_DOCUMENT_MIME_TYPES,
  MAX_DOCUMENT_SIZE_BYTES,
} from '../src/lib/documentUpload'
import { isValidEmail, sanitizeEmail, sanitizeFileName, sanitizePhone, sanitizeText } from '../src/lib/sanitize'
import {
  developmentFeasibilityOptions,
  propertyLocations,
  propertyTypes,
  verificationOptions,
} from '../src/data/consultationForm'

const PORT = Number(process.env.API_PORT || 3001)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'info@rareacreinvestment.com'
const SMTP_HOST = process.env.SMTP_HOST
const SMTP_PORT = Number(process.env.SMTP_PORT || 587)
const SMTP_USER = process.env.SMTP_USER
const SMTP_PASS = process.env.SMTP_PASS
const SMTP_FROM = process.env.SMTP_FROM || ADMIN_EMAIL

type SubmissionPayload = {
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

function sanitizeSubmission(raw: unknown): SubmissionPayload {
  if (!raw || typeof raw !== 'object') {
    throw new Error('Invalid submission payload.')
  }

  const data = raw as Record<string, unknown>

  const development = Array.isArray(data.development)
    ? data.development.filter((item): item is string => typeof item === 'string' && allowedDevelopment.has(item))
    : []

  const verification = Array.isArray(data.verification)
    ? data.verification.filter((item): item is string => typeof item === 'string' && allowedVerification.has(item))
    : []

  const propertyLocation =
    typeof data.propertyLocation === 'string' && allowedLocations.has(data.propertyLocation)
      ? data.propertyLocation
      : ''

  const propertyType =
    typeof data.propertyType === 'string' && allowedTypes.has(data.propertyType) ? data.propertyType : ''

  const name = sanitizeText(typeof data.name === 'string' ? data.name : '', 120)
  const email = sanitizeEmail(typeof data.email === 'string' ? data.email : '')
  const address = sanitizeText(typeof data.address === 'string' ? data.address : '', 1000)
  const phone = sanitizePhone(typeof data.phone === 'string' ? data.phone : '')
  const propertySize = sanitizeText(typeof data.propertySize === 'string' ? data.propertySize : '', 200)
  const packageName = sanitizeText(typeof data.packageName === 'string' ? data.packageName : '', 120)

  if (!name || !email || !address) {
    throw new Error('Name, email, and address are required.')
  }

  if (!isValidEmail(email)) {
    throw new Error('Please enter a valid email address.')
  }

  return {
    packageName: packageName || undefined,
    development,
    verification,
    projectPlanning: Boolean(data.projectPlanning),
    propertyLocation,
    propertyType,
    propertySize,
    name,
    email,
    address,
    phone,
  }
}

function buildEmailContent(payload: SubmissionPayload, documentName?: string) {
  const lines = [
    'New RareAcre consultation enquiry',
    '',
    payload.packageName ? `Selected Package: ${payload.packageName}` : 'Selected Package: Not specified',
    '',
    '--- Services ---',
    `Development Feasibility: ${payload.development.length ? payload.development.join(', ') : 'None selected'}`,
    `Property Verification: ${payload.verification.length ? payload.verification.join(', ') : 'None selected'}`,
    `Project Planning: ${payload.projectPlanning ? 'Yes' : 'No'}`,
    '',
    '--- Property ---',
    `Location: ${payload.propertyLocation || 'Not specified'}`,
    `Type: ${payload.propertyType || 'Not specified'}`,
    `Size: ${payload.propertySize || 'Not specified'}`,
    '',
    '--- Contact ---',
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone || 'Not provided'}`,
    `Address: ${payload.address}`,
    '',
    documentName ? `Attached Document: ${documentName}` : 'Attached Document: None',
  ]

  const html = lines
    .map((line) => `<p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:14px;">${line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>`)
    .join('')

  return { text: lines.join('\n'), html }
}

function createMailTransport() {
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    throw new Error('Email service is not configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASS.')
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  })
}

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_DOCUMENT_SIZE_BYTES, files: 1 },
  fileFilter: (_req, file, cb) => {
    const extension = file.originalname.slice(file.originalname.lastIndexOf('.')).toLowerCase()
    const mimeAllowed = ALLOWED_DOCUMENT_MIME_TYPES.includes(
      file.mimetype as (typeof ALLOWED_DOCUMENT_MIME_TYPES)[number],
    )
    const extensionAllowed = ALLOWED_DOCUMENT_EXTENSIONS.includes(
      extension as (typeof ALLOWED_DOCUMENT_EXTENSIONS)[number],
    )

    if (!mimeAllowed || !extensionAllowed) {
      cb(new Error('Invalid document type. Allowed formats: PDF, DOC, DOCX, JPG, or PNG.'))
      return
    }

    cb(null, true)
  },
})

const app = express()
app.use(cors({ origin: true }))
app.use(express.json({ limit: '32kb' }))

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.post('/api/consultation', upload.single('document'), async (req, res) => {
  try {
    let payload: SubmissionPayload

    if (typeof req.body?.data === 'string') {
      payload = sanitizeSubmission(JSON.parse(req.body.data))
    } else if (req.body?.data && typeof req.body.data === 'object') {
      payload = sanitizeSubmission(req.body.data)
    } else {
      res.status(400).json({ message: 'Missing submission data.' })
      return
    }

    const transport = createMailTransport()
    const attachment = req.file
      ? {
          filename: sanitizeFileName(req.file.originalname),
          content: req.file.buffer,
          contentType: req.file.mimetype,
        }
      : undefined

    const { text, html } = buildEmailContent(payload, attachment?.filename)

    await transport.sendMail({
      from: SMTP_FROM,
      to: ADMIN_EMAIL,
      replyTo: payload.email,
      subject: `RareAcre Consultation Enquiry — ${payload.name}`,
      text,
      html,
      attachments: attachment ? [attachment] : undefined,
    })

    res.json({ ok: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to submit enquiry.'
    const status = message.includes('not configured') ? 503 : 400
    res.status(status).json({ message })
  }
})

app.listen(PORT, () => {
  console.log(`Consultation API listening on http://localhost:${PORT}`)
})
