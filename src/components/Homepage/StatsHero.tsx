import { hasLoginDialog } from '../../stores/page.ts';
import { isLoggedIn } from '../../lib/jwt.ts';

export function StatsHero() {
  return (
    <div className="bg-gradient-to-l from-[#000D60] from-0% via-[#612F84] to-[#944196]">
      <div className="px-responsive container flex flex-col items-center justify-between gap-y-6 px-4 py-10 md:flex-row md:gap-x-28 md:gap-y-0 md:px-0">
        <div className="flex flex-1 flex-col justify-between gap-y-4 text-center md:flex-row md:gap-y-0 md:text-left">
          <div className="flex flex-col gap-y-2 font-sansita">
            <p className="flex flex-row justify-center gap-x-3 text-5xl font-bold text-white md:justify-start">
              <span>#1</span>
              <img
                src="/icon-magic-wand.png"
                alt="icon-magic-wand"
                className="h-auto w-[45px]"
              />
            </p>
            <p className="text-xl font-light text-[#EBEBEB]">
              AI coloring page generator
            </p>
          </div>
          <div className="flex flex-col gap-y-2 font-sansita">
            <p className="text-5xl font-bold text-white">580,000+</p>
            <p className="text-xl font-light text-[#EBEBEB]">
              Coloring sheets created!
            </p>
          </div>
          <div className="flex flex-col gap-y-2 font-sansita">
            <p className="text-5xl font-bold text-white">5,000+</p>
            <p className="text-xl font-light text-[#EBEBEB]">
              Parents using for their kids
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            if (isLoggedIn()) {
              window.location.href = '/dashboard';
              return;
            } else {
              hasLoginDialog.set(true);
            }
          }}
          className="button-2 flex flex-row items-center gap-x-4"
        >
          <span className="flex-1 text-center">Start using for free</span>
          <img
            src="/icon-angle-right.png"
            alt="icon-angle-right"
            className="mt-[4px] h-auto w-[10px]"
          />
        </button>
      </div>
    </div>
  );
}
