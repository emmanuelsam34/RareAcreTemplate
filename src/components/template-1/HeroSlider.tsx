import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { heroSlides, CONSULTATION_FORM_URL } from '../../data/content'

export function HeroSlider() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % heroSlides.length)
    }, 6000)
    return () => window.clearInterval(timer)
  }, [])

  const go = (next: number) => setIndex((next + heroSlides.length) % heroSlides.length)
  const active = heroSlides[index]

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={active.image}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
          className="absolute inset-0 z-0"
        >
          <img src={active.image} alt="" className="h-full w-full object-cover" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 z-[1] bg-black/55" />

      <div className="relative z-10 mx-auto w-full max-w-4xl px-6 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-poppins text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
              Consultation &amp; Advisory Services
            </p>
            <h1 className="mt-4 font-poppins text-3xl font-semibold capitalize leading-[1.15] text-white md:text-5xl lg:text-[56px]">
              {active.headline}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl font-poppins text-[15px] font-normal leading-relaxed text-white">
              {active.subtitle}
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href="#pricing"
                className="rounded-full bg-pink px-9 py-4 font-poppins text-sm font-bold uppercase tracking-wide text-black transition hover:scale-105"
              >
                View Consultation Packages
              </a>
              <a
                href={CONSULTATION_FORM_URL}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border-2 border-white px-9 py-4 font-poppins text-sm font-bold uppercase tracking-wide text-white transition hover:bg-white hover:text-black"
              >
                Book a Strategy Session
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => go(index - 1)}
        className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 text-xl text-white transition hover:border-white hover:bg-white/10 md:left-8"
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => go(index + 1)}
        className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 text-xl text-white transition hover:border-white hover:bg-white/10 md:right-8"
      >
        ›
      </button>

      <div className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 gap-3">
        {heroSlides.map((slide, slideIndex) => (
          <button
            key={slide.headline}
            type="button"
            aria-label={`Go to slide ${slideIndex + 1}`}
            onClick={() => setIndex(slideIndex)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              slideIndex === index ? 'scale-110 bg-pink' : 'bg-white/50 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
