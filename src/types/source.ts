import { z } from "zod";
import { SourceSchema } from "@/schemas";

export type SourceProps = z.infer<typeof SourceSchema>;
