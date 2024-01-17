import { z } from "zod";

export const loginRequestSchema = z.object({
  email: z.string().email("Please enter valid email address"),
  password: z.string().min(6, "Password must contain at least 6 characters"),
});

export type LoginRequestType = z.infer<typeof loginRequestSchema>;

export const registerRequestSchema = z
  .object({
    firstName: z.string().min(3, "Name must be at least 3 characters"),
    lastName: z.string().min(3, "Surname must be at least 3 characters"),
    phoneNumber: z
      .string()
      .length(9, "Please enter valid phone number")
      .transform((val) => "+994" + val),
  })
  .merge(loginRequestSchema);

export type RegisterRequestType = z.infer<typeof registerRequestSchema>;
