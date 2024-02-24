import { atom } from 'nanostores';

export const hasRecoverPasswordDialog = atom<boolean>(false);
export const hasRegisterDialog = atom<boolean>(false);
export const hasLoginDialog = atom<boolean>(false);
export const hasPendingVerificationDialog = atom<boolean>(false);
export const pendingVerificationEmail = atom<string>('');
export const pageProgressMessage = atom<string | undefined>(undefined);
export const newColorImageGenerated = atom<boolean>(false);