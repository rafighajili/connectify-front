import { z } from "zod";

export const UserEntity = z.object({
  userId: z.number(),
  email: z.string().email(),
  firstname: z.string(),
  lastname: z.string(),
  role: z.union([z.literal("ADMIN"), z.literal("SPONSOR"), z.literal("ORGANIZER")]),
});

export type User = z.infer<typeof UserEntity>;
