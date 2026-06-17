import { useTheme } from '../../context/ThemeContext'

type ThemeToggleProps = {
  style?: 't1' | 't2'
  className?: string
}

export function ThemeToggle({ style = 't1', className = '' }: ThemeToggleProps) {
  const { isDark, toggleTheme } = useTheme()

  const base =
    style === 't1'
      ? 'flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300'
      : 'flex h-10 w-10 items-center justify-center rounded-[2px] border transition-all duration-300'

  const themed =
    style === 't1'
      ? isDark
        ? 'border-white/20 bg-white/10 text-white hover:border-red hover:bg-red/20'
        : 'border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20'
      : isDark
        ? 'border-white/15 bg-white/5 text-gold-luxury hover:border-gold-luxury hover:bg-gold-luxury/10'
        : 'border-navy-elite/15 bg-navy-elite/5 text-navy-elite hover:border-gold-luxury hover:bg-gold-luxury/10'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      className={`${base} ${themed} ${className}`}
    >
      {isDark ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.75" />
          <path
            d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M21 14.5A8.5 8.5 0 1 1 9.5 3a6.5 6.5 0 1 0 11.5 11.5Z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  )
}
