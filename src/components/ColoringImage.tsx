import React, { useEffect, useRef, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export interface ColoringImageProps {
  src: string;
  alt: string;
  title: string;
  downloaded?: string;
  allowDownload?: boolean;
  isSuperAdmin?: boolean;
  showUserPreviewButton?: boolean;
  userId?: string;
}

export function ColoringImage(props: ColoringImageProps) {
  const {
    src,
    alt,
    title,
    downloaded,
    userId,
    allowDownload = true,
    isSuperAdmin = false,
    showUserPreviewButton = false,
  } = props;
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
                ga-category="DownloadClick"
                ga-action="ColoringPageDownload"
                ga-label={title}
                className="border-b border-b-[#6A7DF6] font-sansita font-bold leading-snug text-[#6A7DF6] hover:border-b-[#F36A3B] hover:text-[#F36A3B]"
              >
                Download
              </button>
            </div>
            {isSuperAdmin && showUserPreviewButton && (
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
            )}
          </div>
        )}
        {!src && <p className="">Generating Image please wait...</p>}
      </div>
    </div>
  );
}
