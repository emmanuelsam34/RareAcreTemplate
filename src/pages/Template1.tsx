import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  clientSegments,
  EMAIL,
  engagementOptions,
  INSTAGRAM,
  problems,
  processSteps,
  reviews,
  stats,
  WEBSITE_URL,
  whyFacts,
  WHATSAPP_URL,
} from '../data/content'
import { ContactForm } from '../components/shared/ContactForm'
import { FadeIn } from '../components/shared/FadeIn'
import { SectionReveal } from '../components/shared/SectionReveal'
import { StaggerGroup, StaggerItem } from '../components/shared/Stagger'
import { MobileNav } from '../components/shared/MobileNav'
import { Packages } from '../components/shared/Packages'
import { WhatsAppFloat } from '../components/shared/WhatsAppFloat'
import { HeroSlider } from '../components/template-1/HeroSlider'
import { WhatWeDoSlider } from '../components/template-1/WhatWeDoSlider'

const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#process', label: 'Process' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#contact', label: 'Contact' },
]

export default function Template1() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="bg-cloud font-lato text-ink">
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
          scrolled ? 'bg-black/95 shadow-lg backdrop-blur-sm' : 'bg-transparent'
        }`}
      >
        <div className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <div className="font-poppins text-2xl font-bold tracking-tight text-white">
            RARE<span className="text-red">A</span>CRE
          </div>
          <ul className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-poppins text-sm font-medium text-white/85 transition hover:text-red"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="hidden rounded-full border-2 border-white px-7 py-2.5 font-poppins text-xs font-bold uppercase tracking-wide text-white transition hover:bg-white hover:text-black lg:inline-block"
          >
            Book a Consultation
          </a>
          <MobileNav
            links={navLinks}
            ctaHref="#contact"
            ctaLabel="Book a Consultation"
            ctaClassName="rounded-full border-2 border-white px-7 py-2.5 font-poppins text-xs font-bold uppercase tracking-wide text-white"
            linkClassName="block font-poppins text-sm font-medium text-white/85"
            menuButtonClassName="text-2xl text-white"
          />
        </div>
      </motion.nav>

      <HeroSlider />

      <SectionReveal id="problems" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="mb-14 text-center" delay={0.1}>
            <span className="mx-auto mb-5 block h-1 w-16 bg-red" />
            <p className="font-poppins text-sm font-semibold uppercase tracking-[0.2em] text-red">
              The Challenge
            </p>
            <h2 className="mt-3 font-poppins text-4xl font-semibold text-ink-dark md:text-5xl">
              The Problems We&apos;re Built to Solve
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink">
              Most costly real estate mistakes happen before a property is acquired, developed, or
              financed. Our consultancy services help clients make informed decisions and avoid
              expensive setbacks.
            </p>
          </FadeIn>
          <StaggerGroup className="grid gap-px border border-black/10 bg-black/10 sm:grid-cols-2 lg:grid-cols-3">
            {problems.map((problem) => (
              <StaggerItem key={problem.title}>
                <article className="h-full bg-white p-8 transition-colors duration-300 hover:bg-cloud">
                  <div className="font-poppins text-5xl font-semibold text-red/25">{problem.number}</div>
                  <h3 className="mt-4 font-poppins text-base font-bold text-ink-dark">
                    {problem.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink">{problem.description}</p>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </SectionReveal>

      <WhatWeDoSlider />

      <SectionReveal id="pricing" className="bg-cloud py-24">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="mb-16 text-center" delay={0.1}>
            <span className="mx-auto mb-5 block h-1 w-16 bg-red" />
            <p className="font-poppins text-sm font-semibold uppercase tracking-[0.2em] text-red">
              Consultation Services
            </p>
            <h2 className="mt-3 font-poppins text-4xl font-semibold text-ink-dark md:text-5xl">
              Our Advisory Services &amp; Packages
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink">
              Every engagement is structured, documented, and delivered with written outputs. Four
              service areas. Clear scope. Transparent pricing.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Packages variant="light" />
          </FadeIn>
        </div>
      </SectionReveal>

      <SectionReveal id="clients" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="mb-14 text-center" delay={0.1}>
            <span className="mx-auto mb-5 block h-1 w-16 bg-red" />
            <p className="font-poppins text-sm font-semibold uppercase tracking-[0.2em] text-red">
              Client Segments
            </p>
            <h2 className="mt-3 font-poppins text-4xl font-semibold text-ink-dark md:text-5xl">
              Who We Serve
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink">
              Our consultations are designed for anyone making a real estate decision that requires
              expert guidance and documented outcomes.
            </p>
          </FadeIn>
          <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {clientSegments.map((segment) => (
              <StaggerItem key={segment.title}>
                <article className="h-full bg-cloud p-7 text-center shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red text-2xl text-white">
                    {segment.icon}
                  </div>
                  <h3 className="mt-5 font-poppins text-lg font-semibold text-ink-dark">
                    {segment.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink">{segment.description}</p>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </SectionReveal>

      <SectionReveal id="why" className="bg-cloud py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-start gap-16 lg:grid-cols-2">
            <FadeIn direction="left">
              <span className="mb-5 inline-block h-1 w-16 bg-red" />
              <p className="font-poppins text-sm font-semibold uppercase tracking-[0.2em] text-red">
                Why RareAcre
              </p>
              <h2 className="mt-4 font-poppins text-4xl font-semibold leading-tight text-ink-dark md:text-5xl">
                Advisory Grounded in{' '}
                <span className="text-red">Real Execution.</span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-ink">
                Most advisory firms advise from a desk. RareAcre is an active developer, bringing
                practical market intelligence and real-world experience to every engagement.
              </p>
              <StaggerGroup className="mt-10 grid grid-cols-2 gap-6">
                {stats.map((stat) => (
                  <StaggerItem key={stat.label}>
                    <div className="border-l-2 border-red pl-4">
                      <div className="font-poppins text-3xl font-bold text-red">{stat.value}</div>
                      <div className="mt-1 text-xs uppercase tracking-wide text-ink/70">
                        {stat.label}
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </FadeIn>
            <StaggerGroup className="space-y-4">
              {whyFacts.map((fact) => (
                <StaggerItem key={fact.title}>
                  <article className="border-l-4 border-red bg-white p-5 shadow-sm transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-md">
                    <h3 className="font-poppins text-sm font-bold text-ink-dark">{fact.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink">{fact.description}</p>
                  </article>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal id="process" className="bg-white py-24">
        <div className="mx-auto max-w-4xl px-6">
          <FadeIn className="mb-14 text-center" delay={0.1}>
            <span className="mx-auto mb-5 block h-1 w-16 bg-red" />
            <p className="font-poppins text-sm font-semibold uppercase tracking-[0.2em] text-red">
              Advisory Process
            </p>
            <h2 className="mt-3 font-poppins text-4xl font-semibold text-ink-dark md:text-5xl">
              How a Consultation Works
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink">
              A structured, documented process from first contact to final report. Designed to
              protect your interests at every step.
            </p>
          </FadeIn>
          <StaggerGroup className="space-y-0">
            {processSteps.map((step) => (
              <StaggerItem key={step.title}>
                <div className="grid grid-cols-[56px_1fr] gap-6 border-b border-black/10 py-7 last:border-b-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red font-poppins text-lg font-bold text-white">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="font-poppins text-xl font-semibold text-ink-dark">{step.title}</h3>
                    <p className="mt-2 leading-relaxed text-ink">{step.description}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </SectionReveal>

      <SectionReveal id="reviews" className="bg-cloud py-24">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="mb-14 text-center" delay={0.1}>
            <span className="mx-auto mb-5 block h-1 w-16 bg-red" />
            <p className="font-poppins text-sm font-semibold uppercase tracking-[0.2em] text-red">
              Client Reviews
            </p>
            <h2 className="mt-3 font-poppins text-4xl font-semibold text-ink-dark md:text-5xl">
              What Our Clients Say
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink">
              Across land verification, feasibility advisory, and project planning, our clients share
              their experience.
            </p>
          </FadeIn>
          <StaggerGroup className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <StaggerItem key={review.name}>
                <article className="h-full bg-white p-9 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md">
                  <div className="tracking-widest text-red">★★★★★</div>
                  <p className="mt-5 text-base italic leading-relaxed text-ink">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="mt-7 border-t border-black/10 pt-5">
                    <p className="font-poppins font-semibold text-ink-dark">{review.name}</p>
                    <p className="text-sm uppercase tracking-wide text-ink/60">{review.role}</p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </SectionReveal>

      <SectionReveal id="engage" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="mb-14 text-center" delay={0.1}>
            <span className="mx-auto mb-5 block h-1 w-16 bg-red" />
            <p className="font-poppins text-sm font-semibold uppercase tracking-[0.2em] text-red">
              Engagement
            </p>
            <h2 className="mt-3 font-poppins text-4xl font-semibold text-ink-dark md:text-5xl">
              Four Ways to Start
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink">
              Choose the pathway that works for you. All routes begin with the same outcome: a
              structured, professional consultation.
            </p>
          </FadeIn>
          <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {engagementOptions.map((option) => (
              <StaggerItem key={option.title}>
                <article className="h-full bg-cloud p-7 text-center shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-red text-2xl text-red">
                    {option.icon}
                  </div>
                  <h3 className="mt-5 font-poppins text-base font-semibold text-ink-dark">
                    {option.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink">{option.description}</p>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </SectionReveal>

      <SectionReveal className="bg-red py-20">
        <div className="mx-auto max-w-3xl px-6 text-center text-white">
          <FadeIn delay={0.15}>
            <p className="font-poppins text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
              Ready to Begin
            </p>
            <h2 className="mt-4 font-poppins text-3xl font-semibold leading-tight md:text-4xl">
              Don&apos;t Invest in Land or Property Without Expert Verification First.
            </h2>
            <p className="mt-4 text-lg text-white/90">
              Join over 63 clients who trusted RareAcre with their real estate decisions. Your
              consultation starts here.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href="#contact"
                className="rounded-full bg-black px-9 py-4 font-poppins text-sm font-bold uppercase tracking-wide text-white transition-all duration-300 hover:scale-105 hover:bg-ink-dark"
              >
                Book a Consultation Now
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border-2 border-white px-9 py-4 font-poppins text-sm font-bold uppercase tracking-wide text-white transition-all duration-300 hover:scale-105 hover:bg-white hover:text-red"
              >
                WhatsApp Us Directly
              </a>
            </div>
          </FadeIn>
        </div>
      </SectionReveal>

      <SectionReveal id="contact" className="bg-cloud py-24">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="mb-14 text-center" delay={0.1}>
            <span className="mx-auto mb-5 block h-1 w-16 bg-red" />
            <p className="font-poppins text-sm font-semibold uppercase tracking-[0.2em] text-red">
              Contact
            </p>
            <h2 className="mt-3 font-poppins text-4xl font-semibold text-ink-dark md:text-5xl">
              Reach Our Advisory Team
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink">
              Our advisors respond within 24 hours to all consultation enquiries.
            </p>
          </FadeIn>

          <div className="grid gap-12 lg:grid-cols-2">
            <FadeIn direction="left">
              <h3 className="font-poppins text-3xl font-semibold text-ink-dark">
                RareAcre Investment Limited
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-ink">
                3a Benedict Nwachukwu Ave,
                <br />
                Lekki, Ogombo Rd,
                <br />
                Lagos 106104, Nigeria.
              </p>
              <StaggerGroup className="mt-8 flex flex-col gap-3">
                {[
                  { icon: '🌐', label: 'Website', value: 'www.rareacreinvestment.com', href: WEBSITE_URL },
                  { icon: '✉️', label: 'Email', value: EMAIL, href: `mailto:${EMAIL}` },
                  { icon: '💬', label: 'WhatsApp', value: 'Send a direct message', href: WHATSAPP_URL },
                  { icon: '📸', label: 'Instagram', value: '@rareacreltd', href: INSTAGRAM },
                ].map((item) => (
                  <StaggerItem key={item.label}>
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red text-base text-white">
                        {item.icon}
                      </div>
                      <div>
                        <p className="font-poppins text-xs font-semibold uppercase tracking-wide text-ink-dark">
                          {item.label}
                        </p>
                        <p className="text-sm text-ink">{item.value}</p>
                      </div>
                    </a>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </FadeIn>
            <FadeIn direction="right" delay={0.15}>
              <ContactForm accent="red" />
            </FadeIn>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal className="bg-black py-14 text-white/70">
        <StaggerGroup className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-3">
          <StaggerItem>
            <div>
              <div className="font-poppins text-2xl font-bold text-white">
                RARE<span className="text-red">A</span>CRE
              </div>
              <p className="mt-4 text-sm leading-relaxed">
                Consultation &amp; Advisory Services. Protecting your capital starts here.
              </p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div>
              <h4 className="font-poppins text-sm font-semibold uppercase tracking-wide text-white">
                Useful Links
              </h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li><a href="#contact" className="transition-colors duration-300 hover:text-red">Contact</a></li>
                <li><a href="#services" className="transition-colors duration-300 hover:text-red">Services</a></li>
                <li><a href="#pricing" className="transition-colors duration-300 hover:text-red">Pricing</a></li>
                <li><a href="#reviews" className="transition-colors duration-300 hover:text-red">Reviews</a></li>
              </ul>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div>
              <h4 className="font-poppins text-sm font-semibold uppercase tracking-wide text-white">
                Explore
              </h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li><Link to="/" className="transition-colors duration-300 hover:text-red">Templates</Link></li>
                <li><Link to="/template-2" className="transition-colors duration-300 hover:text-red">Elite Template</Link></li>
                <li>
                  <a href={WEBSITE_URL} target="_blank" rel="noreferrer" className="transition-colors duration-300 hover:text-red">
                    Website
                  </a>
                </li>
              </ul>
            </div>
          </StaggerItem>
        </StaggerGroup>
        <FadeIn className="mx-auto mt-12 max-w-7xl border-t border-white/10 px-6 pt-6 text-center text-xs text-white/40">
          © 2025 RareAcre Investment Limited. Lekki, Lagos, Nigeria. All Rights Reserved.
        </FadeIn>
      </SectionReveal>

      <WhatsAppFloat />
    </div>
  )
}
