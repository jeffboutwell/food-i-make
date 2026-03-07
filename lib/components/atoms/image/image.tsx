import React from "react";
import { Image as IKImage, IKImageProps } from "@imagekit/next";
import clsx from "clsx";

interface ImageProps extends Omit<IKImageProps, "alt"> {
  alt: string;
  className?: string;
}

/**
 * Enhanced ImageKit Image component with optimizations.
 * Supports ImageKit transformations, lazy loading, and responsive images.
 *
 * @example
 * ```tsx
 * <Image
 *   src="/path/to/image.jpg"
 *   alt="Description"
 *   width={500}
 *   height={333}
 *   transformation={[{ width: "500", height: "333", crop: "at_max" }]}
 *   loading="lazy"
 * />
 * ```
 */
export const Image = ({
  alt,
  className,
  loading = "lazy",
  ...props
}: ImageProps) => {
  return (
    <IKImage
      {...props}
      alt={alt}
      loading={loading}
      className={clsx("transition-opacity duration-300", className)}
    />
  );
};
