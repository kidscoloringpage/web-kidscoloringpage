import { useState } from 'react';
import { httpGet } from '../../lib/http.ts';
import { toast } from 'sonner';

export function GoogleButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    httpGet<{ loginUrl: string }>(
      `${import.meta.env.PUBLIC_API_URL}/v1-google-login`,
    )
      .then(({ response, error }) => {
        if (!response?.loginUrl) {
          toast.error(error?.message || 'Something went wrong.');
          setIsLoading(false);

          return;
        }

        window.location.href = response.loginUrl;
      })
      .catch(() => {
        toast.error('Something went wrong. Please try again later.');
        setIsLoading(false);
      });
  };

  return (
    <button
      disabled={isLoading}
      onClick={handleClick}
      className="button group flex w-full flex-row items-center justify-between gap-x-2 disabled:opacity-30"
    >
      <img
        src="/icon-google.png"
        alt="google"
        className="mt-[4px] h-auto w-[20px]"
      />
      <span className="text-xl group-hover:text-[#F36A3B]">
        {isLoading ? 'Please wait...' : 'Continue with Google'}
      </span>
      <img
        src="/icon-angle-right.png"
        alt="icon-angle-right"
        className="mt-[4px] h-auto w-[10px]"
      />
    </button>
  );
}
