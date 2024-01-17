import { z } from "zod";

export const StatusEntity = z.object({
  status: z.union([z.literal("PENDING"), z.literal("APPROVED"), z.literal("REJECTED")]),
});

export type StatusType = z.infer<typeof StatusEntity>;

export const TimeEntity = z.object({
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type TimeType = z.infer<typeof TimeEntity>;

export const ItemEntity = z.object({
  id: z.string().uuid({ message: "Required" }),
  name: z.string().min(1, { message: "Required" }),
});

export type ItemType = z.infer<typeof ItemEntity>;
