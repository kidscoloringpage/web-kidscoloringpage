/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
    readonly PUBLIC_API_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

declare namespace App {
    interface Locals {
        currentUser: import('./api/user.ts').UserDocument | undefined;
        planId: string | undefined;
        hasActiveSubscription: boolean | undefined;
        currentUserId: string | undefined;
        error:
            | import('./lib/http.ts').AppError
            | import('./lib/http.ts').FetchError
            | undefined;
    }
}
