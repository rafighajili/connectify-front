import { z } from "zod";

export const loginRequestSchema = z.object({
  email: z.string().email("Please enter valid email address"),
  password: z.string().min(6, "Password must contain at least 6 characters"),
});

export interface LoginRequestType extends z.infer<typeof loginRequestSchema> {}

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

export interface RegisterRequestType extends z.infer<typeof registerRequestSchema> {}

export const updateUserInfoRequestSchema = registerRequestSchema.omit({ password: true }).extend({
  file: z.custom<File>((v) => v instanceof File || {}),
});

export interface UpdateUserInfoRequestType extends z.infer<typeof updateUserInfoRequestSchema> {}

export const updateUserPasswordRequestSchema = z.object({
  oldPassword: registerRequestSchema.shape.password,
  newPassword: registerRequestSchema.shape.password,
});

export interface UpdateUserPasswordRequestType extends z.infer<typeof updateUserPasswordRequestSchema> {}
