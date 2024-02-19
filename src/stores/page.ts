import { atom } from 'nanostores';

export const hasRecoverPasswordDialog = atom<boolean>(false);
export const hasRegisterDialog = atom<boolean>(false);
export const hasLoginDialog = atom<boolean>(false);