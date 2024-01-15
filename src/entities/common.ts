import { z } from "zod";

export const StatusEntity = z.object({
  status: z.union([z.literal("PENDING"), z.literal("APPROVED"), z.literal("REJECTED")]),
});

export type Status = z.infer<typeof StatusEntity>;

export const TimeEntity = z.object({
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Time = z.infer<typeof TimeEntity>;

export const ItemEntity = z.object({
  id: z.string(),
  name: z.string(),
});

export type Item = z.infer<typeof ItemEntity>;
