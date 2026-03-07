import {
  upload,
  ImageKitInvalidRequestError,
  ImageKitAbortError,
  ImageKitUploadNetworkError,
  ImageKitServerError,
} from "@imagekit/javascript";
import ImageKit from "@imagekit/nodejs";

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

const { token, expire, signature } =
  client.helper.getAuthenticationParameters();
console.log({ token, expire, signature });

const abortController = new AbortController(); // You can abort the upload using abortController.abort();

interface UploadOptions {
  file: string;
  fileName: string;
  token: string;
  signature: string;
  expire: number;
  publicKey: string;
  onProgress: (event: ProgressEvent) => void;
  abortSignal: AbortSignal;
}

export const uploadImage = async (url: string, slug: string) => {
  const file = url;

  const uploadOptions: UploadOptions = {
    file,
    fileName: slug,
    token: token,
    signature: signature,
    expire: expire,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY ?? "",
    onProgress: (event: ProgressEvent) => {
      console.log(`Progress: ${event.loaded}/${event.total}`);
    },
    abortSignal: abortController.signal,
  };

  try {
    const response = await upload(uploadOptions);
    console.log("Upload successful:", response.name);
    return response;
  } catch (error) {
    if (error instanceof ImageKitAbortError) {
      // You aborted the upload
      console.error("Upload aborted:", error.reason);
    } else if (error instanceof ImageKitInvalidRequestError) {
      // You made an invalid request
      console.error("Invalid request:", error.message);
    } else if (error instanceof ImageKitUploadNetworkError) {
      // Random network error on client side
      console.error("Network error:", error.message);
    } else if (error instanceof ImageKitServerError) {
      // Error on ImageKit server side (5xx). Usually rare and temporary.
      console.error("Server error:", error.message);
    } else {
      // Any other error. You love JavaScript, right?
      console.error("Upload error:", error);
    }
  }
};
