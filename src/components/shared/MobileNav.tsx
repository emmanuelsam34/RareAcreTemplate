import { useState } from 'react'

type NavLink = {
  href: string
  label: string
}

type MobileNavProps = {
  links: NavLink[]
  ctaHref: string
  ctaLabel: string
  ctaClassName: string
  linkClassName: string
  menuButtonClassName: string
  panelClassName?: string
}

export function MobileNav({
  links,
  ctaHref,
  ctaLabel,
  ctaClassName,
  linkClassName,
  menuButtonClassName,
  panelClassName = 'bg-inherit',
}: MobileNavProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className={menuButtonClassName}
      >
        {open ? '✕' : '☰'}
      </button>

      {open && (
        <div className={`absolute inset-x-0 top-16 border-t border-white/10 px-6 py-4 shadow-lg ${panelClassName}`}>
          <ul className="space-y-3">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={linkClassName}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a href={ctaHref} onClick={() => setOpen(false)} className={`mt-4 inline-block ${ctaClassName}`}>
            {ctaLabel}
          </a>
        </div>
      )}
    </div>
  )
}
