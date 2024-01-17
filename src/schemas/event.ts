import { z } from "zod";
import { EventEntity, ItemEntity, PackageEntity } from "#/entities";

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

export const updateEventRequestSchema = createEventRequestSchema
  .partial({ file: true })
  .merge(EventEntity.pick({ id: true }));

export type CreateEventRequestType = z.infer<typeof createEventRequestSchema>;
export type UpdateEventRequestType = z.infer<typeof updateEventRequestSchema>;
