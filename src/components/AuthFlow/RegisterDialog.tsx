import {
    Dialog, DialogClose,
    DialogContent, DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
} from '../Global/Dialog';
import { useStore } from '@nanostores/react';
import {hasLoginDialog, hasRegisterDialog} from '../../stores/page';

export function RegisterDialog() {
    const $hasRegisterDialog = useStore(hasRegisterDialog);

    return (
        <Dialog open={$hasRegisterDialog} onOpenChange={hasRegisterDialog.set}>
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
                        <div className="w-full flex flex-col mb-5">
                            <input type="email" placeholder='Email address'
                                   className="text-[#999999] placeholder-[#999999] outline-none py-4 px-8 border border-[#999999] rounded-full mb-3.5 focus:border-[#000000] focus:text-black focus:placeholder-black"/>
                            <input type="password" placeholder='Password'
                                   className="text-[#999999] placeholder-[#999999] outline-none py-4 px-8 border border-[#999999] rounded-full mb-3.5 focus:border-[#000000] focus:text-black focus:placeholder-black"/>

                            <button
                                onClick={() => {
                                    hasRegisterDialog.set(true);
                                    hasLoginDialog.set(false);
                                }}
                                className="group button-3 flex flex-row items-center gap-x-2 w-full">
                            <span
                                className="flex-1 text-center text-white text-xl">Register now</span>
                                <img src="/icon-angle-right-white.png" alt="icon-angle-right"
                                     className="w-[10px] h-auto mt-[4px]"/>
                            </button>
                        </div>
                    </div>
                </div>
                <DialogFooter className="py-8 bg-[#FFF2DF] rounded-t-3xl flex-col">
                    <div className="px-8">
                        <p className="font-sansita font-bold text-2xl mb-4">Already have an account?</p>
                        <button
                            onClick={() => {
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