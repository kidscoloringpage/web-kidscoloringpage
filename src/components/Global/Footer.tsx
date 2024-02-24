import {toast} from "sonner";

export const Footer = (props: {paymentSessionId: string}) => {

    if (props.paymentSessionId && !window.sessionStorage.getItem('paymentSessionId')) {
        toast.success('Payment successful', {
            duration: 6000
        });
        window.sessionStorage.setItem('paymentSessionId', props.paymentSessionId);
    }

    return (
        <div
            className="bg-gradient-to-b md:bg-gradient-to-r from-0% from-[#000D60] via-[#612F84] to-[#944196] pt-14 md:pt-20 pb-14">
            <div className="container px-responsive px-4 md:px-0">
                <div
                    className="flex flex-col md:flex-row flex-col-responsive justify-between gap-y-5 md:gap-y-6 gap-x-14">
                    <div className="text-white font-sansita text-2xl md:text-3xl flex-1">
                        <p className="mb-1">Want product news and updates? </p>
                        <p className="">Sign up for our newsletter.</p>
                    </div>
                    <div className="flex flex-col gap-y-3 justify-between flex-1">
                        <div className="flex flex-row gap-x-2.5">
                            <label className="mix-blend-soft-light flex-1">
                                <input type="text" placeholder="Enter your email address"
                                       className="bg-[#EBEBEB] text-black placeholder-black/50 outline-none font-light rounded-lg gap-x-2 px-4 py-3 w-full md:min-w-[380px]"/>
                            </label>
                            <button
                                className="bg-white text-black font-medium rounded-lg px-6 md:px-11 py-2 w-fit">Subscribe
                            </button>
                        </div>
                        <p className="text-[#757575] text-xs">We hate spam as much as you do. You can unsubscribe at any
                            time.</p>
                    </div>
                </div>
                <div className="border border-[#414141] my-6 md:my-10 opacity-30"/>
                <div className="flex flex-col md:flex-row justify-between gap-y-5 md:gap-y-0 gap-x-14">
                    <div className="flex flex-col flex-1 gap-y-5">
                        <p className="font-wonderbar text-2xl md:text-3xl"><span
                            className="text-[#6A7DF6]">KIDS</span><span className="text-[#347C44]">COLORING</span><span
                            className="text-[#EF60B7]">PAGE</span></p>
                        <p className="text-[#C2C2C2]">Introducing our AI platform generating kid-friendly coloring
                            sheets. Designed to spark creativity, our tool offers themed designs for endless fun. Easily
                            customizable for educational needs, these sheets are both entertaining and educational. Your
                            kids can color these pages to their heart's content!</p>
                    </div>
                    <div className="flex flex-row justify-between flex-1 flex-wrap md:flex-nowrap gap-y-5 md:gap-y-0">
                        <div>
                            <p className="text-white font-semibold text-lg mb-4">Kids Coloring</p>
                            <div className="text-[#C2C2C2] flex flex-col gap-y-1.5">
                                <a href="/color-pages" className="hover:underline">Free Coloring Pages</a>
                                <a href="/#wall-of-love" className="hover:underline">Wall of Love</a>
                                <a href="/#pricing" className="hover:underline">Pricing</a>
                                <a href="#" className="hover:underline">Blog</a>
                            </div>
                        </div>
                        <div>
                            <p className="text-white font-semibold text-lg mb-4">Company</p>
                            <div className="text-[#C2C2C2] flex flex-col gap-y-1.5">
                                <a href="#" className="hover:underline">About us</a>
                                <a href="#" className="hover:underline">Contact us</a>
                            </div>
                        </div>
                        <div>
                            <p className="text-white font-semibold text-lg mb-4">Follow us</p>
                            <div className="text-[#C2C2C2] flex flex-col gap-y-1.5">
                                <a href="#" className="hover:underline">Facebook</a>
                                <a href="#" className="hover:underline">Instagram</a>
                                <a href="#" className="hover:underline">Twitter</a>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="text-[#C2C2C2] text-sm mt-4 md:mt-1 opacity-20">All rights reserved by
                    kidscoloringpage.com</p>
            </div>
        </div>
    );
}