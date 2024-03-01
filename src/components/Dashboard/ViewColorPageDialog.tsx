import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../Global/Dialog';
import { useStore } from '@nanostores/react';
import {
  hasViewColorPageDialog,
  newColorImageGeneratedData,
} from '../../stores/page';
import React from 'react';

export function ViewColorPageDialog() {
  const $hasViewColorPageDialog = useStore(hasViewColorPageDialog);
  const colorImage = useStore(newColorImageGeneratedData);

  return (
    <Dialog
      open={$hasViewColorPageDialog}
      onOpenChange={(state) => {
        hasViewColorPageDialog.set(state);
      }}
    >
      <DialogContent
        allowClose={false}
        className="h-full overflow-y-scroll sm:max-w-[490px] md:h-auto md:overflow-x-auto md:overflow-y-auto"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="p-8">
          <DialogHeader className="flex flex-row justify-between text-center">
            <DialogTitle className="font-sansita text-4xl font-bold">
              Coloring page generated
            </DialogTitle>
            <DialogClose>
              <img
                src="/icon-close-black.png"
                alt="icon-close"
                className="h-[24px] w-[24px]"
              />
            </DialogClose>
          </DialogHeader>
          <div className="flex flex-col items-start gap-y-4 pt-8">
            <img
              src={colorImage?.url}
              alt="color image"
              className="h-auto w-full object-cover"
            />
            <div className="flex flex-col items-start gap-y-1.5">
              <p className="w-full truncate font-sansita font-bold capitalize">
                {colorImage?.prompt}
              </p>
              <button
                onClick={() => {
                  const a = document.createElement('a');
                  a.href = colorImage?.url;
                  a.download = colorImage?.url.split('/').pop();
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                }}
                ga-category="DownloadClick"
                ga-action="ColoringPageDownload"
                ga-label={colorImage?.prompt}
                className="border-b border-b-[#6A7DF6] font-sansita font-bold leading-snug text-[#6A7DF6] hover:border-b-[#F36A3B] hover:text-[#F36A3B]"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
