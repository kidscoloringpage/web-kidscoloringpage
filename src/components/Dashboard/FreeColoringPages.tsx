import {ColoringImage} from "../ColoringImage";
import {useEffect} from "react";
import {newColorImageGenerated} from "../../stores/page.ts";
import {useStore} from "@nanostores/react";


export function FreeColoringPages() {
    const $newColorImageGenerated = useStore(newColorImageGenerated);

    useEffect(() => {
        window.location.reload();
    }, [$newColorImageGenerated]);

    return (
        <div className="bg-[#FFF2DF]">
            <div className="container flex flex-col py-12 gap-y-5 md:py-20 px-4 md:px-0 px-responsive">
                <div className="flex flex-col gap-y-10">
                    <div className="flex flex-row justify-between">
                        <p className="font-sansita font-bold text-4xl items-center leading-10 md:leading-0">Free
                            Printable Coloring Pages</p>
                        <a href="/color-pages"
                           className="button hidden md:flex flex-row w-fit items-center justify-center gap-x-4 md:min-w-[195px] md:relative">
                            Show all
                            <img src="/icon-angle-right.png" alt="icon-angle-right"
                                 className="w-[10px] h-auto mt-[4px] md:absolute md:right-4"/>
                        </a>
                    </div>
                    <div className="max-auto">
                        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
                            <ColoringImage client:load src="/color-pages/Elsa and anna.png" title="Elsa and anna"
                                           alt="Elsa and anna" downloaded="5,210"/>
                            <ColoringImage client:load src="/color-pages/Winnie-the-Pooh.png" title="Winnie-the-Pooh"
                                           alt="Winnie-the-Pooh" downloaded="1,210"/>
                            <ColoringImage client:load src="/color-pages/dino holding a sword.png"
                                           title="dino holding a sword" alt="dino holding a sword" downloaded="9,830"/>
                            <ColoringImage client:load src="/color-pages/scooby dooby doo2.png" title="scooby dooby doo"
                                           alt="scooby dooby doo" downloaded="3,670"/>
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-end">
                    <a href="/color-pages"
                       className="button flex md:hidden flex-row w-fit items-center justify-center gap-x-4 md:min-w-[195px] md:relative">
                        Show all
                        <img src="/icon-angle-right.png" alt="icon-angle-right"
                             className="w-[10px] h-auto mt-[4px] md:absolute md:right-4"/>
                    </a>
                </div>
            </div>
        </div>
    );
}