import { z } from "zod";
import { ReactNode } from "react";

export const IngredientProps = z.object({
  id: z.string(),
  name: z.string(),
  amt: z.string(),
  unit: z.string(),
});
export type IngredientProps = z.infer<typeof IngredientProps>;

export const IngredientSectionProps = z.object({
  name: z.string(),
  ingList: z.array(IngredientProps),
});
export type IngredientSectionProps = z.infer<typeof IngredientSectionProps>;

export const SourceProps = z.object({
  name: z.string(),
  url: z.string(),
});
export type SourceProps = z.infer<typeof SourceProps>;

export type SectionSchema = {
  child1: ReactNode;
  child2?: ReactNode;
  layout?: "full" | "1-1" | "2-1";
  className?: string;
};
