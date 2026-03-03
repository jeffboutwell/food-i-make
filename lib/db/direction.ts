import { z } from "zod";

export const DirectionUpdateSchema = z.object({
  value: z.string(),
});

export type DirectionUpdateSchema = z.infer<typeof DirectionUpdateSchema>;
