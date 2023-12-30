import { z } from "zod";

export const UserEntity = z.object({
  userId: z.number(),
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  role: z.union([z.literal("ADMIN"), z.literal("SPONSOR"), z.literal("ORGANIZER")]),
});

export type User = z.infer<typeof UserEntity>;
