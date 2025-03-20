import { z } from "zod";

export const passengerSchema = z.object({
  id: z.number(),
    fullName: z.string().nonempty(" Passenger number is required."),
    passengerTypeId: z.number(),
    identityCardNumber: z.string().nonempty("Passenger class is required."),
    passengerTypeName: z.string().nonempty("Passenger class is required."),
    discountPercentage: z.number({
        required_error: "Discount percentage is required.",
        invalid_type_error: "Discount percentage must be a number.",
    })
        .min(0, "Discount percentage cannot be less than 0.") // Giá trị tối thiểu là 0
        .max(100, "Discount percentage cannot exceed 100."), // Giá trị tối đa là 100
  
});

export type carriageType = z.infer<typeof passengerSchema>;
