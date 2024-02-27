import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../Global/Dialog';
import { useStore } from '@nanostores/react';
import { hasRecoverPasswordDialog, hasRegisterDialog } from '../../stores/page';
import {
  useYupSchema,
  Yup,
  yupFormResolver,
  type YupResolverType,
} from '../../lib/yup.ts';
import { useForm } from 'react-hook-form';
import { useCallback } from 'react';
import { httpPost } from '../../lib/http.ts';
import { toast } from 'sonner';

export function RecoverPasswordDialog() {
  const $hasRecoverPasswordDialog = useStore(hasRecoverPasswordDialog);

  const { schema } = useYupSchema({
    email: Yup.string().email().required().label('Email address'),
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupFormResolver(schema) as YupResolverType<{
      email: string;
    }>,
  });

  const onSubmit = useCallback(
    handleSubmit(async ({ email }) => {
      const { error } = await httpPost(
        `${import.meta.env.PUBLIC_API_URL}/v1-forgot-password`,
        {
          email,
        },
      );

      if (error) {
        toast.error(error.message);
      } else {
        resetForm();
        toast.success('Check your email for a link to reset your password');
      }
    }),
    [],
  );

  const resetForm = () => reset({ email: '' });

  return (
    <Dialog
      open={$hasRecoverPasswordDialog}
      onOpenChange={hasRecoverPasswordDialog.set}
    >
      <DialogContent
        allowClose={false}
        className="h-full overflow-y-scroll sm:max-w-[490px] md:h-auto md:overflow-x-auto md:overflow-y-auto"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="p-8">
          <DialogHeader className="flex flex-row justify-between text-center">
            <DialogTitle className="font-sansita text-4xl font-bold">
              Recover Password
            </DialogTitle>
            <DialogClose>
              <img
                src="/icon-close-black.png"
                alt="icon-close"
                className="h-[24px] w-[24px]"
              />
            </DialogClose>
          </DialogHeader>
          <div className="flex flex-col items-start pt-8">
            <form className="mb-5 flex w-full flex-col" onSubmit={onSubmit}>
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

              <button
                type="submit"
                className="button group flex flex-row items-center gap-x-2"
              >
                <span className="flex-1 text-center text-xl group-hover:text-[#F36A3B]">
                  Continue
                </span>
                <img
                  src="/icon-angle-right.png"
                  alt="icon-angle-right"
                  className="mt-[4px] h-auto w-[10px]"
                />
              </button>
            </form>
          </div>
        </div>
        <DialogFooter className="flex-col rounded-t-3xl bg-[#FFF2DF] py-8">
          <div className="mb-4 flex w-full flex-row items-center justify-between px-8">
            <div className="flex flex-col gap-y-2">
              <p className="font-sansita text-2xl font-bold">
                Don't have an account?
              </p>
              <p className="text-lg font-light text-[#545454]">
                It won't take 30 seconds!
              </p>
            </div>
            <img
              src="/icon-magic-wand.png"
              alt="icon-magic-wand"
              className="h-auto w-[52px]"
            />
          </div>
          <div className="px-8">
            <button
              onClick={() => {
                resetForm();
                hasRegisterDialog.set(true);
                hasRecoverPasswordDialog.set(false);
              }}
              className="button-3 group flex w-full flex-row items-center gap-x-2"
            >
              <span className="flex-1 text-center text-xl text-white">
                Create an account
              </span>
              <img
                src="/icon-angle-right-white.png"
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
