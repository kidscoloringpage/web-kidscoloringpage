import { createTokenCookie } from '../../lib/jwt.ts';
import { redirectAuthSuccess } from '../../lib/auth-redirect.ts';
import { httpPost } from '../../lib/http.ts';
import { useEffect, useState } from 'react';
import { LoadingMessage } from '../Loaders/LoadingMessage.tsx';

export function TriggerVerifyAccount() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const triggerVerify = (code: string) => {
    setIsLoading(true);

    httpPost<{ token: string }>(
      `${import.meta.env.PUBLIC_API_URL}/v1-verify-account`,
      {
        code,
      },
    )
      .then(({ response, error }) => {
        if (!response?.token) {
          setError(error?.message || 'Something went wrong. Please try again.');
          setIsLoading(false);

          return;
        }

        createTokenCookie(response.token);
        redirectAuthSuccess();
      })
      .catch(() => {
        setIsLoading(false);
        setError('Something went wrong. Please try again.');
      });
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code')!;

    if (!code) {
      setIsLoading(false);
      setError('Something went wrong. Please try again later.');
      return;
    }

    triggerVerify(code);
  }, []);

  const loadingMessage = isLoading && (
    <LoadingMessage message="Please wait while we verify you..." />
  );

  const errorMessage = error && (
    <div className="flex flex-col items-center justify-center">
      <div className="h-20 w-20 text-red-700 md:h-40 md:w-40">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-alert-triangle"
        >
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
        </svg>
      </div>
      <h2 className="mb-2 font-sansita text-xl font-semibold text-red-700 md:text-4xl">
        Oops!
      </h2>
      <div className="text-base md:text-2xl">
        <p className="text-red-700">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="flex w-full flex-col items-center py-14">
      <div className="text-center">
        {loadingMessage}
        {errorMessage}
      </div>
    </div>
  );
}
