import { z } from "zod";
import { ReactNode } from "react";
import { SourceSchema } from "./db/recipe/recipe.schemas";

export type SourceProps = z.infer<typeof SourceSchema>;

export type SectionSchema = {
  child1: ReactNode;
  child2?: ReactNode;
  layout?: "full" | "1-1" | "2-1";
  className?: string;
};
