import { z } from "zod";
import { EventEntity, ItemEntity, PackageEntity, StatusEntity, TimeStampEntity } from "#/entities";

export const eventCompactSchema = EventEntity.omit({ packages: true });

export interface EventCompactType extends z.infer<typeof eventCompactSchema> {}

export const eventSponsoredSchema = ItemEntity.pick({ id: true })
  .extend({
    eventPackage: PackageEntity.extend({ event: eventCompactSchema }),
    comments: z.string(),
  })
  .merge(TimeStampEntity.pick({ createdAt: true }))
  .merge(StatusEntity);

export interface EventSponsoredType extends z.infer<typeof eventSponsoredSchema> {}

export const createEventRequestSchema = eventCompactSchema
  .omit({
    id: true,
    imageUrl: true,
    status: true,
    createdAt: true,
    updatedAt: true,
    type: true,
    categories: true,
  })
  .extend({
    type: ItemEntity.pick({ id: true }),
    categories: ItemEntity.pick({ id: true }).array().nonempty({ message: "Required" }),
    packages: PackageEntity.omit({ id: true, features: true })
      .extend({ features: ItemEntity.pick({ name: true }).array().nonempty({ message: "Required" }) })
      .array()
      .nonempty({ message: "Required" }),
    file: z.custom<File>((v) => v instanceof File, {
      message: "Required",
    }),
  });

export interface CreateEventRequestType extends z.infer<typeof createEventRequestSchema> {}

export const updateEventRequestSchema = ItemEntity.pick({ id: true }).merge(
  createEventRequestSchema.partial({ file: true }),
);

export interface UpdateEventRequestType extends z.infer<typeof updateEventRequestSchema> {}
