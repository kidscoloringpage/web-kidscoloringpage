import {hasLoginDialog} from "../../stores/page.ts";

export function HomepageHero() {
    return (
        <div className="container flex flex-col md:flex-row justify-center md:justify-between items-center md:items-end relative z-20 md:!mt-6 px-4 md:px-0 px-responsive">
            <div className="flex flex-col gap-y-5 mb-12 md:mb-16">
                <p className="font-sansita text-3xl sm:text-4xl md:text-6xl flex flex-row items-center gap-x-3">Introducing
                    AI <img src="/icon-magic-wand.png" alt="icon-magic-wand" className="w-[52px] h-auto"/></p>
                <p className="font-wonderbar text-3xl sm:text-4xl md:text-6xl lg:text-6xl xl:text-6xl">
                    <span className="text-[#6A7DF6]">Kids</span>
                    <span className="text-[#347C44]">Coloring</span>
                    <span className="text-[#EF60B7]">Page</span>
                </p>
                <p className="font-light text-xl md:text-2xl md:w-3/5">Unlock Your Child's Imagination: KidsColoringPage
                    Allows Parents to Inspire and Let Their Kids Color Anything They Imagine.</p>
                <button
                    onClick={() => hasLoginDialog.set(true)}
                    className="button flex flex-row w-fit items-center justify-center gap-x-4 md:min-w-[252px] md:relative">
                    Start using for free
                    <img src="/icon-angle-right.png" alt="icon-angle-right" className="w-[10px] h-auto mt-[4px] md:absolute md:right-4"/>
                </button>
            </div>
            <img src="/girl-painting.png" alt="girl-painting"
                 className="w-full md:w-2/4 mx-auto md:absolute md:right-0 md:-z-10"/>
        </div>
    );
}