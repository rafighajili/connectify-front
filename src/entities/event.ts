import { z } from "zod";
import { UserEntity } from "#/entities/user";

export const EventEntity = z.object({
  id: z.number(),
  organizer: UserEntity,
  eventStatus: z.union([z.literal("APPROVED"), z.literal("PENDING")]),
  s3Key: z.string(),

  eventTitle: z.string(),
  eventType: z.string(),
  eventStartDate: z.string(),
  eventEndDate: z.string(),
  eventVenueAddress: z.string(),
  eventDescription: z.string(),
  estimatedCrowdSize: z.string(),
  cashSponsorshipNeeded: z.string(),
  committeeSize: z.coerce.number({ invalid_type_error: "Required" }),
  clubName: z.string(),
});

export type Event = z.infer<typeof EventEntity>;
