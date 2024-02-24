import React from "react"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export interface ColoringImageProps {
    src: string;
    alt: string;
    title: string;
    downloaded?: string;
}

export function ColoringImage(props: ColoringImageProps) {
    const {src, alt, title, downloaded } = props;

    return (
        <div
            className="flex flex-col border border-black rounded-2xl px-4 pb-4 md:px-6 md:pb-6 gap-y-4 relative bg-white justify-between">
            { downloaded &&
                <p className="bg-[#F36A3B] py-1.5 md:py-2 px-2 md:px-3 w-fit text-white font-sansita font-medium md:font-bold rounded-3xl text-xs md:text-sm top-2 md:top-3 left-2 md:left-3 absolute">Colored
                    by {downloaded} Kids</p>}
            { src && <img src={src} alt={alt} className="h-fit bg-cover"/>}
            { !src && <div className="h-full pt-5 min-h-[189px] md:min-h-[349px]">
                <Skeleton count={1} height="100%" duration={0.9} />
            </div>}
            <div className="flex flex-col gap-y-1.5 items-start">
                <p className="font-sansita font-bold capitalize truncate w-full">{title}</p>
                {src && <button
                    onClick={() => {
                        const a = document.createElement('a');
                        a.href = src;
                        a.download = src.split('/').pop();
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                    }}
                    className="text-[#6A7DF6] font-sansita font-bold border-b border-b-[#6A7DF6] leading-snug hover:text-[#F36A3B] hover:border-b-[#F36A3B]">Download
                </button>}
                {!src && <p className="">Generating Image please wait...</p>}
            </div>
        </div>
    );
}