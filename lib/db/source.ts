import { z } from "zod";

export const SourceSchema = z.object({
  name: z.string(),
  url: z.string().url(),
});

export type SourceSchema = z.infer<typeof SourceSchema>;
