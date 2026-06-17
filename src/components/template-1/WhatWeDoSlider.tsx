import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { consultancyServices } from '../../data/content'

export function WhatWeDoSlider() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % consultancyServices.length)
    }, 6000)
    return () => window.clearInterval(timer)
  }, [])

  const go = (next: number) =>
    setIndex((next + consultancyServices.length) % consultancyServices.length)
  const active = consultancyServices[index]

  return (
    <motion.section
      id="services"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative h-[480px] overflow-hidden md:h-[537px]"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={active.image}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <img
            src={active.image}
            alt={active.title}
            className={`h-full w-full object-cover ${active.imagePosition}`}
          />
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-6 top-1/2 z-10 w-[calc(100%-2rem)] max-w-[463px] -translate-y-1/2 bg-[#cf0e15] px-10 py-10 md:left-16 md:w-[463px] md:py-12"
        >
          <p className="font-poppins text-lg font-semibold text-white">Consultation Services</p>
          <span className="mt-3 block h-0.5 w-20 bg-white" />
          <h3 className="mt-5 font-poppins text-[26px] font-bold leading-tight text-white md:text-[30px]">
            {active.title}
          </h3>
          <p className="mt-5 font-poppins text-sm leading-relaxed text-justify text-white">
            {active.desc}
          </p>
          <a
            href="#pricing"
            className="mt-8 inline-block rounded-full bg-white px-8 py-3.5 font-poppins text-sm font-semibold text-[#cf0e15] transition hover:bg-white/90"
          >
            View Packages
          </a>
        </motion.div>
      </AnimatePresence>

      <button
        type="button"
        aria-label="Previous service"
        onClick={() => go(index - 1)}
        className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-2xl text-white/50 transition hover:text-white md:left-6"
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Next service"
        onClick={() => go(index + 1)}
        className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-2xl text-white/50 transition hover:text-white md:right-6"
      >
        ›
      </button>

      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {consultancyServices.map((service, serviceIndex) => (
          <button
            key={service.title}
            type="button"
            aria-label={`Go to ${service.title}`}
            onClick={() => setIndex(serviceIndex)}
            className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
              serviceIndex === index ? 'bg-white' : 'bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </motion.section>
  )
}
