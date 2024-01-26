import { z, ZodType } from "zod";

export const StatusEntity = z.object({
  status: z.union([z.literal("PENDING"), z.literal("APPROVED"), z.literal("REJECTED")]),
});

export interface StatusType extends z.infer<typeof StatusEntity> {}

export const TimeStampEntity = z.object({
  createdAt: z.string(),
  updatedAt: z.string(),
});

export interface TimeStampType extends z.infer<typeof TimeStampEntity> {}

export const ItemEntity = z.object({
  id: z.string().uuid({ message: "Required" }),
  name: z.string().min(1, { message: "Required" }),
});

export interface ItemType extends z.infer<typeof ItemEntity> {}

const meta = z.object({
  page: z.number(),
  pageCount: z.number(),
  itemCount: z.number(),
  take: z.number(),
  hasPreviousPage: z.boolean(),
  hasNextPage: z.boolean(),
});

export const DataMetaEntity = <T extends ZodType>(data: T) =>
  z.object({
    data,
    meta,
  });

export interface DataMetaType<T> {
  data: T;
  meta: z.infer<typeof meta>;
}
