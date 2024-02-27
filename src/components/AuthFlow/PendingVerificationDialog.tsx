import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../Global/Dialog';
import { useStore } from '@nanostores/react';
import {
  hasPendingVerificationDialog,
  pendingVerificationEmail,
} from '../../stores/page';
import { httpPost } from '../../lib/http.ts';
import { useState } from 'react';
import { toast } from 'sonner';

export function PendingVerificationDialog() {
  const $hasPendingVerificationDialog = useStore(hasPendingVerificationDialog);
  const $pendingVerificationEmail = useStore(pendingVerificationEmail);
  const [isEmailResent, setIsEmailResent] = useState(false);

  const resendVerificationEmail = () => {
    httpPost(`${import.meta.env.PUBLIC_API_URL}/v1-send-verification-email`, {
      email: $pendingVerificationEmail,
    })
      .then(({ error }) => {
        if (error) {
          setIsEmailResent(false);
          toast.error(error?.message || 'Something went wrong');
          return;
        }

        setIsEmailResent(true);
      })
      .catch(() => {
        setIsEmailResent(false);
        toast.error('Something went wrong. Please try again later');
      });
  };

  return (
    <Dialog
      open={$hasPendingVerificationDialog}
      onOpenChange={(state) => {
        setIsEmailResent(false);
        hasPendingVerificationDialog.set(state);
      }}
    >
      <DialogContent
        allowClose={false}
        className="h-full overflow-y-scroll sm:max-w-[490px] md:h-auto md:overflow-x-auto md:overflow-y-auto"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="p-8">
          <DialogHeader className="flex flex-row justify-between text-center">
            <DialogTitle className="font-sansita text-4xl font-bold">
              Verify your email address
            </DialogTitle>
            <DialogClose>
              <img
                src="/icon-close-black.png"
                alt="icon-close"
                className="h-[24px] w-[24px]"
              />
            </DialogClose>
          </DialogHeader>
          <DialogDescription className="mt-4">
            We have sent you an email at{' '}
            <span className="font-bold">{$pendingVerificationEmail}</span>.
            Please click the link to verify your account. This link will expire
            shortly, so please verify soon!
          </DialogDescription>
          {!isEmailResent && (
            <div>
              <div className="my-6 border border-[#414141] opacity-20" />
              <p className="text-lg font-light text-[#545454]">
                Please make sure to check your spam folder. If you still don't
                have the email click to{' '}
                <span
                  onClick={resendVerificationEmail}
                  className="inline cursor-pointer text-blue-700"
                >
                  resend verification email.
                </span>
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
