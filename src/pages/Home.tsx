import { Link } from 'react-router-dom'
import { FadeIn } from '../components/shared/FadeIn'

export default function Home() {
  return (
    <div className="min-h-screen bg-navy-dark text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-16">
        <FadeIn>
          <p className="text-[10px] uppercase tracking-[0.26em] text-gold">RareAcre Consultancy</p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-tight md:text-6xl">
            Choose Your <span className="italic text-gold-light">Template Experience</span>
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70 md:text-base">
            Two premium landing page directions for RareAcre Consultation & Advisory Services.
            Both templates share the same consultancy content with distinct visual identities.
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <FadeIn delay={0.1}>
            <Link
              to="/template-1"
              className="group block rounded-sm border border-white/10 bg-white/5 p-8 transition hover:border-gold/40 hover:bg-white/10"
            >
              <p className="text-[10px] uppercase tracking-[0.2em] text-gold">Template One</p>
              <h2 className="mt-3 font-serif text-3xl">Quiet Luxury</h2>
              <p className="mt-3 text-sm leading-7 text-white/65">
                Editorial elegance with a rotating hero slider. Serif typography, generous
                whitespace, and a trust-first real estate consultancy feel.
              </p>
              <span className="mt-6 inline-block text-xs font-semibold uppercase tracking-[0.14em] text-gold transition group-hover:translate-x-1">
                View Template →
              </span>
            </Link>
          </FadeIn>

          <FadeIn delay={0.2}>
            <Link
              to="/template-2"
              className="group block rounded-sm border border-gold-luxury/30 bg-navy-elite p-8 transition hover:border-gold-luxury hover:shadow-[0_0_40px_rgba(212,175,55,0.12)]"
            >
              <p className="text-[10px] uppercase tracking-[0.2em] text-gold-luxury">Template Two</p>
              <h2 className="mt-3 font-serif text-3xl italic">Elite Authority</h2>
              <p className="mt-3 text-sm leading-7 text-white/65">
                Cinematic high-status branding. Deep navy, luxury gold accents, and bold
                authority-led storytelling for RareAcre Advisory.
              </p>
              <span className="mt-6 inline-block text-xs font-semibold uppercase tracking-[0.14em] text-gold-luxury transition group-hover:translate-x-1">
                View Template →
              </span>
            </Link>
          </FadeIn>
        </div>
      </div>
    </div>
  )
}
