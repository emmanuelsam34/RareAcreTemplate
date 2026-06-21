import { processSteps } from '../../data/content'
import { TwoUpCarousel } from '../shared/TwoUpCarousel'

export function ProcessStepsCarousel() {
  return (
    <TwoUpCarousel
      items={processSteps}
      getKey={(step) => step.title}
      itemLabel={(index, total) => `Process step ${index} of ${total}`}
      prevLabel="Previous process steps"
      nextLabel="Next process steps"
      pageLabel={(page) => `Go to process page ${page + 1}`}
      renderCard={(step) => (
        <article className="t1-card-muted flex h-full min-h-[260px] flex-col px-6 py-7 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md sm:min-h-[280px] sm:px-8 sm:py-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red font-poppins text-lg font-bold text-white">
            {step.step}
          </div>
          <h3 className="mt-5 font-poppins text-base font-semibold t1-heading sm:text-lg">
            {step.title}
          </h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed t1-body sm:text-[15px]">
            {step.description}
          </p>
        </article>
      )}
    />
  )
}
