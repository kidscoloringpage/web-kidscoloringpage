import {ColoringImage} from "../ColoringImage";
import type {ColorSheetDocument} from "../../api/color-sheet.ts";

type Props = {
    coloringPages: ColorSheetDocument[];
}

export function MyColoringPages(props: Props) {
    const { coloringPages } = props;

    return (
        <div className="bg-white">
            <div className="container flex flex-col py-12 gap-y-5 md:py-20 px-4 md:px-0 px-responsive">
                <div className="flex flex-col gap-y-10">
                    <div className="flex flex-col">
                        <p className="font-sansita font-bold text-4xl items-center leading-10 md:leading-0 mb-5">Previous
                            history</p>
                        <p className="text-xl text-[#545454] font-light">Your previously created images here. simple download and ask your kids to color it.</p>
                    </div>
                    <div className="max-auto">
                        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
                            {
                                coloringPages?.map((coloringPage) => (
                                    <ColoringImage key={coloringPage._id} src={coloringPage?.url} title={coloringPage.prompt} alt={coloringPage.prompt} />
                                ))
                            }
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