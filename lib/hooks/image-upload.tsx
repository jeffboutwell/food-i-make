import { useState, useRef } from "react";

import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next";
import type { ImageResponse } from "@/lib/db/recipe/image.types";

import { authenticator } from "../actions/image.actions";

export const useImageUpload = () => {
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const abortController = useRef(new AbortController());

  const uploadImages = async (
    fileList: FileList | null,
  ): Promise<ImageResponse[] | null> => {
    if (!fileList || fileList.length === 0) {
      alert("Please select a file to upload");
      return null;
    }

    abortController.current = new AbortController();

    const files = Array.from(fileList);
    const uploadedImages: ImageResponse[] = [];
    setIsUploading(true);
    setProgress(0);

    try {
      for (const [index, file] of files.entries()) {
        const authParams = await authenticator();
        const { signature, expire, token, publicKey } = authParams;

        const uploadResponse = await upload({
          expire,
          token,
          signature,
          publicKey,
          file,
          fileName: file.name,
          onProgress: (event) => {
            const fileProgress = event.loaded / event.total;
            const overallProgress =
              ((index + fileProgress) / files.length) * 100;
            setProgress(overallProgress);
          },
          abortSignal: abortController.current.signal,
        });

        uploadedImages.push(uploadResponse);
      }

      return uploadedImages;
    } catch (error) {
      if (error instanceof ImageKitAbortError) {
        console.error("Upload aborted:", error.reason);
      } else if (error instanceof ImageKitInvalidRequestError) {
        console.error("Invalid request:", error.message);
      } else if (error instanceof ImageKitUploadNetworkError) {
        console.error("Network error:", error.message);
      } else if (error instanceof ImageKitServerError) {
        console.error("Server error:", error.message);
      } else {
        console.error("Upload error:", error);
      }

      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const uploadImage = async (
    fileList: FileList | null,
  ): Promise<ImageResponse | null> => {
    const uploadedImages = await uploadImages(fileList);
    return uploadedImages?.[0] ?? null;
  };

  const cancelUpload = () => {
    abortController.current.abort();
  };

  return { progress, isUploading, uploadImage, uploadImages, cancelUpload };
};
