import { ColoringImage } from '../ColoringImage';
import { useListColoringSheet } from '../../hooks/use-list-coloring-sheet.ts';
import { newColorImageGenerated } from '../../stores/page.ts';
import { useStore } from '@nanostores/react';
import React, { useEffect } from 'react';
import { toast } from 'sonner';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export function MyColoringPages() {
  const [{ data, error, isLoading }, listColoringSheet] =
    useListColoringSheet();
  const $newColorImageGenerated = useStore(newColorImageGenerated);

  if (error) {
    toast.error(error.message);
  }

  useEffect(() => {
    listColoringSheet();
  }, [listColoringSheet]);

  useEffect(() => {
    if ($newColorImageGenerated) {
      listColoringSheet();
      newColorImageGenerated.set(false);
    }
  }, [$newColorImageGenerated]);

  return (
    <div className="bg-white">
      <div className="px-responsive container flex flex-col gap-y-5 px-4 py-12 md:px-0 md:py-20">
        <div className="flex flex-col gap-y-10">
          <div className="flex flex-col">
            <p className="md:leading-0 mb-5 items-center font-sansita text-4xl font-bold leading-10">
              Previous history
            </p>
            <p className="text-xl font-light text-[#545454]">
              Your previously created images here. simple download and ask your
              kids to color it.
            </p>
          </div>
          <div className="max-auto">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {!isLoading &&
                data?.data?.map((coloringPage) => (
                  <ColoringImage
                    key={coloringPage._id}
                    src={coloringPage?.url}
                    title={coloringPage.prompt}
                    alt={coloringPage.prompt}
                  />
                ))}
              {isLoading && (
                <>
                  <div className="min-h-[270px] md:min-h-[400px]">
                    <Skeleton
                      count={1}
                      height="100%"
                      borderRadius="1rem"
                      duration={0.9}
                    />
                  </div>
                  <div className="min-h-[270px] md:min-h-[400px]">
                    <Skeleton
                      count={1}
                      height="100%"
                      borderRadius="1rem"
                      duration={0.9}
                    />
                  </div>
                  <div className="hidden min-h-[270px] md:block md:min-h-[400px]">
                    <Skeleton
                      count={1}
                      height="100%"
                      borderRadius="1rem"
                      duration={0.9}
                    />
                  </div>
                  <div className="hidden min-h-[270px] md:block md:min-h-[400px]">
                    <Skeleton
                      count={1}
                      height="100%"
                      borderRadius="1rem"
                      duration={0.9}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
