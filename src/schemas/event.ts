import { z } from "zod";
import { EventEntity } from "#/entities";

export const createEventRequestSchema = EventEntity.omit({
  id: true,
  organizer: true,
  status: true,
  imageUrl: true,
  createdAt: true,
  updatedAt: true,
}).merge(
  z.object({
    file: z.custom<File>((v) => v instanceof File, {
      message: "Required",
    }),
  }),
);

export const updateEventRequestSchema = createEventRequestSchema.merge(EventEntity.pick({ id: true }));

export type CreateEventRequest = z.infer<typeof createEventRequestSchema>;
export type UpdateEventRequest = z.infer<typeof updateEventRequestSchema>;
