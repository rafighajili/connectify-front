import { z } from "zod";

export const StatusEntity = z.object({
  status: z.union([z.literal("PENDING"), z.literal("APPROVED"), z.literal("REJECTED")]),
});

export const TimeStampEntity = z.object({
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const ItemEntity = z.object({
  id: z.string().uuid({ message: "Required" }),
  name: z.string().min(1, { message: "Required" }),
});

export type StatusType = z.infer<typeof StatusEntity>;
export type TimeStampType = z.infer<typeof TimeStampEntity>;
export type ItemType = z.infer<typeof ItemEntity>;
