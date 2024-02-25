import {isLoggedIn} from "../lib/jwt.ts";
import {hasLoginDialog, pageProgressMessage} from "../stores/page.ts";
import {httpPost} from "../lib/http.ts";
import {toast} from "sonner";

export function Pricing(props: { hasActiveSubscription: boolean }) {

    async function manageSubscription() {
        pageProgressMessage.set('Please wait');

        const { response, error } = await httpPost(
            `${import.meta.env.PUBLIC_API_URL}/v1-create-customer-portal-session`,
            {
                returnUrl: window.location.href,
            },
        );

        if (error || !response) {
            pageProgressMessage.set('');
            toast.error(error?.message || 'Something went wrong');
            return;
        }

        window.location.href = response.url;
    }

    async function subscribeToPlan(planId: string) {
        if (!isLoggedIn()) {
            hasLoginDialog.set(true);
            return;
        }

        pageProgressMessage.set('Please wait');

        const { error, response } = await httpPost(
            `${import.meta.env.PUBLIC_API_URL}/v1-create-payment-session`,
            {
                priceId: planId,
            },
        );

        if (error || !response) {
            pageProgressMessage.set('');
            toast.error(error?.message || 'Something went wrong');
            return;
        }

        window.location.href = response.url;
    };

    return (
        <div className="bg-[#FFF2DF]" id="pricing">
            <div className="container py-12 md:py-20 px-4 md:px-0 px-responsive">
                <p className="font-bold font-sansita text-4xl mb-5">Pricing Plans</p>
                <p className="text-xl text-[#545454] mb-8 font-light">Pick the plan that works for your baby!</p>
                <div className="max-auto">
                    <div className="md:grid md:gap-x-3 md:grid-cols-3 flex flex-col gap-y-4 md:gap-y-0">
                        <div className="flex flex-col border border-black rounded-2xl py-6 px-6 relative bg-white">
                            <p className="mb-3.5"><span className="font-black text-4xl">$5</span> <span
                                className="font-semibold">/ 10 images</span></p>
                            <p className="font-semibold mb-3">Pay as you go</p>
                            <p className="font-light text-[#545454] mb-6">1 Credit for every page you generate</p>
                            <div className="border border-dashed border-[#CCCAC7] mb-6 opacity-60"/>
                            <div className="flex flex-col gap-y-4 mb-6">
                                <div className="flex flex-row gap-x-2 items-center">
                                    <img src="/icon-check-circle.png" alt="icon-check-circle"
                                         className="w-[18px] h-auto"/>
                                    <p className="text-sm">Create, save, download and print mages</p>
                                </div>
                                <div className="flex flex-row gap-x-2 items-center">
                                    <img src="/icon-check-circle.png" alt="icon-check-circle"
                                         className="w-[18px] h-auto"/>
                                    <p className="text-sm">Dashboard for viewing all your images</p>
                                </div>
                                <div className="flex flex-row gap-x-2 items-center">
                                    <img src="/icon-check-circle.png" alt="icon-check-circle"
                                         className="w-[18px] h-auto"/>
                                    <p className="text-sm">Buy as you need</p>
                                </div>
                            </div>
                            <button
                                disabled={props?.hasActiveSubscription}
                                className="button-2 flex flex-row items-center gap-x-2 mb-5 disabled:opacity-30 disabled:hover:text-black">
                                <span className="flex-1 text-center">Buy one time</span>
                                <img src="/icon-angle-right.png" alt="icon-angle-right"
                                     className="w-[10px] h-auto mt-[4px]"/>
                            </button>
                            <div className="flex flex-row gap-x-2 items-center">
                                <img src="/icon-shield.png" alt="icon-shield" className="w-[24px] h-auto"/>
                                <p className="text-xs font-medium text-[#545454]">Risk free: 2 Days Money Back
                                    Guarantee</p>
                            </div>
                        </div>
                        <div className="flex flex-col border border-black rounded-2xl py-6 px-6 relative bg-white">
                            <p className="mb-3.5 font-black text-4xl">$7.99</p>
                            <p className="font-semibold mb-3">Monthly</p>
                            <p className="font-light text-[#545454] mb-6">Unlimited color pages, billed monthly</p>
                            <div className="border border-dashed border-[#CCCAC7] mb-6 opacity-60"/>
                            <div className="flex flex-col gap-y-4 mb-6">
                                <div className="flex flex-row gap-x-2 items-center">
                                    <img src="/icon-check-circle.png" alt="icon-check-circle"
                                         className="w-[18px] h-auto"/>
                                    <p className="text-sm">Create, save, download and print mages</p>
                                </div>
                                <div className="flex flex-row gap-x-2 items-center">
                                    <img src="/icon-check-circle.png" alt="icon-check-circle"
                                         className="w-[18px] h-auto"/>
                                    <p className="text-sm">Dashboard for viewing all your images</p>
                                </div>
                                <div className="flex flex-row gap-x-2 items-center">
                                    <img src="/icon-check-circle.png" alt="icon-check-circle"
                                         className="w-[18px] h-auto"/>
                                    <p className="text-sm">Renews monthly</p>
                                </div>
                            </div>
                            <button
                                onClick={() => props?.hasActiveSubscription ? manageSubscription() : subscribeToPlan("v1-all-professional-month")}
                                className="button-2 flex flex-row items-center gap-x-4 mb-5">
                                <span
                                    className="flex-1 text-center">{props?.hasActiveSubscription ? "Manage subscription" : "Subscribe now"}</span>
                                <img src="/icon-angle-right.png" alt="icon-angle-right"
                                     className="w-[10px] h-auto mt-[4px]"/>
                            </button>
                            <div className="flex flex-col gap-y-4">
                                <div className="flex flex-row gap-x-2 items-center">
                                    <img src="/icon-shield.png" alt="icon-shield" className="w-[24px] h-auto"/>
                                    <p className="text-xs font-medium text-[#545454]">Risk free: 2 Days Money Back
                                        Guarantee</p>
                                </div>
                                <div className="flex flex-row gap-x-2 items-center">
                                    <img src="/icon-shield.png" alt="icon-shield" className="w-[24px] h-auto"/>
                                    <p className="text-xs font-medium text-[#545454]">No commitment</p>
                                </div>
                            </div>
                        </div>
                        <div
                            className="flex flex-col border border-black rounded-2xl py-6 px-6 relative bg-white mt-4 md:mt-0">
                            <p className="bg-[#F36A3B] py-1.5 px-3.5 w-fit text-white font-bold rounded-3xl -top-5 left-6 absolute">20%
                                OFF</p>
                            <p className="mb-3.5 font-black text-4xl">$79.99 <span
                                className="text-[#686868] text-2xl line-through font-light">$95.88</span></p>
                            <p className="font-semibold mb-3">Yearly</p>
                            <p className="font-light text-[#545454] mb-6">Unlimited color pages, billed annually</p>
                            <div className="border border-dashed border-[#CCCAC7] mb-6 opacity-60"/>
                            <div className="flex flex-col gap-y-4 mb-6">
                                <div className="flex flex-row gap-x-2 items-center">
                                    <img src="/icon-check-circle.png" alt="icon-check-circle"
                                         className="w-[18px] h-auto"/>
                                    <p className="text-sm">Create, save, download and print mages</p>
                                </div>
                                <div className="flex flex-row gap-x-2 items-center">
                                    <img src="/icon-check-circle.png" alt="icon-check-circle"
                                         className="w-[18px] h-auto"/>
                                    <p className="text-sm">Dashboard for viewing all your images</p>
                                </div>
                                <div className="flex flex-row gap-x-2 items-center">
                                    <img src="/icon-check-circle.png" alt="icon-check-circle"
                                         className="w-[18px] h-auto"/>
                                    <p className="text-sm">2 months free!</p>
                                </div>
                            </div>
                            <button
                                onClick={() => props?.hasActiveSubscription ? manageSubscription() : subscribeToPlan("v1-all-professional-year")}
                                className="button-2 flex flex-row items-center gap-x-4 mb-5">
                                <span className="flex-1 text-center">{props?.hasActiveSubscription ? "Manage subscription" : "Subscribe now"}</span>
                                <img src="/icon-angle-right.png" alt="icon-angle-right"
                                     className="w-[10px] h-auto mt-[4px]"/>
                            </button>
                            <div className="flex flex-col gap-y-4">
                                <div className="flex flex-row gap-x-2 items-center">
                                    <img src="/icon-shield.png" alt="icon-shield" className="w-[24px] h-auto"/>
                                    <p className="text-xs font-medium text-[#545454]">Risk free: 2 Days Money Back
                                        Guarantee</p>
                                </div>
                                <div className="flex flex-row gap-x-2 items-center">
                                    <img src="/icon-shield.png" alt="icon-shield" className="w-[24px] h-auto"/>
                                    <p className="text-xs font-medium text-[#545454]">No commitment</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}