import { z } from "zod";
import { UserEntity } from "#/entities";

export const loginRequestSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(7, "Password must be at least 7 characters"),
});

export const registerRequestSchema = z.object({
  username: z.string().min(3, "Username must be at least 7 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(7, "Password must be at least 7 characters"),
});

export const authResponseSchema = z.object({
  user: UserEntity,
  access_token: z.string(),
});

export type LoginRequest = z.infer<typeof loginRequestSchema>;
export type RegisterRequest = z.infer<typeof registerRequestSchema>;
export type AuthResponse = z.infer<typeof authResponseSchema>;
