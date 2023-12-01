import { z } from "zod";

export const UserEntity = z
  .object({
    id: z.number(),
    username: z.string(),
    avatar: z.string().nullable(),
    is_subscribed: z.boolean().optional(),
    credit: z.number().optional(),
    viewed_products: z.number().array().optional(),
  })
  .transform((val) => ({ ...val, is_new: val.credit === 7 }));

export type User = z.infer<typeof UserEntity>;
