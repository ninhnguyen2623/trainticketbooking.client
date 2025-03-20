import { z } from "zod";

export const provinceSchema = z.object({
  id: z.number(),
  name: z.string().nonempty("Province name is required."),
  nameEn: z.string().nonempty("Province name en is required."),
  fullName: z.string().nonempty("Province full name is required."),
  fullNameEn: z.string().nonempty("Province full name en is required."),
  codeName: z.string().nonempty("Province code name is required.")
  
});

export type provinceType = z.infer<typeof provinceSchema>;
