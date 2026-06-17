import { WHATSAPP_URL } from '../../data/content'

export function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-2xl shadow-lg shadow-[#25D366]/40 transition-transform hover:scale-110"
    >
      💬
    </a>
  )
}
