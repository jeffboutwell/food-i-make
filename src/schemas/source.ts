import { z } from "zod";

export const SourceSchema = z.object({
  name: z.string().optional(),
  url: z.union([z.string().url(), z.literal("")]).optional(),
});
