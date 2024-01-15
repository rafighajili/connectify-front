import { z } from "zod";

export const UserEntity = z.object({
  id: z.string(),
  role: z.union([z.literal("ADMIN"), z.literal("SPONSOR"), z.literal("ORGANIZER")]),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
});

export type User = z.infer<typeof UserEntity>;
