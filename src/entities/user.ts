import { z } from "zod";

export const UserEntity = z.object({
  id: z.number(),
  userRole: z.union([z.literal("SPONSOR"), z.literal("ORGANIZER")]),
  email: z.string().email(),
  firstname: z.string(),
  lastname: z.string(),
});

export type User = z.infer<typeof UserEntity>;
