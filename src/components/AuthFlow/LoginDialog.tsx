import {
    Dialog, DialogClose,
    DialogContent, DialogFooter,
    DialogHeader,
    DialogTitle,
} from '../Global/Dialog';
import { useStore } from '@nanostores/react';
import {hasLoginDialog, hasRecoverPasswordDialog, hasRegisterDialog} from '../../stores/page';
import {type FormEvent, useState} from 'react';
import {redirectAuthSuccess} from '../../lib/auth-redirect';
import {createTokenCookie} from "../../lib/jwt.ts";
import {httpPost} from "../../lib/http.ts";

export function LoginDialog() {
    const $hasLoginDialog = useStore(hasLoginDialog);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

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
            // @todo show verify component
            return;
        }
    };

    return (
        <Dialog open={$hasLoginDialog} onOpenChange={hasLoginDialog.set}>
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
                        <form className="w-full flex flex-col mb-5" onSubmit={handleSubmit}>
                            <input type="email"
                                   placeholder='Email address'
                                   value={email}
                                   onInput={(e) => setEmail(String((e.target as any).value))}
                                   className="text-black placeholder-[#999999] outline-none py-4 px-8 border border-[#999999] rounded-full mb-3.5 focus:border-[#000000] focus:text-black focus:placeholder-black"/>
                            <input type="password"
                                   placeholder='Password'
                                   value={password}
                                   onInput={(e) => setPassword(String((e.target as any).value))}
                                   className="text-black placeholder-[#999999] outline-none py-4 px-8 border border-[#999999] rounded-full mb-5 focus:border-[#000000] focus:text-black focus:placeholder-black"/>

                            <button className="group button flex flex-row items-center gap-x-2">
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