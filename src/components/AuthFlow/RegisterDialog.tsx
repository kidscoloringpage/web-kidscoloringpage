import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from '../Global/Dialog';
import { useStore } from '@nanostores/react';
import {
  hasLoginDialog,
  hasPendingVerificationDialog,
  hasRegisterDialog,
  pendingVerificationEmail,
} from '../../stores/page';
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
import { GoogleButton } from './GoogleButton.tsx';

export function RegisterDialog() {
  const $hasRegisterDialog = useStore(hasRegisterDialog);

  const [showRegisterWithEmail, setShowRegisterWithEmail] = useState(false);

  const { schema } = useYupSchema({
    name: Yup.string().required().label('Full name'),
    email: Yup.string().email().required().label('Email address'),
    password: Yup.string().required().label('Password'),
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupFormResolver(schema) as YupResolverType<{
      name: string;
      email: string;
      password: string;
    }>,
  });

  const onSubmit = useCallback(
    handleSubmit(async ({ name, email, password }) => {
      const { response, error } = await httpPost<{ status: 'ok' }>(
        `${import.meta.env.PUBLIC_API_URL}/v1-register`,
        {
          name,
          email,
          password,
        },
      );

      if (error || response?.status !== 'ok') {
        toast.error(
          error?.message || 'Something went wrong. Please try again later',
        );
        return;
      }

      resetForm();
      pendingVerificationEmail.set(email);
      hasRegisterDialog.set(false);
      hasPendingVerificationDialog.set(true);
    }),
    [],
  );

  const resetForm = () => {
    reset({ name: '', email: '', password: '' });
  };

  return (
    <Dialog
      open={$hasRegisterDialog}
      onOpenChange={(state) => {
        if (!state) resetForm();
        hasRegisterDialog.set(state);
        setShowRegisterWithEmail(false);
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
              <span className="text-[#6A7DF6]">Create</span> an account
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
            You're one step away to create sheet for your kids
          </DialogDescription>
          <div className="mt-8 flex flex-col items-start">
            <form className="mb-5 flex w-full flex-col" onSubmit={onSubmit}>
              <div className="mb-3.5 flex flex-col gap-y-1">
                <input
                  type="text"
                  placeholder="Full name"
                  {...register('name')}
                  className={`border px-8 py-4 text-black placeholder-[#999999] outline-none ${errors?.email?.message ? 'border-red-700' : 'border-[#999999]'} rounded-full focus:border-[#000000] focus:text-black focus:placeholder-black`}
                />
                {errors?.name?.message && (
                  <p className="text-xs text-red-700">
                    {errors?.name?.message.toString()}
                  </p>
                )}
              </div>
              <div className="mb-3.5 flex flex-col gap-y-1">
                <input
                  type="email"
                  placeholder="Email address"
                  {...register('email')}
                  className={`border px-8 py-4 text-black placeholder-[#999999] outline-none ${errors?.email?.message ? 'border-red-700' : 'border-[#999999]'} rounded-full focus:border-[#000000] focus:text-black focus:placeholder-black`}
                />
                {errors?.email?.message && (
                  <p className="text-xs text-red-700">
                    {errors?.email?.message.toString()}
                  </p>
                )}
              </div>

              <div className="mb-5 flex flex-col gap-y-1">
                <input
                  type="password"
                  placeholder="Password"
                  {...register('password')}
                  className={`border px-8 py-4 text-black placeholder-[#999999] outline-none ${errors?.password?.message ? 'border-red-700' : 'border-[#999999]'} rounded-full focus:border-[#000000] focus:text-black focus:placeholder-black`}
                />
                {errors?.password?.message && (
                  <p className="text-xs text-red-700">
                    {errors?.password?.message.toString()}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="button-3 group flex w-full flex-row items-center gap-x-2"
              >
                <span className="flex-1 text-center text-xl text-white">
                  Register now
                </span>
                <img
                  src="/icon-angle-right-white.png"
                  alt="icon-angle-right"
                  className="mt-[4px] h-auto w-[10px]"
                />
              </button>
            </form>
            <div className="flex w-full items-center gap-2 pb-5 pt-1 text-sm text-slate-600">
              <div className="h-px w-full bg-slate-200"></div>
              OR
              <div className="h-px w-full bg-slate-200"></div>
            </div>
            <GoogleButton />
          </div>
        </div>
        <DialogFooter className="flex-col rounded-t-3xl bg-[#FFF2DF] py-8">
          <div className="px-8">
            <p className="mb-4 font-sansita text-2xl font-bold">
              Already have an account?
            </p>
            <button
              onClick={() => {
                resetForm();
                hasLoginDialog.set(true);
                hasRegisterDialog.set(false);
              }}
              className="button group flex w-full flex-row items-center gap-x-2"
            >
              <span className="flex-1 text-center text-xl group-hover:text-[#F36A3B]">
                Login
              </span>
              <img
                src="/icon-angle-right.png"
                alt="icon-angle-right"
                className="mt-[4px] h-auto w-[10px]"
              />
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
