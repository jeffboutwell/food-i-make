import { z } from "zod";
import { UploadResponse } from "@imagekit/next";
import { ImageSchema } from "@/schemas/image";

export type ImageFormValues = z.infer<typeof ImageSchema>;

export type ImageResponse = UploadResponse;

export type CategoryListItem = {
  id: number;
  name: string;
  slug: string;
  image: ImageFormValues | null;
  recipeCount: number;
};
