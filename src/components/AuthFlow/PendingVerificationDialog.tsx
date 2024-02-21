import {
    Dialog, DialogClose,
    DialogContent, DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
} from '../Global/Dialog';
import { useStore } from '@nanostores/react';
import {
    hasPendingVerificationDialog,
    hasRecoverPasswordDialog,
    hasRegisterDialog,
    pendingVerificationEmail
} from '../../stores/page';
import {httpPost} from "../../lib/http.ts";
import {useState} from "react";
import {toast} from "sonner";

export function PendingVerificationDialog() {
    const $hasPendingVerificationDialog = useStore(hasPendingVerificationDialog);
    const $pendingVerificationEmail = useStore(pendingVerificationEmail);
    const [isEmailResent, setIsEmailResent] = useState(false);

    const resendVerificationEmail = () => {
        httpPost(`${import.meta.env.PUBLIC_API_URL}/v1-send-verification-email`, {
            email: $pendingVerificationEmail,
        })
            .then(({ response, error }) => {
                if (error) {
                    setIsEmailResent(false);
                    toast.error(error?.message || 'Something went wrong.');
                    return;
                }

                setIsEmailResent(true);
            })
            .catch(() => {
                setIsEmailResent(false);
                toast.error('Something went wrong. Please try again later.');
            });
    };

    return (
        <Dialog open={$hasPendingVerificationDialog} onOpenChange={(state) => {
            setIsEmailResent(false);
            hasPendingVerificationDialog.set(state);
        }}>
            <DialogContent
                allowClose={false}
                className="sm:max-w-[490px] overflow-hidden"
                onOpenAutoFocus={(e) => e.preventDefault()}
            >
                <div className="p-8">
                    <DialogHeader className="text-center flex flex-row justify-between">
                        <DialogTitle className="font-sansita font-bold text-4xl">Verify your email address</DialogTitle>
                        <DialogClose>
                            <img src="/icon-close-black.png" alt="icon-close" className="w-[24px] h-[24px]"/>
                        </DialogClose>
                    </DialogHeader>
                    <DialogDescription className="mt-4">
                        We have sent you an email at <span className="font-bold">{$pendingVerificationEmail}</span>. Please click the link to verify your account. This link will expire shortly, so please verify soon!
                    </DialogDescription>
                    {!isEmailResent && <div>
                        <div className="border border-[#414141] my-6 opacity-20"/>
                        <p className="text-[#545454] font-light text-lg">
                            Please make sure to check your spam folder. If you still don't have the email click to <span
                            onClick={resendVerificationEmail} className="inline text-blue-700 cursor-pointer">resend verification email.</span>
                        </p>
                    </div>}
                </div>
            </DialogContent>
        </Dialog>
    );
}