import {useEffect, useState} from "react";
import {httpGet, httpPost} from "../../lib/http.ts";
import {toast} from "sonner";
import {newColorImageGenerated, pageProgressMessage} from "../../stores/page.ts";
import {useCountColoringSheet} from "../../hooks/use-count-coloring-sheet.ts";
import type {UserDocument} from "../../api/user.ts";

type Props = {
    totalCredits: number;
    usedCredits: number;
    hasActiveSubscription: boolean;
    subscriptionInterval: UserDocument['subscription']['interval']
};

export function GenerateColoringPage(props: Props) {
    const [remainingCredits, setRemainingCredits] = useState(props?.totalCredits - props?.usedCredits);
    const [prompt, setPrompt] = useState('');
    const [{data: countSheetsResponse}, countColoringSheet] = useCountColoringSheet();

    useEffect(() => {
        if(countSheetsResponse) {
            setRemainingCredits(remainingCredits - 1);
        }
    }, [countSheetsResponse]);

    const getColorSheet = async (id: string) => {
        return httpGet<{ _id: string, status: string, url: string }>(
            `${import.meta.env.PUBLIC_API_URL}/v1-get-coloring-sheet`,
            {
                id,
            },
        );
    }

    const generateColorSheet = async () => {
        if (!prompt) {
            toast.error('Please enter a prompt');
            return;
        }

        pageProgressMessage.set('Generating coloring page. Please wait');
        const { response: createResponse, error } = await httpPost<{ _id: string, status: string }>(
            `${import.meta.env.PUBLIC_API_URL}/v1-create-coloring-sheet`,
            {
                prompt,
            },
        );

        if (error) {
            pageProgressMessage.set('');
            toast.error(error?.message || 'Something went wrong. Please try again later');
            return;
        }

        // call the getColorSheet function max 5 times with 5 seconds interval
        let count = 0;
        const interval = setInterval(async () => {
            count++;
            if (count > 10) {
                clearInterval(interval);
                pageProgressMessage.set('');
                toast.error('Coloring sheet generation failed. Please try again later');
                !props?.hasActiveSubscription && countColoringSheet();
                return;
            }

            const { response: getResponse } = await getColorSheet(createResponse._id);
            if (getResponse?.status === 'success') {
                clearInterval(interval);
                pageProgressMessage.set('');
                newColorImageGenerated.set(true);
                !props?.hasActiveSubscription && countColoringSheet();
            }
        }, 5000);
    }

    return (
        <div className="bg-[#FFF2DF]">
            <div className="container py-8 md:py-12 px-4 md:px-0 px-responsive">
                <div
                    className="flex flex-col md:flex-row justify-between items-start mb-0 mb-6-responsive gap-y-3 md:gap-y-0">
                    <div className="flex flex-col gap-y-5">
                        <p className="font-sansita text-3xl sm:text-4xl md:text-6xl flex flex-row items-center gap-x-3">Let's
                            create <img src="/icon-magic-wand.png" alt="icon-magic-wand" className="w-[52px] h-auto"/>
                        </p>
                        <p className="font-wonderbar text-3xl sm:text-4xl md:text-6xl lg:text-6xl xl:text-6xl !leading-tight">
                            <span className="text-[#6A7DF6]">Kids</span>
                            <span className="text-[#347C44]">Coloring</span>
                            <span className="text-[#EF60B7]">Page</span>
                        </p>
                    </div>
                    {!props?.hasActiveSubscription && <div
                        className="relative justify-center flex flex-col items-center w-full md:w-auto scale-75 md:transform-none scale-75-responsive">
                        <div
                            className={`rounded-full flex flex-col border ${remainingCredits > 0 ? "border-black" : "border-[#CE0B0B]"} w-[220px] h-[220px] justify-center items-center gap-y-2.5 text-center ${remainingCredits > 0 ? "bg-transparent" : "bg-[#FCE3D1]"}`}>
                            <p className={`font-sansita ${remainingCredits > 0 ? "text-[#FFCA28]" : "text-[#D73733]"} text-7xl`}><span
                                className="font-black">{remainingCredits}</span><span>/{props.totalCredits}</span></p>
                            <p className="font-sansita text-xl"
                               dangerouslySetInnerHTML={{
                                   __html: remainingCredits > 0
                                       ? ( props.subscriptionInterval === "one_time" ? "Credits remaining" : "Free credits<br/>remaining")
                                       : ( props.subscriptionInterval === "one_time" ? "All credits finished" : "Free credits finished!")
                            }}/>
                        </div>
                        {!remainingCredits && <a href="#pricing"
                                                 className="button-4 flex flex-row w-fit items-center justify-center gap-x-4 min-w-[285px] bg-[#F28637] text-white absolute bottom-[4px]">
                            Upgrade to unlimited
                            <img src="/icon-angle-right-white.png" alt="icon-angle-right"
                                 className="w-[10px] h-auto mt-[4px] absolute right-4"/>
                        </a>}
                    </div>}
                </div>
                <div className="font-light mb-5">
                    <p className="text-2xl mb-2">Describe the theme or concept for your coloring sheet. </p>
                    <p className="text-lg">For example, you might request 'A serene landscape with a majestic waterfall'
                        or 'A fantastical scene featuring unicorns and dragons</p>
                </div>
                <div className="flex flex-col md:flex-row gap-x-4 gap-y-2.5 md:gap-y-0">
                    <label htmlFor="prompt" className="flex flex-1">
                        <input
                            type="text"
                            autoComplete="off"
                            placeholder="Enter your prompt here"
                            id="prompt"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            className="text-black placeholder-[#999999] outline-none py-4 px-8 border border-black rounded-full focus:text-black focus:placeholder-black w-full" />
                    </label>
                    <button
                        disabled={!remainingCredits && !props?.hasActiveSubscription}
                        onClick={generateColorSheet}
                        className="button flex flex-row w-fit items-center justify-center gap-x-4 relative min-w-full md:min-w-[285px]">
                        Generate color sheet
                        <img src="/icon-angle-right.png" alt="icon-angle-right"
                             className="w-[10px] h-auto mt-[4px] absolute right-4"/>
                    </button>
                </div>
            </div>
        </div>
    );
}