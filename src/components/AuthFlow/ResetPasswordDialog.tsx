import {
    Dialog, DialogClose,
    DialogContent, DialogDescription,
    DialogHeader,
    DialogTitle,
} from '../Global/Dialog';
import { useStore } from '@nanostores/react';
import {
    hasResetPasswordDialog,
} from '../../stores/page';
import {useYupSchema, Yup, yupFormResolver, type YupResolverType} from "../../lib/yup.ts";
import {useForm} from "react-hook-form";
import {useCallback, useState} from "react";
import {httpPost} from "../../lib/http.ts";
import {toast} from "sonner";
import {getUrlParams} from "../../lib/browser.ts";
import {createTokenCookie} from "../../lib/jwt.ts";
import {redirectAuthSuccess} from "../../lib/auth-redirect.ts";

export function ResetPasswordDialog() {
    const [isLoading, setIsLoading] = useState(false);
    const $hasResetPasswordDialog = useStore(hasResetPasswordDialog);

    const { schema } = useYupSchema({
        password: Yup.string().required()
            .min(6, 'Password must be at least 6 characters')
            .label('Password'),
        confirmPassword:
            Yup.string().required().label('Confirm password')
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    });

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupFormResolver(schema) as YupResolverType<{
            password: string,
            confirmPassword: string,
        }>,
    });

    const onSubmit = useCallback(
        handleSubmit(async ({password, confirmPassword}) => {
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
                toast.error(error?.message || 'Something went wrong. Please try again later');
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
        []
    );

    const resetForm = () => {
        reset({ confirmPassword: '', password: ''});
    };

    return (
        <Dialog open={$hasResetPasswordDialog} onOpenChange={(state) => {
            if (!state) resetForm();
            hasResetPasswordDialog.set(state);
        }}>
            <DialogContent
                allowClose={false}
                className="sm:max-w-[490px] overflow-y-scroll md:overflow-hidden sm:max-h-screen"
                onOpenAutoFocus={(e) => e.preventDefault()}
            >
                <div className="p-8">
                    <DialogHeader className="text-center flex flex-row justify-between">
                        <DialogTitle className="font-sansita font-bold text-4xl">Reset password</DialogTitle>
                        <DialogClose>
                            <img src="/icon-close-black.png" alt="icon-close" className="w-[24px] h-[24px]"/>
                        </DialogClose>
                    </DialogHeader>
                    <DialogDescription className="mt-4">Enter and confirm your new password below.</DialogDescription>
                    <div className='flex flex-col items-start mt-8'>
                        <form className="w-full flex flex-col mb-5" onSubmit={onSubmit}>
                            <div className="mb-3.5 flex flex-col gap-y-1">
                                <input type="password"
                                       placeholder='New Password'
                                       {...register('password')}
                                       className={`text-black placeholder-[#999999] outline-none py-4 px-8 border ${errors?.password?.message ? 'border-red-700' : 'border-[#999999]'} rounded-full focus:border-[#000000] focus:text-black focus:placeholder-black`}/>
                                {errors?.password?.message && (
                                    <p className="text-xs text-red-700">
                                        {errors?.password?.message.toString()}
                                    </p>
                                )}
                            </div>
                            <div className="mb-3.5 flex flex-col gap-y-1">
                                <input type="password"
                                       placeholder='Confirm New Password'
                                       {...register('confirmPassword')}
                                       className={`text-black placeholder-[#999999] outline-none py-4 px-8 border ${errors?.confirmPassword?.message ? 'border-red-700' : 'border-[#999999]'} rounded-full focus:border-[#000000] focus:text-black focus:placeholder-black`}/>
                                {errors?.confirmPassword?.message && (
                                    <p className="text-xs text-red-700">
                                        {errors?.confirmPassword?.message.toString()}
                                    </p>
                                )}
                            </div>

                            <button
                                disabled={isLoading}
                                type="submit"
                                className="group button-3 flex flex-row items-center gap-x-2 w-full disabled:opacity-30">
                                <span className="flex-1 text-center text-white text-xl">{isLoading ? 'Please wait...' : 'Reset Password'}</span>
                                <img src="/icon-angle-right-white.png" alt="icon-angle-right"
                                     className="w-[10px] h-auto mt-[4px]"/>
                            </button>
                        </form>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}