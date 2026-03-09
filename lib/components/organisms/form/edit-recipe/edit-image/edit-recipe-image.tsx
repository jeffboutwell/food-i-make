import React from "react";
import { UploadImage } from "@/lib/components/molecules/upload-image/upload-image";
import type { Image as ImageType } from "@/lib/db/recipe/image.types";

export const EditImage = (image: ImageType) => {
  return <UploadImage currentImage={image} />;
};
