import { z } from "zod";

// Single direction item
export const DirectionSchema = z
  .string()
  .trim()
  .min(1, "Direction is required");

// Form
export const DirectionsFormSchema = z.array(DirectionSchema);

export type DirectionsFormValues = z.infer<typeof DirectionsFormSchema>;
