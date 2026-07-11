import { z } from "zod";

import { UploadResponse } from "@imagekit/next";

export const ImageSchema = z.object({
  fileId: z.string(),
  name: z.string(),
  size: z.number(),
  versionInfo: z.object({
    id: z.string(),
    name: z.string(),
  }),
  filePath: z.string(),
  url: z.url(),
  fileType: z.string(),
  height: z.number(),
  width: z.number(),
  thumbnailUrl: z.url(),
  AITags: z.array(z.string()).nullable(),
  description: z.string().nullable(),
});

export type ImageFormValues = z.infer<typeof ImageSchema>;

export type ImageResponse = UploadResponse;
