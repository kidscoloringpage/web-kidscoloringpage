import { hasLoginDialog } from '../../stores/page.ts';
import { isLoggedIn } from '../../lib/jwt.ts';

export function HomepageHero() {
  return (
    <div className="px-responsive container relative z-20 flex flex-col items-center justify-center px-4 md:!mt-6 md:flex-row md:items-end md:justify-between md:px-0">
      <div className="mb-12 flex flex-col gap-y-5 md:mb-16">
        <p className="flex flex-row items-center gap-x-3 font-sansita text-3xl sm:text-4xl md:text-6xl">
          Introducing AI{' '}
          <img
            src="/icon-magic-wand.png"
            alt="icon-magic-wand"
            className="h-auto w-[52px]"
          />
        </p>
        <p className="font-wonderbar text-3xl sm:text-4xl md:text-6xl lg:text-6xl xl:text-6xl">
          <span className="text-[#6A7DF6]">Kids</span>
          <span className="text-[#347C44]">Coloring</span>
          <span className="text-[#EF60B7]">Page</span>
        </p>
        <p className="text-xl font-light md:w-3/5 md:text-2xl">
          Unlock Your Child's Imagination: KidsColoringPage Allows Parents to
          Inspire and Let Their Kids Color Anything They Imagine.
        </p>
        <button
          onClick={() => {
            if (isLoggedIn()) {
              window.location.href = '/dashboard';
              return;
            } else {
              hasLoginDialog.set(true);
            }
          }}
          className="button flex w-fit flex-row items-center justify-center gap-x-4 md:relative md:min-w-[252px]"
        >
          Start using for free
          <img
            src="/icon-angle-right.png"
            alt="icon-angle-right"
            className="mt-[4px] h-auto w-[10px] md:absolute md:right-4"
          />
        </button>
      </div>
      <img
        src="/girl-painting.png"
        alt="girl-painting"
        className="mx-auto w-full md:absolute md:right-0 md:-z-10 md:w-2/4"
      />
    </div>
  );
}
