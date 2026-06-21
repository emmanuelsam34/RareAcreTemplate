import { clientSegments } from '../../data/content'
import { TwoUpCarousel } from '../shared/TwoUpCarousel'

export function ClientSegmentsCarousel() {
  return (
    <TwoUpCarousel
      items={clientSegments}
      getKey={(segment) => segment.title}
      itemLabel={(index, total) => `Client segment ${index} of ${total}`}
      prevLabel="Previous client segments"
      nextLabel="Next client segments"
      pageLabel={(page) => `Go to client segment page ${page + 1}`}
      renderCard={(segment) => (
        <article className="t1-card-muted flex h-full min-h-[260px] flex-col px-6 py-7 text-center shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md sm:min-h-[280px] sm:px-8 sm:py-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red text-2xl text-white">
            {segment.icon}
          </div>
          <h3 className="mt-5 font-poppins text-base font-semibold t1-heading sm:text-lg">
            {segment.title}
          </h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed t1-body sm:text-[15px]">
            {segment.description}
          </p>
        </article>
      )}
    />
  )
}
