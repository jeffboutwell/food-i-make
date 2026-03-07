import React from "react";
import { Image as Image_ImageKit } from "@imagekit/next";
import clsx from "clsx";

export const Image = ({
  src,
  alt,
  width,
  height,
  lazy = true,
  className,
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  lazy?: boolean;
  className?: string;
}) => {
  return (
    <Image_ImageKit
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={clsx("Image", className)}
      loading={lazy ? "lazy" : "eager"}
    />
  );
};
