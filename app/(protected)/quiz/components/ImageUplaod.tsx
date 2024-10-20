import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { error } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const ImageUplaod = ({
  type,
  images,
  setImages,
}: {
  type: string;
  images: { key: string; file?: File; url: string }[];
  setImages: React.Dispatch<React.SetStateAction<{ key: string; file?: File; url: string }[]>>;
}) => {
  const image = images.find((img) => img.key === type);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      if (!files || files.length === 0) return;
      if (files.length > 1) {
        error("Maximum 1 image allowed");
        return;
      }

      if (files[0].size > 1 * 1024 * 1024) {
        error("Image size should be less than 1MB");
        return;
      }

      const blob = URL.createObjectURL(files[0]);
      const imageExist = images.findIndex((img) => img.key === type);
      let updatedImages = [...images];
      if (imageExist !== -1) {
        updatedImages[imageExist] = { key: type, file: files[0], url: blob };
      } else {
        updatedImages.push({ key: type, file: files[0], url: blob });
      }
      setImages(updatedImages);
    }
  };
  return (
    <Label htmlFor={`${type}-image-upload`} className="w-full max-w-[200px] flex flex-col gap-1 select-none cursor-pointer">
      <AspectRatio ratio={2.7 / 1} className="border border-dashed border-border bg-muted">
        {image && (
          <Image
            src={image.url}
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
      <p className="text-xs md:text-sm">Upload Image</p>
      <Input type="file" className="hidden" accept="image/*" id={`${type}-image-upload`} onChange={handleImageChange} />
    </Label>
  );
};

export default ImageUplaod;
