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

export type CreateEventRequest = z.infer<typeof createEventRequestSchema>;
