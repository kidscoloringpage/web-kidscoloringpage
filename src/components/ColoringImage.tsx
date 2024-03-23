import React, { useEffect, useRef, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export interface ColoringImageProps {
  src: string;
  alt: string;
  title: string;
  downloaded?: string;
  allowDownload?: boolean;
  allowPrint?: boolean;
}

export function ColoringImage(props: ColoringImageProps) {
  const {
    src,
    alt,
    title,
    downloaded,
    allowDownload = true,
    allowPrint = true,
  } = props;
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  const onLoad = () => {
    setLoaded(true);
  };

  const print = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e?.stopPropagation();

    // Define the dimensions of the popup.
    const popupWidth = 600;
    const popupHeight = 600;

    // Calculate the position to center the popup.
    const left = window.screen.width / 2 - popupWidth / 2;
    const top = window.screen.height / 2 - popupHeight / 2;

    const features = `width=${popupWidth},height=${popupHeight},left=${left},top=${top}`;

    const printWindow = window.open('', '', features);
    printWindow.document.write(
      `<img src="${src}" alt="coloring-image" style="width:100%;height:100%;object-fit:contain;" />`,
    );
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  useEffect(() => {
    if (ref.current && ref.current.complete) {
      onLoad();
    }
  });

  return (
    <div
      onClick={() => {
        if (!allowDownload || !src) {
          return;
        }
        const a = document.createElement('a');
        a.href = src;
        a.download = src.split('/').pop();
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }}
      data-ga-category="DownloadClick"
      data-ga-action="ColoringPageDownload"
      data-ga-label={title}
      className="group relative flex cursor-pointer flex-col justify-between gap-y-4 rounded-2xl border border-black bg-white px-4 pb-4 transition hover:drop-shadow-lg group-hover:border-[#F36A3C] group-hover:text-[#F36A3C] md:px-6 md:pb-6"
    >
      {allowPrint && loaded && (
        <button
          data-ga-category="PrintClick"
          data-ga-action="ColoringPagePrint"
          data-ga-label={title}
          onClick={print}
          className="absolute right-2 top-2 z-40 hidden rounded-lg bg-[#F36A3B] group-hover:block md:right-3 md:top-3"
          title="print"
        >
          <div className="group/icon-container p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              stroke="#FFFFFF"
              fill="#F36A3B"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 text-white md:h-5 md:w-5"
            >
              <polyline points="6 9 6 2 18 2 18 9" />
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <rect width="12" height="8" x="6" y="14" />
            </svg>
          </div>
        </button>
      )}
      {downloaded && loaded && (
        <p className="absolute left-2 top-2 z-40 w-fit rounded-3xl bg-[#F36A3B] px-2 py-1.5 font-sansita text-xs font-medium text-white md:left-3 md:top-3 md:px-3 md:py-2 md:text-sm md:font-bold">
          Colored by {downloaded} Kids
        </p>
      )}
      <div className="relative flex flex-col">
        {src && (
          <img
            ref={ref}
            onLoad={onLoad}
            src={src}
            alt={alt}
            loading="lazy"
            className={`h-auto w-full object-cover ${loaded ? 'opacity-100' : 'opacity-0'}`}
          />
        )}
        {!src ||
          (!loaded && (
            <div className="absolute left-0 top-0 h-full w-full pt-4">
              <Skeleton count={1} height="100%" duration={0.9} />
            </div>
          ))}
      </div>
      <div className="flex flex-col items-start gap-y-1.5">
        <p className="w-full truncate font-sansita font-bold capitalize">
          {title}
        </p>
        {src && allowDownload && (
          <div className="flex w-full items-center justify-between">
            <p className="font-sansita font-bold leading-snug text-[#6A7DF6] group-hover:text-[#F36A3B]">
              Download
            </p>
          </div>
        )}
        {!src && <p className="">Generating Image please wait...</p>}
      </div>
    </div>
  );
}
