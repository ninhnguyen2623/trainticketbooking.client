import { z } from "zod";

export const trainSchema = z.object({
  id: z.number(),
  name: z.string(),
  trainType: z.string()
});

export type TrainType = z.infer<typeof trainSchema>;
