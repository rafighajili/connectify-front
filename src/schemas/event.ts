import { z } from "zod";
import { EventEntity } from "#/entities";

export const createEventRequestSchema = EventEntity.omit({
  id: true,
  organizer: true,
  status: true,
  imageUrl: true,
  type: true,
  categories: true,
  createdAt: true,
  updatedAt: true,
}).merge(
  z.object({
    typeId: z.string(),
    categories: z.string(),
    file: z.custom<File>((v) => v instanceof File, {
      message: "Required",
    }),
  }),
);
// .transform((values) => ({ ...values, categories: values.categories.split(",") }));

export const updateEventRequestSchema = createEventRequestSchema.merge(EventEntity.pick({ id: true }));

export type CreateEventRequest = z.infer<typeof createEventRequestSchema>;
export type UpdateEventRequest = z.infer<typeof updateEventRequestSchema>;
