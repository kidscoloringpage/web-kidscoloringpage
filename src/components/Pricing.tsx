import { isLoggedIn } from '../lib/jwt.ts';
import { hasLoginDialog, pageProgressMessage } from '../stores/page.ts';
import { httpPost } from '../lib/http.ts';
import { toast } from 'sonner';

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
  }

  return (
    <div className="bg-[#FFF2DF]" id="pricing">
      <div className="px-responsive container px-4 py-12 md:px-0 md:py-20">
        <p className="mb-5 font-sansita text-4xl font-bold">Pricing Plans</p>
        <p className="mb-8 text-xl font-light text-[#545454]">
          Pick the plan that works for your baby!
        </p>
        <div className="max-auto">
          <div className="flex flex-col gap-y-4 md:grid md:grid-cols-3 md:gap-x-3 md:gap-y-0">
            <div className="relative flex flex-col rounded-2xl border border-black bg-white px-6 py-6">
              <p className="mb-3.5">
                <span className="text-4xl font-black">$5</span>{' '}
                <span className="font-semibold">/ 10 images</span>
              </p>
              <p className="mb-3 font-semibold">Pay as you go</p>
              <p className="mb-6 font-light text-[#545454]">
                1 Credit for every page you generate
              </p>
              <div className="mb-6 border border-dashed border-[#CCCAC7] opacity-60" />
              <div className="mb-6 flex flex-col gap-y-4">
                <div className="flex flex-row items-center gap-x-2">
                  <img
                    src="/icon-check-circle.png"
                    alt="icon-check-circle"
                    className="h-auto w-[18px]"
                  />
                  <p className="text-sm">
                    Create, save, download and print mages
                  </p>
                </div>
                <div className="flex flex-row items-center gap-x-2">
                  <img
                    src="/icon-check-circle.png"
                    alt="icon-check-circle"
                    className="h-auto w-[18px]"
                  />
                  <p className="text-sm">
                    Dashboard for viewing all your images
                  </p>
                </div>
                <div className="flex flex-row items-center gap-x-2">
                  <img
                    src="/icon-check-circle.png"
                    alt="icon-check-circle"
                    className="h-auto w-[18px]"
                  />
                  <p className="text-sm">Buy as you need</p>
                </div>
              </div>
              <button
                disabled={props?.hasActiveSubscription}
                onClick={() =>
                  subscribeToPlan('price_1OoDEjIFLlIQIBa8NWgFxnWV')
                }
                className="button-2 mb-5 flex flex-row items-center gap-x-2 disabled:opacity-30 disabled:hover:text-black"
              >
                <span className="flex-1 text-center">Buy one time</span>
                <img
                  src="/icon-angle-right.png"
                  alt="icon-angle-right"
                  className="mt-[4px] h-auto w-[10px]"
                />
              </button>
              <div className="flex flex-row items-center gap-x-2">
                <img
                  src="/icon-shield.png"
                  alt="icon-shield"
                  className="h-auto w-[24px]"
                />
                <p className="text-xs font-medium text-[#545454]">
                  Risk free: 2 Days Money Back Guarantee
                </p>
              </div>
            </div>
            <div className="relative flex flex-col rounded-2xl border border-black bg-white px-6 py-6">
              <p className="mb-3.5 text-4xl font-black">$7.99</p>
              <p className="mb-3 font-semibold">Monthly</p>
              <p className="mb-6 font-light text-[#545454]">
                Unlimited color pages, billed monthly
              </p>
              <div className="mb-6 border border-dashed border-[#CCCAC7] opacity-60" />
              <div className="mb-6 flex flex-col gap-y-4">
                <div className="flex flex-row items-center gap-x-2">
                  <img
                    src="/icon-check-circle.png"
                    alt="icon-check-circle"
                    className="h-auto w-[18px]"
                  />
                  <p className="text-sm">
                    Create, save, download and print mages
                  </p>
                </div>
                <div className="flex flex-row items-center gap-x-2">
                  <img
                    src="/icon-check-circle.png"
                    alt="icon-check-circle"
                    className="h-auto w-[18px]"
                  />
                  <p className="text-sm">
                    Dashboard for viewing all your images
                  </p>
                </div>
                <div className="flex flex-row items-center gap-x-2">
                  <img
                    src="/icon-check-circle.png"
                    alt="icon-check-circle"
                    className="h-auto w-[18px]"
                  />
                  <p className="text-sm">Renews monthly</p>
                </div>
              </div>
              <button
                onClick={() =>
                  props?.hasActiveSubscription
                    ? manageSubscription()
                    : subscribeToPlan('v1-all-professional-month')
                }
                className="button-2 mb-5 flex flex-row items-center gap-x-4"
              >
                <span className="flex-1 text-center">
                  {props?.hasActiveSubscription
                    ? 'Manage subscription'
                    : 'Subscribe now'}
                </span>
                <img
                  src="/icon-angle-right.png"
                  alt="icon-angle-right"
                  className="mt-[4px] h-auto w-[10px]"
                />
              </button>
              <div className="flex flex-col gap-y-4">
                <div className="flex flex-row items-center gap-x-2">
                  <img
                    src="/icon-shield.png"
                    alt="icon-shield"
                    className="h-auto w-[24px]"
                  />
                  <p className="text-xs font-medium text-[#545454]">
                    Risk free: 2 Days Money Back Guarantee
                  </p>
                </div>
                <div className="flex flex-row items-center gap-x-2">
                  <img
                    src="/icon-shield.png"
                    alt="icon-shield"
                    className="h-auto w-[24px]"
                  />
                  <p className="text-xs font-medium text-[#545454]">
                    No commitment
                  </p>
                </div>
              </div>
            </div>
            <div className="relative mt-4 flex flex-col rounded-2xl border border-black bg-white px-6 py-6 md:mt-0">
              <p className="absolute -top-5 left-6 w-fit rounded-3xl bg-[#F36A3B] px-3.5 py-1.5 font-bold text-white">
                20% OFF
              </p>
              <p className="mb-3.5 text-4xl font-black">
                $79.99{' '}
                <span className="text-2xl font-light text-[#686868] line-through">
                  $95.88
                </span>
              </p>
              <p className="mb-3 font-semibold">Yearly</p>
              <p className="mb-6 font-light text-[#545454]">
                Unlimited color pages, billed annually
              </p>
              <div className="mb-6 border border-dashed border-[#CCCAC7] opacity-60" />
              <div className="mb-6 flex flex-col gap-y-4">
                <div className="flex flex-row items-center gap-x-2">
                  <img
                    src="/icon-check-circle.png"
                    alt="icon-check-circle"
                    className="h-auto w-[18px]"
                  />
                  <p className="text-sm">
                    Create, save, download and print mages
                  </p>
                </div>
                <div className="flex flex-row items-center gap-x-2">
                  <img
                    src="/icon-check-circle.png"
                    alt="icon-check-circle"
                    className="h-auto w-[18px]"
                  />
                  <p className="text-sm">
                    Dashboard for viewing all your images
                  </p>
                </div>
                <div className="flex flex-row items-center gap-x-2">
                  <img
                    src="/icon-check-circle.png"
                    alt="icon-check-circle"
                    className="h-auto w-[18px]"
                  />
                  <p className="text-sm">2 months free!</p>
                </div>
              </div>
              <button
                onClick={() =>
                  props?.hasActiveSubscription
                    ? manageSubscription()
                    : subscribeToPlan('v1-all-professional-year')
                }
                className="button-2 mb-5 flex flex-row items-center gap-x-4"
              >
                <span className="flex-1 text-center">
                  {props?.hasActiveSubscription
                    ? 'Manage subscription'
                    : 'Subscribe now'}
                </span>
                <img
                  src="/icon-angle-right.png"
                  alt="icon-angle-right"
                  className="mt-[4px] h-auto w-[10px]"
                />
              </button>
              <div className="flex flex-col gap-y-4">
                <div className="flex flex-row items-center gap-x-2">
                  <img
                    src="/icon-shield.png"
                    alt="icon-shield"
                    className="h-auto w-[24px]"
                  />
                  <p className="text-xs font-medium text-[#545454]">
                    Risk free: 2 Days Money Back Guarantee
                  </p>
                </div>
                <div className="flex flex-row items-center gap-x-2">
                  <img
                    src="/icon-shield.png"
                    alt="icon-shield"
                    className="h-auto w-[24px]"
                  />
                  <p className="text-xs font-medium text-[#545454]">
                    No commitment
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
