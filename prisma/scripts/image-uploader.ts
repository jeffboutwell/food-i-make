import ImageKit from "@imagekit/nodejs";

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

export const uploadImage = async (url: string, slug: string) => {
  if (!process.env.IMAGEKIT_PUBLIC_KEY || !process.env.IMAGEKIT_PRIVATE_KEY) {
    throw new Error("Missing required ImageKit credentials in environment");
  }

  try {
    const sourceImage = await fetch(url);

    if (!sourceImage.ok) {
      throw new Error(`Could not fetch source image: ${sourceImage.status}`);
    }

    const response = await client.files.upload({
      file: sourceImage,
      fileName: slug,
      useUniqueFileName: true,
      folder: "/recipes",
      tags: ["recipe", slug],
    });

    console.log("Upload successful:", response.name);
    return response;
  } catch (error) {
    console.error("Upload error:", error);
    return null;
  }
};
