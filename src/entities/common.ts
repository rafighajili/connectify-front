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

export const MetaEntity = z.object({
  meta: z.object({
    page: z.number(),
    pageCount: z.number(),
    itemCount: z.number(),
    take: z.number(),
    hasPreviousPage: z.boolean(),
    hasNextPage: z.boolean(),
  }),
});

export interface MetaType extends z.infer<typeof MetaEntity> {}

export const DataMetaEntity = <T extends ZodType>(data: T) =>
  z
    .object({
      data,
    })
    .merge(MetaEntity);

export interface DataMetaType<T> extends MetaType {
  data: T;
}
