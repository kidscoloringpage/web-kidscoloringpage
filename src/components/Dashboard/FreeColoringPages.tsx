import { ColoringImage } from '../ColoringImage';
import { useEffect } from 'react';
import { newColorImageGenerated } from '../../stores/page.ts';
import { useStore } from '@nanostores/react';

export function FreeColoringPages() {
  const $newColorImageGenerated = useStore(newColorImageGenerated);

  useEffect(() => {
    $newColorImageGenerated && window.location.reload();
  }, [$newColorImageGenerated]);

  return (
    <div className="bg-[#FFF2DF]">
      <div className="px-responsive container flex flex-col gap-y-5 px-4 py-12 md:px-0 md:py-20">
        <div className="flex flex-col gap-y-10">
          <div className="flex flex-row justify-between">
            <p className="md:leading-0 items-center font-sansita text-4xl font-bold leading-10">
              Free Printable Coloring Pages
            </p>
            <a
              href="/free-coloring-pages"
              className="button hidden w-fit flex-row items-center justify-center gap-x-4 md:relative md:flex md:min-w-[195px]"
            >
              Show all
              <img
                src="/icon-angle-right.png"
                alt="icon-angle-right"
                className="mt-[4px] h-auto w-[10px] md:absolute md:right-4"
              />
            </a>
          </div>
          <div className="max-auto">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <ColoringImage
                client:load
                src="/color-pages/Elsa and anna.png"
                title="Elsa and anna"
                alt="Elsa and anna"
                downloaded="5,210"
              />
              <ColoringImage
                client:load
                src="/color-pages/Winnie-the-Pooh.png"
                title="Winnie-the-Pooh"
                alt="Winnie-the-Pooh"
                downloaded="1,210"
              />
              <ColoringImage
                client:load
                src="/color-pages/dino holding a sword.png"
                title="dino holding a sword"
                alt="dino holding a sword"
                downloaded="9,830"
              />
              <ColoringImage
                client:load
                src="/color-pages/scooby dooby doo2.png"
                title="scooby dooby doo"
                alt="scooby dooby doo"
                downloaded="3,670"
              />
            </div>
          </div>
        </div>
        <div className="flex w-full justify-end">
          <a
            href="/free-coloring-pages"
            className="button flex w-fit flex-row items-center justify-center gap-x-4 md:relative md:hidden md:min-w-[195px]"
          >
            Show all
            <img
              src="/icon-angle-right.png"
              alt="icon-angle-right"
              className="mt-[4px] h-auto w-[10px] md:absolute md:right-4"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
