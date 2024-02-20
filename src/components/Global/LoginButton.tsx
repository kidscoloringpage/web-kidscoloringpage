import {hasLoginDialog} from "../../stores/page.ts";

export function LoginButton() {
    return (
        <button onClick={() => hasLoginDialog.set(true)}
                className="button hidden md:block text-center min-w-[126px]">Start Free
        </button>
    );
}