import { z } from "zod";

export const seatTypeSchema = z.object({
  id: z.number(),
  type: z.string().nonempty("SeatType name is required."),
  code: z.string().nonempty("SeatType name en is required."),
  description: z.string().nonempty("SeatType full name is required."),
  name: z.string().nonempty("SeatType full name en is required."),
});

export type seatType = z.infer<typeof seatTypeSchema>;
