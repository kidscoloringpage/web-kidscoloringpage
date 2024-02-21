import {
    Dialog, DialogClose,
    DialogContent, DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
} from '../Global/Dialog';
import { useStore } from '@nanostores/react';
import {
    hasLoginDialog, hasPendingVerificationDialog,
    hasRegisterDialog, pendingVerificationEmail,
} from '../../stores/page';
import {useYupSchema, Yup, yupFormResolver, type YupResolverType} from "../../lib/yup.ts";
import {useForm} from "react-hook-form";
import {useCallback} from "react";
import {httpPost} from "../../lib/http.ts";
import {toast} from "sonner";

export function RegisterDialog() {
    const $hasRegisterDialog = useStore(hasRegisterDialog);

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
            name: string,
            email: string,
            password: string,
        }>,
    });

    const onSubmit = useCallback(
        handleSubmit(async ({name, email, password}) => {
            const { response, error } = await httpPost<{ status: 'ok' }>(
                `${import.meta.env.PUBLIC_API_URL}/v1-register`,
                {
                    name,
                    email,
                    password,
                },
            );

            if (error || response?.status !== 'ok') {
                toast.error(error?.message || 'Something went wrong. Please try again later');
                return;
            }

            resetForm();
            pendingVerificationEmail.set(email);
            hasRegisterDialog.set(false);
            hasPendingVerificationDialog.set(true);
        }),
        []
    );

    const resetForm = () => {
        reset({ name: '', email: '', password: ''});
    };

    return (
        <Dialog open={$hasRegisterDialog} onOpenChange={(state) => {
            if (!state) resetForm();
            hasRegisterDialog.set(state);
        }}>
            <DialogContent
                allowClose={false}
                className="sm:max-w-[490px] overflow-hidden"
                onOpenAutoFocus={(e) => e.preventDefault()}
            >
                <div className="p-8">
                    <DialogHeader className="text-center flex flex-row justify-between">
                        <DialogTitle className="font-sansita font-bold text-4xl"><span className="text-[#6A7DF6]">Create</span> an account</DialogTitle>
                        <DialogClose>
                            <img src="/icon-close-black.png" alt="icon-close" className="w-[24px] h-[24px]"/>
                        </DialogClose>
                    </DialogHeader>
                    <DialogDescription className="mt-4">You're one step away to create sheet for your kids</DialogDescription>
                    <div className='flex flex-col items-start mt-8'>
                        <form className="w-full flex flex-col mb-5" onSubmit={onSubmit}>
                            <div className="mb-3.5 flex flex-col gap-y-1">
                                <input type="text"
                                       placeholder='Full name'
                                       {...register('name')}
                                       className={`text-black placeholder-[#999999] outline-none py-4 px-8 border ${errors?.email?.message ? 'border-red-700' : 'border-[#999999]'} rounded-full focus:border-[#000000] focus:text-black focus:placeholder-black`}/>
                                {errors?.name?.message && (
                                    <p className="text-xs text-red-700">
                                        {errors?.name?.message.toString()}
                                    </p>
                                )}
                            </div>
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

                            <button
                                type="submit"
                                className="group button-3 flex flex-row items-center gap-x-2 w-full">
                            <span
                                className="flex-1 text-center text-white text-xl">Register now</span>
                                <img src="/icon-angle-right-white.png" alt="icon-angle-right"
                                     className="w-[10px] h-auto mt-[4px]"/>
                            </button>
                        </form>
                    </div>
                </div>
                <DialogFooter className="py-8 bg-[#FFF2DF] rounded-t-3xl flex-col">
                    <div className="px-8">
                        <p className="font-sansita font-bold text-2xl mb-4">Already have an account?</p>
                        <button
                            onClick={() => {
                                resetForm();
                                hasLoginDialog.set(true);
                                hasRegisterDialog.set(false);
                            }}
                            className="group button flex flex-row items-center gap-x-2 w-full">
                            <span className="flex-1 text-center group-hover:text-[#F36A3B] text-xl">Login</span>
                            <img src="/icon-angle-right.png" alt="icon-angle-right"
                                 className="w-[10px] h-auto mt-[4px]"/>
                        </button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}