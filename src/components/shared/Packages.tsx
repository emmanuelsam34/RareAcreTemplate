import {
  advisoryPackages,
  verificationPackages,
} from '../../data/content'
import {
  feasibilityPackagePreset,
  planningPackagePreset,
  verificationPackagePreset,
} from '../../data/consultationForm'
import { useTheme } from '../../context/ThemeContext'
import { BookConsultationButton } from './BookConsultationButton'
import { FadeIn } from './FadeIn'
import { StaggerGroup, StaggerItem } from './Stagger'

export function Packages() {
  const { isDark } = useTheme()
  return <LightPackages isDark={isDark} />
}

function LightPackages({ isDark }: { isDark: boolean }) {
  const heading = isDark ? 'text-white' : 'text-ink-dark'
  const body = isDark ? 'text-white/75' : 'text-ink'
  const muted = isDark ? 'text-white/45' : 'text-ink/50'
  const card = isDark ? 'bg-[#222] border-white/10' : 'bg-white border-black/10'
  const cardFeatured = isDark ? 'border-red shadow-lg' : 'border-red shadow-lg'
  const bookButtonClass = (featured: boolean) =>
    `mt-8 block w-full rounded-full py-3.5 text-center font-poppins text-[11px] font-bold uppercase tracking-[0.14em] text-white transition ${
      featured ? 'bg-red hover:bg-pink' : 'bg-black hover:bg-red'
    }`

  return (
    <div className="space-y-16">
      <div>
        <FadeIn>
          <span className="mb-4 block h-1 w-12 bg-red" />
          <h3 className={`font-poppins text-2xl font-semibold capitalize md:text-3xl ${heading}`}>
            Land Verification &amp; Acquisition Advisory
          </h3>
          <p className={`mt-3 max-w-2xl text-base leading-relaxed ${body}`}>
            Helping clients make informed land acquisition decisions through structured due
            diligence, risk assessment, and acquisition guidance.
          </p>
        </FadeIn>

        <StaggerGroup className="mt-10 grid gap-6 lg:grid-cols-3">
          {verificationPackages.map((pkg) => (
            <StaggerItem key={pkg.name}>
              <article
                className={`flex h-full flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  pkg.featured ? cardFeatured : `${card} shadow-sm`
                }`}
              >
                <div className={`p-7 ${pkg.featured ? 'bg-red text-white' : 'bg-ink-dark text-white'}`}>
                  <p
                    className={`font-poppins text-[10px] font-bold uppercase tracking-[0.18em] ${
                      pkg.featured ? 'text-white/80' : 'text-red'
                    }`}
                  >
                    {pkg.badge}
                  </p>
                  <h4 className="mt-2 font-poppins text-xl font-semibold">{pkg.name}</h4>
                  <p className="mt-3 font-poppins text-3xl font-bold">{pkg.fee}</p>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <p className={`font-poppins text-[10px] font-bold uppercase tracking-[0.18em] ${muted}`}>
                    Includes
                  </p>
                  <ul className="mt-3 space-y-2.5">
                    {pkg.includes.map((item) => (
                      <li key={item} className={`flex gap-2 text-sm ${body}`}>
                        <span className="font-bold text-red">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className={`mt-5 font-poppins text-[10px] font-bold uppercase tracking-[0.18em] ${muted}`}>
                    Deliverables
                  </p>
                  <ul className="mt-3 space-y-2.5">
                    {pkg.deliverables.map((item) => (
                      <li key={item} className={`flex gap-2 text-sm ${body}`}>
                        <span className={`font-bold ${isDark ? 'text-white' : 'text-ink-dark'}`}>→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <BookConsultationButton
                    preset={verificationPackagePreset(pkg.name)}
                    className={bookButtonClass(pkg.featured)}
                  >
                    Book This Package
                  </BookConsultationButton>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>

      <div>
        <FadeIn>
          <span className="mb-4 block h-1 w-12 bg-red" />
          <h3 className={`font-poppins text-2xl font-semibold capitalize md:text-3xl ${heading}`}>
            Development &amp; Project Advisory
          </h3>
          <p className={`mt-3 max-w-2xl text-base leading-relaxed ${body}`}>
            Structured expert guidance on what to build, whether it&apos;s viable, and how to plan
            delivery.
          </p>
        </FadeIn>

        <StaggerGroup className="mt-10 grid gap-6 lg:grid-cols-2">
          {advisoryPackages.map((pkg) => (
            <StaggerItem key={pkg.name}>
              <article className={`flex h-full flex-col overflow-hidden rounded-2xl border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${card}`}>
                <div className="bg-ink-dark p-8 text-white">
                  <p className="font-poppins text-[10px] font-bold uppercase tracking-[0.18em] text-red">
                    {pkg.tag}
                  </p>
                  <h4 className="mt-2 font-poppins text-2xl font-semibold">{pkg.name}</h4>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">{pkg.description}</p>
                  <p className="mt-4 font-poppins text-3xl font-bold text-red">{pkg.fee}</p>
                </div>
                <div className="grid flex-1 gap-6 p-8 sm:grid-cols-2">
                  <div>
                    <h5 className={`font-poppins text-[10px] font-bold uppercase tracking-[0.18em] ${muted}`}>
                      Includes
                    </h5>
                    <ul className="mt-3 space-y-2.5">
                      {pkg.includes.map((item) => (
                        <li key={item} className={`flex gap-2 text-sm ${body}`}>
                          <span className="font-bold text-red">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-col">
                    <h5 className={`font-poppins text-[10px] font-bold uppercase tracking-[0.18em] ${muted}`}>
                      Deliverables
                    </h5>
                    <ul className="mt-3 space-y-2.5">
                      {pkg.deliverables.map((item) => (
                        <li key={item} className={`flex gap-2 text-sm ${body}`}>
                          <span className={`font-bold ${isDark ? 'text-white' : 'text-ink-dark'}`}>→</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <BookConsultationButton
                      preset={
                        pkg.name === 'Development Feasibility Assessment'
                          ? feasibilityPackagePreset()
                          : planningPackagePreset()
                      }
                      className="mt-auto block w-full rounded-full bg-black py-3.5 text-center font-poppins text-[11px] font-bold uppercase tracking-[0.14em] text-white transition hover:bg-red sm:mt-6"
                    >
                      Book Advisory
                    </BookConsultationButton>
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </div>
  )
}
