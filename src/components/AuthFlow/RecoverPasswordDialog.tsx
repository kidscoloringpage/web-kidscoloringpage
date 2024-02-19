import {
    Dialog, DialogClose,
    DialogContent, DialogFooter,
    DialogHeader,
    DialogTitle,
} from '../Global/Dialog';
import { useStore } from '@nanostores/react';
import {hasRecoverPasswordDialog, hasRegisterDialog} from '../../stores/page';

export function RecoverPasswordDialog() {
    const $hasRecoverPasswordDialog = useStore(hasRecoverPasswordDialog);

    return (
        <Dialog open={$hasRecoverPasswordDialog} onOpenChange={hasRecoverPasswordDialog.set}>
            <DialogContent
                allowClose={false}
                className="sm:max-w-[490px] overflow-hidden"
                onOpenAutoFocus={(e) => e.preventDefault()}
            >
                <div className="p-8">
                    <DialogHeader className="text-center flex flex-row justify-between">
                        <DialogTitle className="font-sansita font-bold text-4xl">Recover Password</DialogTitle>
                        <DialogClose>
                            <img src="/icon-close-black.png" alt="icon-close" className="w-[24px] h-[24px]"/>
                        </DialogClose>
                    </DialogHeader>
                    <div className='flex flex-col items-start pt-8'>
                        <div className="w-full flex flex-col mb-5">
                            <input type="email" placeholder='Email address'
                                   className="text-[#999999] outline-none py-4 px-8 border border-[#999999] rounded-full mb-3.5"/>

                            <button className="group button flex flex-row items-center gap-x-2">
                                <span className="flex-1 text-center group-hover:text-[#F36A3B] text-xl">Continue</span>
                                <img src="/icon-angle-right.png" alt="icon-angle-right"
                                     className="w-[10px] h-auto mt-[4px]"/>
                            </button>
                        </div>
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
                                hasRecoverPasswordDialog.set(false);
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