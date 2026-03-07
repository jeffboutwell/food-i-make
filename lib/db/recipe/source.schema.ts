import { z } from "zod";
import { SourceSchema } from "./recipe.schemas";

export type SourceProps = z.infer<typeof SourceSchema>;
