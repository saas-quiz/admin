import { AspectRatio } from "@/components/ui/aspect-ratio";
import { IImage } from "@/types";
import Image from "next/image";
import React from "react";

const QuizHeader = ({ title, images }: { title: string; images: IImage[] }) => {
  return (
    // <div className="border-t-8 border-gray-700">
    <div className="flex gap-2 justify-between">
      <div className="w-full max-w-[30%] md:max-w-[20%]">
        <AspectRatio ratio={2.7 / 1}>
          {images?.some((image) => image.key === "left") && (
            <Image
              src={images?.find((image) => image.key === "left")?.url!}
              quality={10}
              priority
              alt="Image"
              width={0}
              height={0}
              sizes="100vw"
              className="rounded-md object-contain w-full h-full"
            />
          )}
        </AspectRatio>
      </div>
      <div className="bg-muted h-fit w-fit max-w-[55%] rounded-b-md px-2 py-1 title-shadow">
        <h1 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-medium text-center line-clamp-2">{title}</h1>
      </div>
      <div className="w-full max-w-[30%] md:max-w-[20%]">
        <AspectRatio ratio={2.7 / 1}>
          {images?.some((image) => image.key === "right") && (
            <Image
              src={images?.find((image) => image.key === "right")?.url!}
              quality={10}
              priority
              alt="Image"
              width={0}
              height={0}
              sizes="100vw"
              className="rounded-md object-contain w-full h-full"
            />
          )}
        </AspectRatio>
      </div>
    </div>
    // </div>
  );
};

export default QuizHeader;
