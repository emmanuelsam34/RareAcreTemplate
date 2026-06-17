import { Link } from 'react-router-dom'
import {
  clientSegments,
  EMAIL,
  INSTAGRAM,
  processSteps,
  reviews,
  stats,
  WEBSITE_URL,
  WHATSAPP_URL,
} from '../data/content'
import { ContactForm } from '../components/shared/ContactForm'
import { FadeIn } from '../components/shared/FadeIn'
import { MobileNav } from '../components/shared/MobileNav'
import { Packages } from '../components/shared/Packages'
import { WhatsAppFloat } from '../components/shared/WhatsAppFloat'

const navLinks = [
  { href: '#vision', label: 'Vision' },
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Process' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#contact', label: 'Contact' },
]

export default function Template2() {
  return (
    <div className="bg-navy-elite text-white selection:bg-gold-luxury/30">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-navy-elite/60 backdrop-blur-2xl">
        <div className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <div className="font-sans text-sm font-black uppercase tracking-[0.3em]">
            Rare<span className="text-gold-luxury">Acre</span>
          </div>
          <ul className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-sans text-[13px] font-bold uppercase tracking-[0.15em] text-white/60 transition hover:text-gold-luxury"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="hidden rounded-[2px] bg-gold-luxury px-8 py-3 font-sans text-[12px] font-bold uppercase tracking-[0.15em] text-navy-elite transition hover:brightness-110 md:inline-block"
          >
            Book Consultation
          </a>
          <MobileNav
            links={navLinks}
            ctaHref="#contact"
            ctaLabel="Book Consultation"
            ctaClassName="rounded-[2px] bg-gold-luxury px-8 py-3 font-sans text-[12px] font-bold uppercase tracking-[0.15em] text-navy-elite"
            linkClassName="block font-sans text-[13px] font-bold uppercase tracking-[0.15em] text-white/60"
            menuButtonClassName="text-2xl text-gold-luxury"
          />
        </div>
      </nav>

      <section className="relative flex min-h-screen items-center overflow-hidden px-6 pt-24">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1800&q=80"
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-navy-elite/88" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-elite via-navy-elite/80 to-navy-elite/50" />
        </div>

        <div className="pointer-events-none absolute right-4 top-1/3 select-none font-serif text-[18rem] font-black italic leading-none text-white/[0.03] md:text-[24rem]">
          RA
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <FadeIn>
            <p className="mb-6 font-sans text-[13px] font-bold uppercase tracking-[0.2em] text-gold-luxury">
              Real Estate &amp; Property Investment Experts
            </p>
            <h1 className="font-serif text-6xl font-black uppercase leading-[0.92] tracking-tight md:text-8xl lg:text-9xl">
              RARE
              <br />
              <span className="italic text-gold-luxury">ACRE</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/70 md:text-xl">
              Structured, expert-led real estate consultation, from land verification and acquisition
              advisory through development feasibility and project planning. Protecting your capital
              starts here.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#pricing"
                className="rounded-[2px] bg-gold-luxury px-10 py-4 font-sans text-[13px] font-bold uppercase tracking-[0.15em] text-navy-elite transition hover:brightness-110"
              >
                Secure Your Vision
              </a>
              <a
                href="#vision"
                className="rounded-[2px] border-2 border-gold-luxury px-10 py-4 font-sans text-[13px] font-bold uppercase tracking-[0.15em] text-gold-luxury transition hover:bg-gold-luxury hover:text-navy-elite"
              >
                The Legacy
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="border border-gold-luxury/40 bg-white/[0.06] p-8 backdrop-blur-md">
              <p className="font-sans text-[11px] font-bold uppercase tracking-[0.25em] text-gold-luxury">
                Upcoming Advisory Summit
              </p>
              <p className="mt-4 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
                Event
              </p>
              <h2 className="mt-2 font-serif text-3xl font-bold uppercase">
                Lekki Strategy Retreat 2026
              </h2>
              <p className="mt-3 font-sans text-sm uppercase tracking-[0.15em] text-white/55">
                7-Step Process · 5 Packages · Lagos
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="border border-white/10 bg-black/30 p-4">
                    <div className="font-serif text-2xl font-bold text-gold-luxury">{stat.value}</div>
                    <div className="mt-1 font-sans text-[9px] font-semibold uppercase tracking-[0.12em] text-white/45">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
              <a
                href="#pricing"
                className="mt-6 block rounded-[2px] bg-gold-luxury py-3.5 text-center font-sans text-[12px] font-bold uppercase tracking-[0.15em] text-navy-elite"
              >
                Claim Your Access
              </a>
            </div>
          </FadeIn>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-gold-luxury">
          <p className="font-sans text-[10px] font-bold uppercase tracking-[0.3em]">Scroll to Explore</p>
        </div>
      </section>

      <section id="vision" className="relative overflow-hidden bg-white py-32 text-navy-elite">
        <div className="pointer-events-none absolute -left-10 top-10 select-none font-serif text-[12rem] font-black uppercase italic leading-none text-navy-elite/[0.04] md:text-[20rem]">
          Legacy
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-20 lg:grid-cols-2">
            <FadeIn>
              <div className="relative">
                <div className="absolute -left-4 -top-4 h-full w-full border border-gold-luxury/40" />
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=80"
                  alt="RareAcre advisory"
                  className="relative z-10 h-[560px] w-full object-cover grayscale transition duration-700 hover:grayscale-0"
                />
                <div className="absolute -bottom-6 -right-6 z-20 bg-gold-luxury px-8 py-6 text-center text-navy-elite">
                  <div className="font-serif text-4xl font-black">20+</div>
                  <div className="font-sans text-[10px] font-bold uppercase tracking-[0.2em]">
                    Years of Impact
                  </div>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mb-4 font-sans text-xs font-bold uppercase tracking-[0.4em] text-gold-luxury">
                The Visionary
              </p>
              <h2 className="font-serif text-5xl italic leading-tight md:text-7xl">
                A Legacy of{' '}
                <span className="not-italic font-sans font-black uppercase text-gold-luxury">
                  Excellence
                </span>
              </h2>
              <p className="mt-8 text-xl leading-relaxed text-stone-dark">
                RareAcre Investment Limited is an active developer and advisory firm. We have overseen
                over &#8358;2 billion in real estate transactions, bringing practical, ground-level
                market intelligence to every engagement.
              </p>
              <blockquote className="mt-8 border-l-4 border-gold-luxury pl-6 font-serif text-2xl italic leading-relaxed text-navy-elite">
                &ldquo;Real estate is the only investment where you can use other people&apos;s money
                to build your own wealth safely.&rdquo;
              </blockquote>
              <div className="mt-12 grid grid-cols-2 gap-10">
                {stats.slice(0, 2).map((stat) => (
                  <div key={stat.label} className="border-l border-gold-luxury/40 pl-6">
                    <div className="font-serif text-5xl font-black text-gold-luxury">{stat.value}</div>
                    <div className="mt-2 font-sans text-xs font-bold uppercase tracking-[0.2em] text-stone">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section id="services" className="relative overflow-hidden bg-navy-elite py-32">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=80')] bg-cover bg-fixed bg-center opacity-5" />
        <div className="pointer-events-none absolute right-0 top-16 select-none font-serif text-[12rem] font-black uppercase italic leading-none text-white/[0.03] md:text-[18rem]">
          World
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <FadeIn className="mb-20 text-center">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.4em] text-gold-luxury">
              Our Services
            </p>
            <h2 className="font-sans text-5xl font-black uppercase md:text-7xl">
              The World of <span className="text-gold-luxury">RareAcre</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/60">
              Empowering investors through high-stakes real estate intelligence and documented
              consultancy outcomes.
            </p>
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'Land Verification',
                label: 'Protect',
                desc: 'Structured due diligence, risk assessment, and acquisition guidance before you commit capital.',
              },
              {
                title: 'Development Feasibility',
                label: 'Clarify',
                desc: 'Market review, financial outlook, and highest & best use analysis for landowners and investors.',
              },
              {
                title: 'Project Planning',
                label: 'Build',
                desc: 'Budget frameworks, roadmaps, and construction strategy for first-time and seasoned developers.',
              },
            ].map((item, index) => (
              <FadeIn key={item.title} delay={index * 0.1}>
                <div className="group h-full border border-white/10 bg-white/5 p-10 backdrop-blur-md transition hover:border-gold-luxury">
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold-luxury">
                    {item.label}
                  </p>
                  <h3 className="mt-4 text-2xl font-black uppercase">{item.title}</h3>
                  <p className="mt-4 text-base leading-relaxed text-white/60">{item.desc}</p>
                  <a
                    href="#pricing"
                    className="mt-8 flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-gold-luxury"
                  >
                    Explore Now <span className="transition-transform group-hover:translate-x-2">→</span>
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="relative py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.08),transparent_50%)]" />
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <FadeIn className="mb-20 text-center">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.4em] text-gold-luxury">
              Consultation Packages
            </p>
            <h2 className="font-sans text-5xl font-black uppercase md:text-7xl">
              Advisory <span className="text-gold-luxury">Tiers</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/60">
              Five structured packages. Clear scope. Transparent pricing. Written deliverables on
              every engagement.
            </p>
          </FadeIn>
          <Packages variant="dark" />
        </div>
      </section>

      <section className="bg-white px-6 py-28 text-navy-elite">
        <div className="mx-auto max-w-7xl">
          <FadeIn className="mb-16 text-center">
            <p className="font-sans text-[11px] font-bold uppercase tracking-[0.4em] text-gold-luxury">
              Client Segments
            </p>
            <h2 className="mt-4 font-serif text-5xl italic md:text-6xl">
              Who We{' '}
              <span className="not-italic font-sans font-black uppercase text-gold-luxury">Serve</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-stone-dark">
              Our consultations are designed for anyone making a real estate decision that requires
              expert guidance and documented outcomes.
            </p>
          </FadeIn>
          <div className="grid gap-px overflow-hidden border border-navy-elite/10 bg-navy-elite/10 sm:grid-cols-2 lg:grid-cols-3">
            {clientSegments.map((segment, index) => (
              <FadeIn key={segment.title} delay={index * 0.05}>
                <article className="group h-full bg-white p-10 transition hover:bg-navy-elite">
                  <div className="flex h-14 w-14 items-center justify-center border border-gold-luxury/40 text-2xl text-gold-luxury">
                    {segment.icon}
                  </div>
                  <h3 className="mt-6 font-serif text-xl italic transition group-hover:text-white">
                    {segment.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-stone-dark transition group-hover:text-white/70">
                    {segment.description}
                  </p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="relative py-32">
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn className="mb-20 text-center">
            <p className="mb-4 text-[11px] font-black uppercase tracking-[0.4em] text-gold-luxury">
              The Protocol
            </p>
            <h2 className="font-sans text-5xl font-black uppercase md:text-7xl">
              How We <span className="text-gold-luxury">Operate</span>
            </h2>
          </FadeIn>
          <div className="space-y-6">
            {processSteps.map((step, index) => (
              <FadeIn key={step.title} delay={index * 0.05}>
                <div className="group grid grid-cols-[80px_1fr] gap-8 border border-white/10 bg-white/5 p-8 backdrop-blur-md transition hover:border-gold-luxury">
                  <div className="flex h-16 w-16 items-center justify-center rounded-none border border-gold-luxury/30 font-sans text-2xl font-black text-gold-luxury transition group-hover:bg-gold-luxury group-hover:text-navy-elite">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-wider">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/50">{step.description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="bg-white py-32 text-navy-elite">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="mb-20 text-center">
            <p className="mb-4 text-[11px] font-black uppercase tracking-[0.4em] text-gold-luxury">
              Global Endorsements
            </p>
            <h2 className="font-sans text-5xl font-black uppercase md:text-7xl">
              Industry <span className="text-gold-luxury">Voices</span>
            </h2>
          </FadeIn>
          <div className="grid gap-8 md:grid-cols-2">
            {reviews.slice(0, 4).map((review, index) => (
              <FadeIn key={review.name} delay={index * 0.1}>
                <article className="border border-navy-elite/10 bg-offwhite p-12">
                  <div className="text-gold-luxury tracking-[0.3em]">★★★★★</div>
                  <p className="mt-8 text-2xl font-medium italic leading-relaxed">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="mt-10 flex items-center gap-6 border-t border-navy-elite/10 pt-8">
                    <div>
                      <p className="text-sm font-black uppercase tracking-widest">{review.name}</p>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone">
                        {review.role}
                      </p>
                    </div>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-32 text-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-navy-elite" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15),transparent_70%)]" />
        </div>
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 select-none font-serif text-[14rem] font-black uppercase italic leading-none text-white/[0.03] md:text-[22rem]">
          Value
        </div>
        <FadeIn className="relative z-10 mx-auto max-w-4xl px-6">
          <p className="mb-6 text-[11px] font-black uppercase tracking-[0.5em] text-gold-luxury">
            The Inner Circle
          </p>
          <h2 className="font-sans text-5xl font-black uppercase leading-tight md:text-8xl">
            Value <span className="text-gold-luxury italic font-serif lowercase">first</span>, Always
          </h2>
          <p className="mx-auto mt-10 max-w-2xl text-xl leading-relaxed text-white/65">
            Join over 63 clients who trusted RareAcre with their real estate decisions. Don&apos;t
            invest in land or property without expert verification first.
          </p>
          <div className="mt-16 flex flex-wrap justify-center gap-6">
            <a
              href="#contact"
              className="bg-gold-luxury px-12 py-5 text-[13px] font-black uppercase tracking-[0.22em] text-navy-elite transition hover:scale-105"
            >
              Book a Consultation
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="border border-white/20 bg-white/5 px-12 py-5 text-[13px] font-black uppercase tracking-[0.22em] text-white backdrop-blur-md transition hover:bg-white/10"
            >
              WhatsApp Us
            </a>
          </div>
          <p className="mt-8 text-xs font-bold uppercase tracking-[0.3em] text-white/40">
            All enquiries treated with strict confidentiality.
          </p>
        </FadeIn>
      </section>

      <section id="contact" className="bg-white px-6 py-28 text-navy-elite">
        <div className="mx-auto max-w-7xl">
          <FadeIn className="mb-16 text-center">
            <p className="font-sans text-[11px] font-bold uppercase tracking-[0.4em] text-gold-luxury">
              Client Care
            </p>
            <h2 className="mt-4 font-serif text-5xl italic md:text-6xl">
              Contact{' '}
              <span className="not-italic font-sans font-black uppercase text-gold-luxury">
                Inquiry
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-stone-dark">
              Our advisors respond within 24 hours to all consultation enquiries.
            </p>
          </FadeIn>

          <div className="grid gap-12 lg:grid-cols-2">
            <FadeIn>
              <h3 className="font-serif text-3xl italic">RareAcre Investment Limited</h3>
              <p className="mt-4 text-base leading-7 text-stone-dark">
                3a Benedict Nwachukwu Ave,
                <br />
                Lekki, Ogombo Rd, Lagos 106104, Nigeria.
              </p>
              <div className="mt-8 space-y-3">
                {[
                  { icon: '🌐', label: 'Website', value: 'www.rareacreinvestment.com', href: WEBSITE_URL },
                  { icon: '✉️', label: 'Email', value: EMAIL, href: `mailto:${EMAIL}` },
                  { icon: '💬', label: 'WhatsApp', value: 'Send a direct message', href: WHATSAPP_URL },
                  { icon: '📸', label: 'Instagram', value: '@rareacreltd', href: INSTAGRAM },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-4 border border-navy-elite/10 bg-offwhite p-4 transition hover:border-gold-luxury"
                  >
                    <span className="flex h-11 w-11 items-center justify-center bg-navy-elite text-base text-gold-luxury">
                      {item.icon}
                    </span>
                    <span>
                      <span className="block font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-navy-elite">
                        {item.label}
                      </span>
                      <span className="block text-sm text-stone-dark transition group-hover:text-gold-luxury">
                        {item.value}
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <ContactForm />
            </FadeIn>
          </div>
        </div>
      </section>

      <footer className="bg-black px-6 py-16 text-white/60">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="font-sans text-lg font-black uppercase tracking-[0.3em] text-white">
              Rare<span className="text-gold-luxury">Acre</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed">
              Real estate &amp; property investment experts. Structured, expert-led consultation that
              protects your capital.
            </p>
          </div>
          <div>
            <h4 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-gold-luxury">
              The Firm
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              <li><a href="#vision" className="hover:text-gold-luxury">Who We Are</a></li>
              <li><a href="#services" className="hover:text-gold-luxury">Our Services</a></li>
              <li><a href="#process" className="hover:text-gold-luxury">The Process</a></li>
              <li><a href="#reviews" className="hover:text-gold-luxury">Endorsements</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-gold-luxury">
              Packages
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              <li><a href="#pricing" className="hover:text-gold-luxury">Land Verification</a></li>
              <li><a href="#pricing" className="hover:text-gold-luxury">Due Diligence</a></li>
              <li><a href="#pricing" className="hover:text-gold-luxury">Feasibility</a></li>
              <li><a href="#pricing" className="hover:text-gold-luxury">Project Planning</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-gold-luxury">
              Client Care
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              <li><a href="#contact" className="hover:text-gold-luxury">Contact Inquiry</a></li>
              <li>
                <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="hover:text-gold-luxury">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={WEBSITE_URL} target="_blank" rel="noreferrer" className="hover:text-gold-luxury">
                  Website
                </a>
              </li>
              <li><Link to="/" className="hover:text-gold-luxury">Templates</Link></li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-14 max-w-7xl border-t border-white/10 pt-6 text-center text-xs text-white/35">
          © 2026 RareAcre Investment Limited. All Rights Reserved.
        </div>
      </footer>

      <WhatsAppFloat />
    </div>
  )
}
