import {MobileNavButton} from "../MobileNavButton";
import { hasLoginDialog } from '../../stores/page.ts';

export const Menu = () => {
    return (
        <div
            className="container flex flex-col md:flex-row items-center pt-10 justify-between !pb-10 z-20 relative px-responsive px-4 md:px-0">
            <div className="flex flex-row justify-between w-full flex-1">
                <a href="/" className="font-wonderbar text-3xl">kids coloring page</a>
                <MobileNavButton />
            </div>
            <div className="hidden md:block w-full md:w-auto mt-3 md:mt-0" id="menu">
                <div
                    className="flex flex-col md:flex-row items-center gap-x-8 gap-y-4 md:gap-y-0 flex-1 text-white md:text-black bg-black md:bg-transparent py-5 md:py-0 rounded-xl">
                    <a href="/color-pages" className="hover:text-[#F36A3C]">Free coloring pages</a>
                    <a href="/#wall-of-love" className="hover:text-[#F36A3C]">Wall of love</a>
                    <a href="/#pricing" className="hover:text-[#F36A3C]">Pricing</a>
                    <button onClick={() => hasLoginDialog.set(true)}
                            className="button hidden md:block text-center min-w-[126px]">Start Free
                    </button>
                </div>
            </div>
        </div>
    );
}