import React, { useEffect, useRef, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export interface ColoringImageProps {
  src: string;
  alt: string;
  title: string;
  downloaded?: string;
  allowDownload?: boolean;
}

export function ColoringImage(props: ColoringImageProps) {
  const { src, alt, title, downloaded, allowDownload = true } = props;
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
