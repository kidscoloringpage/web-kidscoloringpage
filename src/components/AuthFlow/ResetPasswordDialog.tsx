import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../Global/Dialog';
import { useStore } from '@nanostores/react';
import { hasResetPasswordDialog } from '../../stores/page';
import {
  useYupSchema,
  Yup,
  yupFormResolver,
  type YupResolverType,
} from '../../lib/yup.ts';
import { useForm } from 'react-hook-form';
import { useCallback, useState } from 'react';
import { httpPost } from '../../lib/http.ts';
import { toast } from 'sonner';
import { getUrlParams } from '../../lib/browser.ts';
import { createTokenCookie } from '../../lib/jwt.ts';
import { redirectAuthSuccess } from '../../lib/auth-redirect.ts';

export function ResetPasswordDialog() {
  const [isLoading, setIsLoading] = useState(false);
  const $hasResetPasswordDialog = useStore(hasResetPasswordDialog);

  const { schema } = useYupSchema({
    password: Yup.string()
      .required()
      .min(6, 'Password must be at least 6 characters')
      .label('Password'),
    confirmPassword: Yup.string()
      .required()
      .label('Confirm password')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupFormResolver(schema) as YupResolverType<{
      password: string;
      confirmPassword: string;
    }>,
  });

  const onSubmit = useCallback(
    handleSubmit(async ({ password, confirmPassword }) => {
      setIsLoading(true);
      const { response, error } = await httpPost<{ token: string }>(
        `${import.meta.env.PUBLIC_API_URL}/v1-reset-forgotten-password`,
        {
          newPassword: password,
          confirmPassword,
          code: getUrlParams()['reset-password-code'],
        },
      );

      if (error?.message) {
        setIsLoading(false);
        toast.error(
          error?.message || 'Something went wrong. Please try again later',
        );
        return;
      }

      if (!response?.token) {
        setIsLoading(false);
        toast.error('Something went wrong. Please try again later');
        return;
      }

      resetForm();
      createTokenCookie(response.token);
      hasResetPasswordDialog.set(false);
      redirectAuthSuccess();
    }),
    [],
  );

  const resetForm = () => {
    reset({ confirmPassword: '', password: '' });
  };

  return (
    <Dialog
      open={$hasResetPasswordDialog}
      onOpenChange={(state) => {
        if (!state) resetForm();
        hasResetPasswordDialog.set(state);
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
              Reset password
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
            Enter and confirm your new password below.
          </DialogDescription>
          <div className="mt-8 flex flex-col items-start">
            <form className="mb-5 flex w-full flex-col" onSubmit={onSubmit}>
              <div className="mb-3.5 flex flex-col gap-y-1">
                <input
                  type="password"
                  placeholder="New Password"
                  {...register('password')}
                  className={`border px-8 py-4 text-black placeholder-[#999999] outline-none ${errors?.password?.message ? 'border-red-700' : 'border-[#999999]'} rounded-full focus:border-[#000000] focus:text-black focus:placeholder-black`}
                />
                {errors?.password?.message && (
                  <p className="text-xs text-red-700">
                    {errors?.password?.message.toString()}
                  </p>
                )}
              </div>
              <div className="mb-3.5 flex flex-col gap-y-1">
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  {...register('confirmPassword')}
                  className={`border px-8 py-4 text-black placeholder-[#999999] outline-none ${errors?.confirmPassword?.message ? 'border-red-700' : 'border-[#999999]'} rounded-full focus:border-[#000000] focus:text-black focus:placeholder-black`}
                />
                {errors?.confirmPassword?.message && (
                  <p className="text-xs text-red-700">
                    {errors?.confirmPassword?.message.toString()}
                  </p>
                )}
              </div>

              <button
                disabled={isLoading}
                type="submit"
                className="button-3 group flex w-full flex-row items-center gap-x-2 disabled:opacity-30"
              >
                <span className="flex-1 text-center text-xl text-white">
                  {isLoading ? 'Please wait...' : 'Reset Password'}
                </span>
                <img
                  src="/icon-angle-right-white.png"
                  alt="icon-angle-right"
                  className="mt-[4px] h-auto w-[10px]"
                />
              </button>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
