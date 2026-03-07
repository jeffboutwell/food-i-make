"use client";

import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { useImageUpload } from "@/lib/hooks/image-upload";

export const UploadImage = () => {
  const { progress, uploadImage, cancelUpload } = useImageUpload();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = () => {
    if (fileInputRef.current) {
      uploadImage(fileInputRef.current.files);
    }
  };

  return (
    <>
      <Field>
        <FieldLabel htmlFor="picture">Picture</FieldLabel>
        <Input id="picture" type="file" ref={fileInputRef} />
        <Button type="button" onClick={handleUpload}>
          Upload file
        </Button>
        <Button type="button" onClick={cancelUpload}>
          Cancel Upload
        </Button>
        <FieldDescription>Select a picture to upload.</FieldDescription>
        Upload progress: <progress value={progress} max={100}></progress>
      </Field>
    </>
  );
};
