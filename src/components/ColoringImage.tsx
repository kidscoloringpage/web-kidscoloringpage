import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export interface ColoringImageProps {
  src: string;
  alt: string;
  title: string;
  downloaded?: string;
}

export function ColoringImage(props: ColoringImageProps) {
  const { src, alt, title, downloaded } = props;

  return (
    <div className="relative flex flex-col justify-between gap-y-4 rounded-2xl border border-black bg-white px-4 pb-4 md:px-6 md:pb-6">
      {downloaded && (
        <p className="absolute left-2 top-2 w-fit rounded-3xl bg-[#F36A3B] px-2 py-1.5 font-sansita text-xs font-medium text-white md:left-3 md:top-3 md:px-3 md:py-2 md:text-sm md:font-bold">
          Colored by {downloaded} Kids
        </p>
      )}
      {src && (
        <img src={src} alt={alt} className="h-auto w-full object-cover" />
      )}
      {!src && (
        <div className="h-full min-h-[189px] pt-5 md:min-h-[349px]">
          <Skeleton count={1} height="100%" duration={0.9} />
        </div>
      )}
      <div className="flex flex-col items-start gap-y-1.5">
        <p className="w-full truncate font-sansita font-bold capitalize">
          {title}
        </p>
        {src && (
          <button
            onClick={() => {
              const a = document.createElement('a');
              a.href = src;
              a.download = src.split('/').pop();
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
            }}
            className="border-b border-b-[#6A7DF6] font-sansita font-bold leading-snug text-[#6A7DF6] hover:border-b-[#F36A3B] hover:text-[#F36A3B]"
          >
            Download
          </button>
        )}
        {!src && <p className="">Generating Image please wait...</p>}
      </div>
    </div>
  );
}
