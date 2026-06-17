import { useState } from 'react'
import { packageOptions } from '../../data/content'

type ContactFormProps = {
  variant?: 'light' | 'dark'
  accent?: 'gold' | 'red'
}

export function ContactForm({ variant = 'light', accent = 'gold' }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false)

  const isDark = variant === 'dark'
  const isRed = accent === 'red'

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
    window.setTimeout(() => setSubmitted(false), 3500)
  }

  const radius = isRed ? 'rounded-xl' : 'rounded-sm'
  const focusBorder = isRed ? 'focus:border-red' : 'focus:border-gold'

  const inputClass = isDark
    ? isRed
      ? `w-full ${radius} border border-white/15 bg-white/5 px-3.5 py-3 text-sm text-white outline-none transition ${focusBorder}`
      : `w-full ${radius} border border-white/15 bg-white/5 px-3.5 py-3 text-sm text-white outline-none transition ${focusBorder}`
    : `w-full ${radius} border border-black/10 bg-white px-3.5 py-3 text-sm text-charcoal outline-none transition ${focusBorder}`

  const labelClass = isDark
    ? isRed
      ? 'font-poppins text-[10px] font-semibold uppercase tracking-[0.12em] text-white/60'
      : 'text-[10px] uppercase tracking-[0.1em] text-white/50'
    : isRed
      ? 'font-poppins text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/60'
      : 'text-[10px] uppercase tracking-[0.1em] text-stone'

  const boxClass = isDark
    ? isRed
      ? 'rounded-2xl bg-[#222] p-8 shadow-lg border border-white/10'
      : 'rounded-sm bg-white/5 p-8 backdrop-blur-sm'
    : isRed
      ? 'rounded-2xl bg-white p-8 shadow-lg dark:bg-[#222] dark:border dark:border-white/10'
      : 'rounded-sm bg-offwhite p-8'

  const headingClass = isDark
    ? isRed
      ? 'text-white font-poppins'
      : 'text-white'
    : isRed
      ? 'text-ink-dark font-poppins'
      : 'text-navy'

  const submitRadius = isRed ? 'rounded-full' : 'rounded-sm'
  const submitIdle = isRed
    ? isDark
      ? 'bg-red text-white hover:bg-pink'
      : 'bg-black text-white hover:bg-red'
    : 'bg-gold text-navy-dark hover:opacity-90'
  const submitDone = isRed ? 'bg-red text-white' : 'bg-navy text-gold'

  return (
    <form onSubmit={handleSubmit} className={boxClass}>
      <h4 className={`text-sm font-bold ${headingClass}`}>Submit a Consultation Enquiry</h4>
      <p className={`mt-1 text-xs ${isDark ? 'text-white/60' : 'text-stone-dark'}`}>
        Complete the form and an advisor will contact you within 24 hours.
      </p>

      <div className="mt-5 space-y-3.5">
        <div>
          <label className={labelClass}>Full Name</label>
          <input className={`${inputClass} mt-1`} type="text" placeholder="Your full name" required />
        </div>
        <div>
          <label className={labelClass}>Phone / WhatsApp Number</label>
          <input className={`${inputClass} mt-1`} type="tel" placeholder="+234 or international number" required />
        </div>
        <div>
          <label className={labelClass}>Email Address</label>
          <input className={`${inputClass} mt-1`} type="email" placeholder="your@email.com" required />
        </div>
        <div>
          <label className={labelClass}>Consultation Package of Interest</label>
          <select className={`${inputClass} mt-1`} defaultValue="" required>
            <option value="" disabled>
              Select a package...
            </option>
            {packageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Describe Your Property or Project</label>
          <textarea
            className={`${inputClass} mt-1 min-h-24 resize-y`}
            placeholder="Tell us about your land, project, or property challenge..."
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className={`mt-4 w-full ${submitRadius} px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.1em] transition ${
          submitted ? submitDone : submitIdle
        }`}
      >
        {submitted ? 'Enquiry Submitted ✓' : 'Submit Enquiry →'}
      </button>
      <p className={`mt-2 text-center text-[10.5px] ${isDark ? 'text-white/40' : 'text-stone'}`}>
        All enquiries are treated with strict confidentiality.
      </p>
    </form>
  )
}
