import {hasLoginDialog} from "../../stores/page.ts";

export function StatsHero() {
    return (
        <div className="bg-[#F36A3B]">
            <div
                className="container flex flex-col md:flex-row justify-between gap-y-6 md:gap-y-0 md:gap-x-28 py-10 items-center px-4 md:px-0 px-responsive">
                <div
                    className="flex flex-col md:flex-row flex-1 justify-between gap-y-4 md:gap-y-0 text-center md:text-left">
                    <div className="flex flex-col gap-y-2 font-sansita">
                        <p className="font-bold text-5xl text-white flex flex-row gap-x-3 justify-center md:justify-start">
                            <span>#1</span>
                            <img src="/icon-magic-wand.png" alt="icon-magic-wand" className="w-[45px] h-auto"/>
                        </p>
                        <p className="text-xl text-[#EBEBEB] font-light">AI coloring page generator</p>
                    </div>
                    <div className="flex flex-col gap-y-2 font-sansita">
                        <p className="font-bold text-5xl text-white">580,000+</p>
                        <p className="text-xl text-[#EBEBEB] font-light">Coloring sheets created!</p>
                    </div>
                    <div className="flex flex-col gap-y-2 font-sansita">
                        <p className="font-bold text-5xl text-white">5,000+</p>
                        <p className="text-xl text-[#EBEBEB] font-light">Parents using for their kids</p>
                    </div>
                </div>
                <button onClick={() => hasLoginDialog.set(true)} className="button-2 hidden-responsive">Start using for
                    free
                </button>
            </div>
        </div>
    );
}