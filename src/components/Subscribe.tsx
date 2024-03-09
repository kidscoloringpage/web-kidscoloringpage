import { useState } from 'react';
import { toast } from 'sonner';
import { httpPost } from '../lib/http.ts';

export function Subscribe() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const subscribe = async () => {
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    const { response, error } = await httpPost(
      `${import.meta.env.PUBLIC_API_URL}/v1-create-newsletter-subscription`,
      {
        email,
      },
    );

    if (error || !response) {
      setIsLoading(false);
      toast.error(error?.message || 'Something went wrong');

      return;
    }

    setEmail('');
    setIsLoading(false);
    toast.info('Subscribed successfully');
  };

  return (
    <div className="flex-col-responsive flex flex-col justify-between gap-x-14 gap-y-5 md:flex-row md:gap-y-6">
      <div className="flex-1 font-sansita text-2xl text-white md:text-3xl">
        <p className="mb-1">Want product news and updates? </p>
        <p className="">Sign up for our newsletter.</p>
      </div>
      <div className="flex flex-1 flex-col justify-between gap-y-3">
        <div className="flex flex-row gap-x-2.5">
          <label className="flex-1 mix-blend-soft-light">
            <input
              type="email"
              value={email}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !isLoading && email) {
                  subscribe();
                }
              }}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full gap-x-2 rounded-lg bg-[#EBEBEB] px-4 py-3 font-light text-black placeholder-black/50 outline-none md:min-w-[380px]"
            />
          </label>
          <button
            onClick={subscribe}
            disabled={isLoading || !email}
            className="w-fit rounded-lg bg-white px-6 py-2 font-medium text-black md:px-11"
          >
            {isLoading ? 'Please wait...' : 'Subscribe'}
          </button>
        </div>
        <p className="text-xs text-[#757575]">
          We hate spam as much as you do. You can unsubscribe at any time.
        </p>
      </div>
    </div>
  );
}
