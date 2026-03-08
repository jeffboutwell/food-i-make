"use client";

import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useImageUpload } from "@/lib/hooks/image-upload";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";

export const UploadImage = () => {
  const { progress, uploadImage, cancelUpload } = useImageUpload();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const nextPreviewUrl = URL.createObjectURL(file);

    setPreviewUrl(nextPreviewUrl);
  };

  const handleUpload = () => {
    if (fileInputRef.current) {
      uploadImage(fileInputRef.current.files);
    }
  };

  const handleRemoveImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <Field>
        <FieldLabel htmlFor="picture">Recipe Image</FieldLabel>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-2">
            <Input
              id="picture"
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileChange}
            />
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt="Selected image preview"
                width={600}
                height={384}
                unoptimized
                className="h-48 w-full max-w-full rounded-md border object-cover"
              />
            ) : (
              <div className="w-full h-full bg-secondary flex self-stretch justify-self-stretch items-center justify-center">
                <FieldDescription>Select a picture to upload.</FieldDescription>
              </div>
            )}
            <Progress
              value={progress}
              max={100}
              className="w-full max-w-48 mx-auto my-4"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Button type="button" onClick={handleUpload}>
              Upload file
            </Button>
            <Button
              type="button"
              onClick={handleRemoveImage}
              variant={"outline"}
            >
              Remove image
            </Button>
            <Button type="button" onClick={cancelUpload} variant={"outline"}>
              Cancel Upload
            </Button>
          </div>
        </div>
      </Field>
    </>
  );
};
