import { z } from "zod";

export const carriageSchema = z.object({
  id: z.number(),
  carriageNumber: z.string().nonempty(" name is required."),
  carriageClassId: z.number(),
  carriageClass: z.string().nonempty(" name is required."),
  trainId: z.number()
  
});

export type carriageType = z.infer<typeof carriageSchema>;
