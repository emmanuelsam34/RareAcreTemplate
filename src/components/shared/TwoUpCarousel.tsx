import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'

const CARDS_PER_PAGE = 2
const AUTO_INTERVAL_MS = 5500

type TwoUpCarouselProps<T> = {
  items: T[]
  getKey: (item: T) => string
  renderCard: (item: T, index: number) => ReactNode
  itemLabel: (index: number, total: number) => string
  prevLabel?: string
  nextLabel?: string
  pageLabel?: (page: number) => string
  autoPlay?: boolean
  autoPlayInterval?: number
}

export function TwoUpCarousel<T>({
  items,
  getKey,
  renderCard,
  itemLabel,
  prevLabel = 'Previous',
  nextLabel = 'Next',
  pageLabel = (page) => `Go to page ${page + 1}`,
  autoPlay = true,
  autoPlayInterval = AUTO_INTERVAL_MS,
}: TwoUpCarouselProps<T>) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [activePage, setActivePage] = useState(0)
  const [paused, setPaused] = useState(false)
  const activePageRef = useRef(activePage)

  activePageRef.current = activePage

  const pages = useMemo(() => {
    const result: T[][] = []
    for (let i = 0; i < items.length; i += CARDS_PER_PAGE) {
      result.push(items.slice(i, i + CARDS_PER_PAGE))
    }
    return result
  }, [items])

  const scrollToPage = useCallback(
    (page: number) => {
      const track = trackRef.current
      if (!track || pages.length === 0) return

      const nextPage = ((page % pages.length) + pages.length) % pages.length
      const slide = track.children[nextPage] as HTMLElement | undefined
      if (!slide) return

      track.scrollTo({ left: slide.offsetLeft, behavior: 'smooth' })
      setActivePage(nextPage)
    },
    [pages.length],
  )

  const handleScroll = useCallback(() => {
    const track = trackRef.current
    if (!track) return

    const scrollLeft = track.scrollLeft
    const slideWidth = track.clientWidth
    const nextPage = Math.round(scrollLeft / slideWidth)
    setActivePage(Math.max(0, Math.min(nextPage, pages.length - 1)))
  }, [pages.length])

  useEffect(() => {
    if (!autoPlay || paused || pages.length <= 1) return

    const timer = window.setInterval(() => {
      scrollToPage(activePageRef.current + 1)
    }, autoPlayInterval)

    return () => window.clearInterval(timer)
  }, [autoPlay, autoPlayInterval, paused, pages.length, scrollToPage])

  const canNavigate = pages.length > 1

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setPaused(false)
        }
      }}
    >
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {pages.map((pageItems, pageIndex) => (
          <div
            key={pageIndex}
            className="grid w-full shrink-0 snap-start grid-cols-2 gap-3 sm:gap-5"
          >
            {pageItems.map((item, index) => {
              const itemIndex = pageIndex * CARDS_PER_PAGE + index
              return (
                <div key={getKey(item)} aria-label={itemLabel(itemIndex + 1, items.length)}>
                  {renderCard(item, itemIndex)}
                </div>
              )
            })}
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-4 sm:mt-8">
        <button
          type="button"
          aria-label={prevLabel}
          onClick={() => scrollToPage(activePage - 1)}
          disabled={!canNavigate}
          className="flex h-10 w-10 items-center justify-center rounded-full border t1-border text-xl t1-heading transition enabled:hover:border-red enabled:hover:text-red disabled:cursor-not-allowed disabled:opacity-30"
        >
          ‹
        </button>

        <div className="flex gap-2">
          {pages.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={pageLabel(index)}
              onClick={() => scrollToPage(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === activePage ? 'w-8 bg-red' : 'w-2.5 bg-ink/20 dark:bg-white/25'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label={nextLabel}
          onClick={() => scrollToPage(activePage + 1)}
          disabled={!canNavigate}
          className="flex h-10 w-10 items-center justify-center rounded-full border t1-border text-xl t1-heading transition enabled:hover:border-red enabled:hover:text-red disabled:cursor-not-allowed disabled:opacity-30"
        >
          ›
        </button>
      </div>
    </div>
  )
}
