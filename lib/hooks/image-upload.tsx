import { useState, useRef } from "react";

import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next";

import { authenticator } from "../actions/image.actions";

export const useImageUpload = () => {
  const [progress, setProgress] = useState(0);
  const abortController = useRef(new AbortController());

  const uploadImage = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) {
      alert("Please select a file to upload");
      return;
    }

    const file = fileList[0];

    try {
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
          setProgress((event.loaded / event.total) * 100);
        },
        abortSignal: abortController.current.signal,
      });
      console.log("Upload response:", uploadResponse);
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
    }
  };

  const cancelUpload = () => {
    abortController.current.abort();
  };

  return { progress, uploadImage, cancelUpload };
};
