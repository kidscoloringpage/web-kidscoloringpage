import { toast } from 'sonner';
import { getUrlParams } from '../../lib/browser.ts';
import {
  hasResetPasswordDialog,
  pageProgressMessage,
} from '../../stores/page.ts';
import { httpGet } from '../../lib/http.ts';
import { createTokenCookie } from '../../lib/jwt.ts';
import { redirectAuthSuccess } from '../../lib/auth-redirect.ts';

export const Footer = (props: { paymentSessionId: string }) => {
  const urlParams = getUrlParams();

  if (
    props.paymentSessionId &&
    !window.sessionStorage.getItem('paymentSessionId')
  ) {
    toast.success('Payment successful', {
      duration: 6000,
    });
    window.sessionStorage.setItem('paymentSessionId', props.paymentSessionId);
  }

  if (urlParams['reset-password-code']) {
    hasResetPasswordDialog.set(true);
  }

  // after social redirect from google, get the token and redirect to the dashboard
  const code = urlParams?.code;
  const state = urlParams?.state;
  const provider = urlParams?.provider;
  if (code && state && provider === 'google') {
    pageProgressMessage.set('Logging in, please wait...');
    httpGet<{ token: string }>(
      `${import.meta.env.PUBLIC_API_URL}/v1-google-callback${
        window.location.search
      }`,
    )
      .then(({ response, error }) => {
        if (!response?.token) {
          toast.error(error?.message || 'Something went wrong.');
          pageProgressMessage.set('');

          return;
        }

        createTokenCookie(response.token);
        redirectAuthSuccess();
      })
      .catch(() => {
        toast.error('Something went wrong. Please try again later.');
        pageProgressMessage.set('');
      });
  }

  return (
    <div className="bg-gradient-to-b from-[#000D60] from-0% via-[#612F84] to-[#944196] pb-14 pt-14 md:bg-gradient-to-r md:pt-20">
      <div className="px-responsive container px-4 md:px-0">
        <div className="flex-col-responsive flex flex-col justify-between gap-x-14 gap-y-5 md:flex-row md:gap-y-6">
          <div className="flex-1 font-sansita text-2xl text-white md:text-3xl">
            <p className="mb-1">Want product news and updates? </p>
            <p className="">Sign up for our newsletter.</p>
          </div>
          <div className="flex flex-1 flex-col justify-between gap-y-3">
            <div className="flex flex-row gap-x-2.5">
              <label className="flex-1 mix-blend-soft-light">
                <input
                  type="text"
                  placeholder="Enter your email address"
                  className="w-full gap-x-2 rounded-lg bg-[#EBEBEB] px-4 py-3 font-light text-black placeholder-black/50 outline-none md:min-w-[380px]"
                />
              </label>
              <button className="w-fit rounded-lg bg-white px-6 py-2 font-medium text-black md:px-11">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-[#757575]">
              We hate spam as much as you do. You can unsubscribe at any time.
            </p>
          </div>
        </div>
        <div className="my-6 border border-[#414141] opacity-30 md:my-10" />
        <div className="flex flex-col justify-between gap-x-14 gap-y-5 md:flex-row md:gap-y-0">
          <div className="flex flex-1 flex-col gap-y-5">
            <p className="font-wonderbar text-2xl md:text-3xl">
              <span className="text-[#6A7DF6]">KIDS</span>
              <span className="text-[#347C44]">COLORING</span>
              <span className="text-[#EF60B7]">PAGE</span>
            </p>
            <p className="text-[#C2C2C2]">
              Introducing our creative platform generating kid-friendly coloring
              sheets. Designed to spark creativity, our tool offers themed
              designs for endless fun. Easily customizable for educational
              needs, these sheets are both entertaining and educational. Your
              kids can color these pages to their heart's content!
            </p>
          </div>
          <div className="flex flex-1 flex-row flex-wrap justify-between gap-y-5 md:flex-nowrap md:gap-y-0">
            <div>
              <p className="mb-4 text-lg font-semibold text-white">
                Kids Coloring
              </p>
              <div className="flex flex-col gap-y-1.5 text-[#C2C2C2]">
                <a href="/color-pages" className="hover:underline">
                  Free Coloring Pages
                </a>
                <a href="/#wall-of-love" className="hover:underline">
                  Wall of Love
                </a>
                <a href="/#pricing" className="hover:underline">
                  Pricing
                </a>
                <a href="#" className="hover:underline">
                  Blog
                </a>
              </div>
            </div>
            <div>
              <p className="mb-4 text-lg font-semibold text-white">Company</p>
              <div className="flex flex-col gap-y-1.5 text-[#C2C2C2]">
                <a href="/#faqs" className="hover:underline">
                  FAQs
                </a>
                <a
                  href="mailto:hello@kidscoloringpage.com"
                  className="hover:underline"
                >
                  Contact us
                </a>
              </div>
            </div>
            <div>
              <p className="mb-4 text-lg font-semibold text-white">Follow us</p>
              <div className="flex flex-col gap-y-1.5 text-[#C2C2C2]">
                <a
                  href="https://www.facebook.com/people/Kidscoloringpage/61556780791691/"
                  target="_blank"
                  className="hover:underline"
                >
                  Facebook
                </a>
                <a
                  href="https://www.instagram.com/kidscoloringpage1/"
                  target="_blank"
                  className="hover:underline"
                >
                  Instagram
                </a>
                <a
                  href="https://twitter.com/kidsclrngpage"
                  target="_blank"
                  className="hover:underline"
                >
                  Twitter
                </a>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-4 text-sm text-[#C2C2C2] opacity-20 md:mt-1">
          All rights reserved by kidscoloringpage.com
        </p>
      </div>
    </div>
  );
};
