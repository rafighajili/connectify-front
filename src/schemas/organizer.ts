import { z } from "zod";
import { EventEntity } from "#/entities";

export const createEventRequestSchema = EventEntity.omit({
  id: true,
  organizer: true,
  eventStatus: true,
  s3Key: true,
}).merge(
  z.object({
    eventImage: z.custom<File>((v) => v instanceof File, {
      message: "Required",
    }),
  }),
);

export const updateEventRequestSchema = createEventRequestSchema.omit({ eventImage: true });

export type CreateEventRequest = z.infer<typeof createEventRequestSchema>;
export type UpdateEventRequest = z.infer<typeof updateEventRequestSchema>;
