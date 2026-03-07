import React from "react";
import { Image as Image_ImageKit } from "@imagekit/next";
import { tr } from "zod/v4/locales";

export const Image = ({
  src,
  alt,
  width,
  height,
  lazy = true,
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  lazy?: boolean;
}) => {
  return (
    <Image_ImageKit
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={lazy ? "lazy" : "eager"}
    />
  );
};
