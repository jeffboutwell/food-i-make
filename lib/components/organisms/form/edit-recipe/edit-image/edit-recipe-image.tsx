import React from "react";
import { UploadImage } from "@/lib/components/molecules/upload-image/upload-image";
import type { ImageFormValues } from "@/lib/db/recipe/image.types";

export const EditImage = (image: ImageFormValues) => {
  return <UploadImage currentImage={image} />;
};
