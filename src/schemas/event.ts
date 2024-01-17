import { z } from "zod";
import { EventEntity, ItemEntity, PackageEntity, StatusEntity } from "#/entities";

export const eventCompactSchema = EventEntity.omit({ packages: true });

export type EventCompactType = z.infer<typeof eventCompactSchema>;

export const eventSponsoredSchema = ItemEntity.pick({ id: true })
  .extend({
    eventPackage: PackageEntity.extend({ event: eventCompactSchema }),
    comments: z.string(),
  })
  .merge(StatusEntity);

export type EventSponsoredType = z.infer<typeof eventSponsoredSchema>;

export const createEventRequestSchema = EventEntity.omit({
  id: true,
  imageUrl: true,
  organizer: true,
  status: true,
  createdAt: true,
  updatedAt: true,
  type: true,
  categories: true,
  packages: true,
}).extend({
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

export type CreateEventRequestType = z.infer<typeof createEventRequestSchema>;

export const updateEventRequestSchema = ItemEntity.pick({ id: true }).merge(
  createEventRequestSchema.partial({ file: true }),
);

export type UpdateEventRequestType = z.infer<typeof updateEventRequestSchema>;
