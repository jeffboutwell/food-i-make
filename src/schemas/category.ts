import { z } from "zod";

export const CategoryFormSchema = z.object({
  id: z.string(),
  text: z.string(),
});
