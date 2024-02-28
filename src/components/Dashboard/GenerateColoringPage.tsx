import { useState } from 'react';
import { httpGet, httpPost } from '../../lib/http.ts';
import { toast } from 'sonner';
import {
  hasViewColorPageDialog,
  newColorImageGenerated,
  newColorImageGeneratedData,
  pageProgressMessage,
} from '../../stores/page.ts';
import type { UserDocument } from '../../api/user.ts';

type Props = {
  totalCredits: number;
  usedCredits: number;
  hasActiveSubscription: boolean;
  subscriptionInterval: UserDocument['subscription']['interval'];
};

export function GenerateColoringPage(props: Props) {
  const [remainingCredits, setRemainingCredits] = useState(
    props?.totalCredits - props?.usedCredits,
  );
  const [prompt, setPrompt] = useState('');

  const getColorSheet = async (id: string) => {
    return httpGet<{
      _id: string;
      status: string;
      url: string;
      prompt: string;
    }>(`${import.meta.env.PUBLIC_API_URL}/v1-get-coloring-sheet`, {
      id,
    });
  };

  const generateColorSheet = async () => {
    if (!prompt) {
      toast.error('Please enter a prompt');
      return;
    }

    pageProgressMessage.set('Generating coloring page. Please wait');
    const { response: createResponse, error } = await httpPost<{
      _id: string;
      status: string;
    }>(`${import.meta.env.PUBLIC_API_URL}/v1-create-coloring-sheet`, {
      prompt,
    });

    if (error) {
      pageProgressMessage.set('');
      toast.error(
        error?.message || 'Something went wrong. Please try again later',
      );
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
        return;
      }

      const { response: getResponse } = await getColorSheet(createResponse._id);
      if (getResponse?.status === 'success') {
        clearInterval(interval);
        pageProgressMessage.set('');
        newColorImageGenerated.set(true);
        newColorImageGeneratedData.set({
          url: getResponse.url,
          prompt: getResponse.prompt,
        });
        hasViewColorPageDialog.set(true);
        setRemainingCredits(remainingCredits - 1);
        setPrompt('');
      }
    }, 5000);
  };

  return (
    <div className="bg-[#FFF2DF]">
      <div className="px-responsive container px-4 py-8 md:px-0 md:py-12">
        <div className="mb-6-responsive mb-0 flex flex-col items-start justify-between gap-y-3 md:flex-row md:gap-y-0">
          <div className="flex flex-col gap-y-5">
            <p className="flex flex-row items-center gap-x-3 font-sansita text-3xl sm:text-4xl md:text-6xl">
              Let's create{' '}
              <img
                src="/icon-magic-wand.png"
                alt="icon-magic-wand"
                className="h-auto w-[52px]"
              />
            </p>
            <p className="font-wonderbar text-3xl !leading-tight sm:text-4xl md:text-6xl lg:text-6xl xl:text-6xl">
              <span className="text-[#6A7DF6]">Kids</span>
              <span className="text-[#347C44]">Coloring</span>
              <span className="text-[#EF60B7]">Page</span>
            </p>
          </div>
          {!props?.hasActiveSubscription && (
            <div className="scale-75-responsive relative flex w-full scale-75 flex-col items-center justify-center md:w-auto md:transform-none">
              <div
                className={`flex flex-col rounded-full border ${remainingCredits > 0 ? 'border-black' : 'border-[#CE0B0B]'} h-[220px] w-[220px] items-center justify-center gap-y-2.5 text-center ${remainingCredits > 0 ? 'bg-transparent' : 'bg-[#FCE3D1]'}`}
              >
                <p
                  className={`font-sansita ${remainingCredits > 0 ? 'text-[#FFCA28]' : 'text-[#D73733]'} text-7xl`}
                >
                  <span className="font-black">{remainingCredits}</span>
                  <span>/{props.totalCredits}</span>
                </p>
                <p
                  className="font-sansita text-xl"
                  dangerouslySetInnerHTML={{
                    __html:
                      remainingCredits > 0
                        ? props.subscriptionInterval === 'one_time'
                          ? 'Credits remaining'
                          : 'Free credits<br/>remaining'
                        : props.subscriptionInterval === 'one_time'
                          ? 'All credits finished'
                          : 'Free credits finished!',
                  }}
                />
              </div>
              {!remainingCredits && (
                <a
                  href="#pricing"
                  className="button-4 absolute bottom-[4px] flex w-fit min-w-[285px] flex-row items-center justify-center gap-x-4 bg-[#F28637] text-white"
                >
                  Upgrade to unlimited
                  <img
                    src="/icon-angle-right-white.png"
                    alt="icon-angle-right"
                    className="absolute right-4 mt-[4px] h-auto w-[10px]"
                  />
                </a>
              )}
            </div>
          )}
        </div>
        <div className="mb-5 font-light">
          <p className="mb-2 text-2xl">
            Describe the theme or concept for your coloring sheet.{' '}
          </p>
          <p className="text-lg">
            For example, you might request 'A serene landscape with a majestic
            waterfall' or 'A fantastical scene featuring unicorns and dragons
          </p>
        </div>
        <div className="flex flex-col gap-x-4 gap-y-2.5 md:flex-row md:gap-y-0">
          <label htmlFor="prompt" className="flex flex-1">
            <input
              type="text"
              autoComplete="off"
              placeholder="Enter your prompt here"
              id="prompt"
              value={prompt}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  generateColorSheet();
                }
              }}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full rounded-full border border-black px-8 py-4 text-black placeholder-[#999999] outline-none focus:text-black focus:placeholder-black"
            />
          </label>
          <button
            disabled={!remainingCredits && !props?.hasActiveSubscription}
            onClick={generateColorSheet}
            className="button relative flex w-fit min-w-full flex-row items-center justify-center gap-x-4 md:min-w-[285px]"
          >
            Generate color sheet
            <img
              src="/icon-angle-right.png"
              alt="icon-angle-right"
              className="absolute right-4 mt-[4px] h-auto w-[10px]"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
