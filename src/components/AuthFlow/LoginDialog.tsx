import {
    Dialog, DialogClose,
    DialogContent, DialogFooter,
    DialogHeader,
    DialogTitle,
} from '../Global/Dialog';
import { useStore } from '@nanostores/react';
import {
    hasLoginDialog,
    hasPendingVerificationDialog,
    hasRecoverPasswordDialog,
    hasRegisterDialog,
    pendingVerificationEmail
} from '../../stores/page';
import {useCallback} from 'react';
import {redirectAuthSuccess} from '../../lib/auth-redirect';
import {createTokenCookie} from "../../lib/jwt.ts";
import {httpPost} from "../../lib/http.ts";
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import {useYupSchema, Yup, yupFormResolver, type YupResolverType} from "../../lib/yup.ts";

export function LoginDialog() {
    const $hasLoginDialog = useStore(hasLoginDialog);

    const { schema } = useYupSchema({
        email: Yup.string().email().required().label('Email address'),
        password: Yup.string().required().label('Password'),
    });

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors, isDirty, isValid },
    } = useForm({
        resolver: yupFormResolver(schema) as YupResolverType<{
            email: string,
            password: string,
        }>,
    });

    const onSubmit = useCallback(
        handleSubmit(async ({email, password}) => {

                const { response, error } = await httpPost<{ token: string }>(
                    `${import.meta.env.PUBLIC_API_URL}/v1-login`,
                    {
                        email,
                        password,
                    },
                );

                if (response?.token) {
                    createTokenCookie(response.token);
                    redirectAuthSuccess();

                    return;
                }

                if ((error as any).type === 'user_not_verified') {
                    reset({ email: '', password: ''});
                    pendingVerificationEmail.set(email);
                    hasLoginDialog.set(false);
                    hasPendingVerificationDialog.set(true);
                    return;
                }

                toast.error(error?.message || 'Something went wrong. Please try again later.');
        }),
        []
    );

    return (
        <Dialog open={$hasLoginDialog} onOpenChange={(state) => {
            if (!state) reset({ email: '', password: ''});
            hasLoginDialog.set(state);
        }}>
            <DialogContent
                allowClose={false}
                className="sm:max-w-[490px] overflow-hidden"
                onOpenAutoFocus={(e) => e.preventDefault()}
            >
                <div className="p-8">
                    <DialogHeader className="text-center flex flex-row justify-between">
                        <DialogTitle className="font-sansita font-bold text-4xl">Login</DialogTitle>
                        <DialogClose>
                            <img src="/icon-close-black.png" alt="icon-close" className="w-[24px] h-[24px]"/>
                        </DialogClose>
                    </DialogHeader>
                    <div className='flex flex-col items-start pt-8'>
                        <form className="w-full flex flex-col mb-5" onSubmit={onSubmit}>
                            <div className="mb-3.5 flex flex-col gap-y-1">
                                <input type="email"
                                       placeholder='Email address'
                                       {...register('email')}
                                       className={`text-black placeholder-[#999999] outline-none py-4 px-8 border ${errors?.email?.message ? 'border-red-700' : 'border-[#999999]'} rounded-full focus:border-[#000000] focus:text-black focus:placeholder-black`}/>
                                {errors?.email?.message && (
                                    <p className="text-xs text-red-700">
                                        {errors?.email?.message.toString()}
                                    </p>
                                )}
                            </div>

                            <div className="mb-5 flex flex-col gap-y-1">
                                <input type="password"
                                       placeholder='Password'
                                       {...register('password')}
                                       className={`text-black placeholder-[#999999] outline-none py-4 px-8 border ${errors?.password?.message ? 'border-red-700' : 'border-[#999999]'} rounded-full focus:border-[#000000] focus:text-black focus:placeholder-black`}/>
                                {errors?.password?.message && (
                                    <p className="text-xs text-red-700">
                                        {errors?.password?.message.toString()}
                                    </p>
                                )}
                            </div>

                            <button type="submit" className="group button flex flex-row items-center gap-x-2">
                                <span className="flex-1 text-center group-hover:text-[#F36A3B] text-xl">Login</span>
                                <img src="/icon-angle-right.png" alt="icon-angle-right"
                                     className="w-[10px] h-auto mt-[4px]"/>
                            </button>
                        </form>
                        <button
                            onClick={() => {
                                hasLoginDialog.set(false);
                                hasRegisterDialog.set(false);
                                hasRecoverPasswordDialog.set(true);
                            }}
                            className="text-[#545454] font-light underline text-sm">Recover password</button>
                    </div>
                </div>
                <DialogFooter className="py-8 bg-[#FFF2DF] rounded-t-3xl flex-col">
                    <div className="flex flex-row justify-between items-center w-full px-8 mb-4">
                        <div className="flex flex-col gap-y-2">
                            <p className="font-sansita font-bold text-2xl">Don't have an account?</p>
                            <p className="font-light text-[#545454] text-lg">It won't take 30 seconds!</p>
                        </div>
                        <img src="/icon-magic-wand.png" alt="icon-magic-wand" className="w-[52px] h-auto"/>
                    </div>
                    <div className="px-8">
                        <button
                            onClick={() => {
                                hasRegisterDialog.set(true);
                                hasLoginDialog.set(false);
                            }}
                            className="group button-3 flex flex-row items-center gap-x-2 w-full">
                            <span
                                className="flex-1 text-center text-white text-xl">Create an account</span>
                            <img src="/icon-angle-right-white.png" alt="icon-angle-right"
                                 className="w-[10px] h-auto mt-[4px]"/>
                        </button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}