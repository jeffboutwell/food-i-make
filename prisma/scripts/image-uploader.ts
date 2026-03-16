import ImageKit from "@imagekit/nodejs";

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

const isHttpUrl = (value: string) => {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

export const uploadImage = async (url: string, slug: string) => {
  if (!process.env.IMAGEKIT_PUBLIC_KEY || !process.env.IMAGEKIT_PRIVATE_KEY) {
    throw new Error("Missing required ImageKit credentials in environment");
  }

  const sourceUrl = url.trim();

  if (!isHttpUrl(sourceUrl)) {
    console.warn(`Skipping upload for non-http image URL: ${sourceUrl}`);
    return null;
  }

  try {
    const sourceImage = await fetch(sourceUrl, {
      redirect: "follow",
      headers: {
        "user-agent": "food-i-make-migration/1.0",
      },
    });

    if (!sourceImage.ok) {
      console.warn(
        `Could not fetch source image (${sourceImage.status}) for ${sourceUrl}`,
      );
      return null;
    }

    const contentType = sourceImage.headers.get("content-type") ?? "";

    if (!contentType.toLowerCase().startsWith("image/")) {
      console.warn(
        `Skipping non-image source response (${contentType || "unknown"}) for ${sourceUrl}`,
      );
      return null;
    }

    const imageBytes = await sourceImage.arrayBuffer();
    const file = Buffer.from(imageBytes);

    const response = await client.files.upload({
      file,
      fileName: slug,
      useUniqueFileName: true,
      folder: "/recipes",
      tags: ["recipe", slug],
    });

    console.log("Upload successful:", response.name);
    return response;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown upload error";
    console.warn(`Upload failed for ${sourceUrl}: ${message}`);
    return null;
  }
};
