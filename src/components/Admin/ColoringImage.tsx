import React, { useEffect, useRef, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { EditColoringImage } from './EditColoringImage.tsx';
import type { ColoringImage } from '../../api/admin.ts';

export interface ColoringImageProps {
  coloringPage: ColoringImage;
}

export function ColoringImage(props: ColoringImageProps) {
  const { url: src, prompt } = props?.coloringPage || {};
  const userId = props?.coloringPage?.user?._id;
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  const onLoad = () => {
    setLoaded(true);
  };

  useEffect(() => {
    if (ref.current && ref.current.complete) {
      onLoad();
    }
  });

  return (
    <div className="relative flex flex-col justify-between gap-y-4 rounded-2xl border border-black bg-white px-4 pb-4 group-hover:border-[#F36A3C] group-hover:text-[#F36A3C] md:px-6 md:pb-6">
      <div className="relative flex flex-col">
        {src && (
          <img
            ref={ref}
            onLoad={onLoad}
            src={src}
            alt={prompt}
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
          {prompt}
        </p>
        {src && (
          <div className="flex w-full flex-col">
            <div className="flex w-full flex-col items-center justify-between gap-y-3 md:flex-row md:gap-y-0">
              <div>
                <button
                  onClick={() => {
                    const a = document.createElement('a');
                    a.href = src;
                    a.download = src.split('/').pop();
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                  }}
                  data-ga-category="DownloadClick"
                  data-ga-action="ColoringPageDownload"
                  data-ga-label={prompt}
                  className="border-b border-b-[#6A7DF6] font-sansita font-bold leading-snug text-[#6A7DF6] hover:border-b-[#F36A3B] hover:text-[#F36A3B]"
                >
                  Download
                </button>
              </div>
              <div className="flex gap-x-1.5">
                <EditColoringImage coloringPage={props?.coloringPage} />
                <a
                  href={`/admin/user/${userId}`}
                  className="group rounded-full bg-[#fff2df] p-2"
                >
                  <svg
                    className="h-5 w-5 stroke-black group-hover:stroke-[#6A7DF6]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        )}
        {!src && <p className="">Generating Image please wait...</p>}
      </div>
    </div>
  );
}
