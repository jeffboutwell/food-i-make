import { z } from "zod";
import { SourceSchema } from "./recipe";

export type SourceProps = z.infer<typeof SourceSchema>;
