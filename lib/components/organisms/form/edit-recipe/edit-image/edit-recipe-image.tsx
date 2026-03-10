"use client";

import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Image } from "@imagekit/next";
import NextImage from "next/image";
import { type ImageFormValues } from "@/lib/db/recipe/image.types";
import { RecipeFormValues } from "@/lib/db/recipe/recipe.schemas";
import { useFormContext } from "react-hook-form";

const isFileList = (value: unknown): value is FileList => {
  if (typeof FileList === "undefined") {
    return false;
  }

  return value instanceof FileList;
};

export const EditImage = ({
  currentImages,
}: {
  currentImages?: ImageFormValues[];
}) => {
  const {
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useFormContext<RecipeFormValues>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const formImages = watch("images") ?? currentImages ?? [];
  const imageFiles = watch("imageFiles");
  const hasImages = previewUrls.length > 0 || formImages.length > 0;

  useEffect(() => {
    return () => {
      for (const previewUrl of previewUrls) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrls]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files || files.length === 0) {
      for (const previewUrl of previewUrls) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrls([]);
      setValue("imageFiles", undefined, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
      return;
    }

    for (const previewUrl of previewUrls) {
      URL.revokeObjectURL(previewUrl);
    }

    const nextPreviewUrls = Array.from(files).map((file) =>
      URL.createObjectURL(file),
    );

    setPreviewUrls(nextPreviewUrls);

    setValue("imageFiles", files, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
    clearErrors("imageFiles");
  };

  const handleRemoveImage = () => {
    for (const previewUrl of previewUrls) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrls([]);

    setValue("imageFiles", undefined, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });

    setValue("images", [], {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
    clearErrors("images");
    clearErrors("imageFiles");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveSelectedAtIndex = (index: number) => {
    if (!isFileList(imageFiles)) {
      return;
    }

    if (previewUrls.length > 0) {
      URL.revokeObjectURL(previewUrls[index]);

      const nextPreviewUrls = previewUrls.filter((_, i) => i !== index);
      setPreviewUrls(nextPreviewUrls);

      const dataTransfer = new DataTransfer();
      Array.from(imageFiles).forEach((file, i) => {
        if (i !== index) {
          dataTransfer.items.add(file);
        }
      });

      const nextFiles = dataTransfer.files;

      if (nextFiles.length === 0) {
        setValue("imageFiles", undefined, {
          shouldDirty: true,
          shouldTouch: true,
          shouldValidate: true,
        });
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        setValue("imageFiles", nextFiles, {
          shouldDirty: true,
          shouldTouch: true,
          shouldValidate: true,
        });
      }

      clearErrors("imageFiles");
    }
  };

  const handleRemoveExistingAtIndex = (index: number) => {
    const nextImages = formImages.filter((_, i) => i !== index);
    setValue("images", nextImages, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
    clearErrors("images");
  };

  return (
    <div>
      <Field>
        <FieldLabel htmlFor="picture">Recipe Images</FieldLabel>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-2">
            <Input
              id="picture"
              type="file"
              ref={fileInputRef}
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />
            {formImages.length > 0 && (
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {formImages.map((image, index) => (
                  <div key={image.fileId} className="space-y-2">
                    <Image
                      src={image.url}
                      alt={image.name}
                      width={600}
                      height={384}
                      unoptimized
                      className="h-48 w-full max-w-full rounded-md border object-cover"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleRemoveExistingAtIndex(index)}
                    >
                      Remove saved image {index + 1}
                    </Button>
                  </div>
                ))}
              </div>
            )}
            {previewUrls.length > 0 ? (
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {previewUrls.map((previewUrl, index) => (
                  <div key={previewUrl} className="space-y-2">
                    <NextImage
                      src={previewUrl}
                      alt={`Selected image preview ${index + 1}`}
                      width={600}
                      height={384}
                      unoptimized
                      className="h-48 w-full max-w-full rounded-md border object-cover"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleRemoveSelectedAtIndex(index)}
                    >
                      Remove selected image {index + 1}
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full h-full bg-secondary flex self-stretch justify-self-stretch items-center justify-center">
                <FieldDescription>
                  Select one or more pictures. They will upload when you save.
                </FieldDescription>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            {hasImages && (
              <Button
                type="button"
                onClick={handleRemoveImage}
                variant={"outline"}
              >
                Remove all images
              </Button>
            )}
            {(errors.images?.message || errors.imageFiles?.message) && (
              <p className="text-sm text-red-500">
                {String(errors.images?.message ?? errors.imageFiles?.message)}
              </p>
            )}
          </div>
        </div>
      </Field>
    </div>
  );
};
