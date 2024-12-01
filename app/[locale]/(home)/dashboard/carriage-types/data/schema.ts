import { z } from "zod";

export const carriageClassSchema = z.object({
  id: z.number(),
  name: z.string().nonempty(" name is required.")
  
});

export type carriageClassType = z.infer<typeof carriageClassSchema>;
