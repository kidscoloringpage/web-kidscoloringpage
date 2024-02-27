import {useState} from "react";
import {httpGet} from "../../lib/http.ts";
import {toast} from "sonner";

export function GoogleButton() {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = () => {
        setIsLoading(true);
        httpGet<{ loginUrl: string }>(
            `${import.meta.env.PUBLIC_API_URL}/v1-google-login`,
        )
            .then(({ response, error }) => {
                if (!response?.loginUrl) {
                    toast.error(error?.message || 'Something went wrong.');
                    setIsLoading(false);

                    return;
                }

                window.location.href = response.loginUrl;
            })
            .catch(() => {
                toast.error('Something went wrong. Please try again later.');
                setIsLoading(false);
            });
    };

    return (
        <button
            disabled={isLoading}
            onClick={handleClick}
            className="group button flex flex-row items-center justify-center gap-x-2 w-full disabled:opacity-30">
            <img src="/google.svg" alt="google"
                 className="w-[18px] h-auto mt-[4px]"/>
            <span
                className="group-hover:text-[#F36A3B] text-xl">{isLoading ? "Please wait..." : "Continue with Google"}</span>
        </button>
    );
}