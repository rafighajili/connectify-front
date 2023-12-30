import { z } from "zod";

export const loginRequestSchema = z.object({
  email: z.string().email("Please enter valid email address"),
  password: z.string().min(6, "Password must contain at least 6 characters"),
});

export const registerRequestSchema = z
  .object({
    firstname: z.string().min(3, "Name must be at least 3 characters"),
    lastname: z.string().min(3, "Surname must be at least 3 characters"),
  })
  .merge(loginRequestSchema);

export const verifyRequestSchema = z.object({
  email: z.string().email().optional(),
  verificationCode: z.string().length(6, "Verification code must be 6 characters"),
});

export type LoginRequest = z.infer<typeof loginRequestSchema>;
export type RegisterRequest = z.infer<typeof registerRequestSchema>;
export type VerifyRequest = z.infer<typeof verifyRequestSchema>;
