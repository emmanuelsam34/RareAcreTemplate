# RareAcre Template

Marketing site template for **RareAcre Investment** — a single-page React app with consultation booking, document upload, and email delivery to the admin inbox.

## Tech stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion
- **Backend:** Express, Multer, Nodemailer (consultation form API)
- **Routing:** React Router

## Features

- Full landing page with hero slider, services, packages, process, reviews, and contact sections
- Light / dark theme toggle
- Scroll animations and auto-advancing carousels
- Consultation booking modal with package presets
- Document upload (PDF, DOC, DOCX, JPG, PNG — max 2MB) with client and server validation
- Input sanitization before submission
- Enquiry emails sent to the admin address with optional attachment

## Project structure

```
src/
  data/content.ts           # Site copy, stats, packages, contact info
  data/consultationForm.ts  # Form options and package presets
  pages/Template1.tsx       # Main page layout
  components/               # UI sections and shared components
  services/                 # Form submission client
  lib/                      # Sanitization and upload validation
server/
  index.ts                  # Consultation API and email handler
```

## Getting started

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
npm install
```

### Environment

Copy the example env file and add your SMTP credentials:

```bash
cp .env.example .env
```

| Variable | Description |
| --- | --- |
| `API_PORT` | API server port (default: `3001`) |
| `ADMIN_EMAIL` | Recipient for consultation enquiries |
| `SMTP_FROM` | From address on outgoing emails |
| `SMTP_HOST` | SMTP server hostname |
| `SMTP_PORT` | SMTP port (default: `587`) |
| `SMTP_USER` | SMTP username |
| `SMTP_PASS` | SMTP password |

Without valid SMTP settings, the form UI will work but submissions will fail with a configuration error.

### Development

Start the frontend and API together:

```bash
npm run dev
```

- Web app: [http://localhost:5173](http://localhost:5173)
- API: [http://localhost:3001](http://localhost:3001) (proxied via `/api` in dev)

Run them separately if needed:

```bash
npm run dev:web   # Vite only
npm run dev:api   # Express API only
```

### Build

```bash
npm run build
npm run preview   # Preview production build locally
```

Production output is written to `dist/`. Deploy the static files and run the API server (`server/index.ts`) with the same environment variables.

## Customizing content

Most site text, links, and package details live in `src/data/content.ts`. Consultation form field options and service presets are in `src/data/consultationForm.ts`.

Key contact values:

- Email: `info@rareacreinvestment.com`
- Website: `https://www.rareacreinvestment.com`

## Consultation form flow

1. User completes the modal form and optionally attaches a document.
2. The client validates and sanitizes input, then POSTs to `/api/consultation`.
3. The API re-validates the payload and file, then sends an email to `ADMIN_EMAIL` with a plain-text/HTML summary and attachment.

Allowed uploads: PDF, DOC, DOCX, JPG, PNG — maximum 2MB.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start Vite + API |
| `npm run dev:web` | Start Vite only |
| `npm run dev:api` | Start API only |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Serve the production build |
| `npm run lint` | Run ESLint |

## License

Private — RareAcre Investment.
