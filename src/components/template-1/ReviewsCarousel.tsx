import { reviews } from '../../data/content'
import { TwoUpCarousel } from '../shared/TwoUpCarousel'

export function ReviewsCarousel() {
  return (
    <TwoUpCarousel
      items={reviews}
      getKey={(review) => review.role}
      itemLabel={(index, total) => `Client review ${index} of ${total}`}
      prevLabel="Previous reviews"
      nextLabel="Next reviews"
      pageLabel={(page) => `Go to review page ${page + 1}`}
      renderCard={(review) => (
        <article className="t1-card flex h-full min-h-[280px] flex-col p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md sm:p-9">
          <div className="tracking-widest text-red">★★★★★</div>
          <p className="mt-4 flex-1 text-sm italic leading-relaxed t1-body sm:mt-5 sm:text-base">
            &ldquo;{review.text}&rdquo;
          </p>
          <div className="mt-6 border-t t1-border pt-4 sm:mt-7 sm:pt-5">
            <p className="font-poppins text-[10px] font-semibold uppercase tracking-[0.14em] text-red sm:text-xs">
              Verified Client
            </p>
            <p className="mt-1 text-xs uppercase tracking-wide t1-body opacity-60 sm:text-sm">
              {review.role}
            </p>
          </div>
        </article>
      )}
    />
  )
}
