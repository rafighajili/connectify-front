import { z } from "zod";

export const EventEntity = z.object({
  id: z.number(),
  eventTitle: z.string(),
  eventStatus: z.union([z.literal("APPROVED"), z.literal("PENDING")]),
  eventType: z.string(),
  eventStartDate: z.string(),
  eventEndDate: z.string(),
  eventVenueAddress: z.string(),
  eventDescription: z.string(),
  estimatedCrowdSize: z.string(),
  cashSponsorshipNeeded: z.string(),
  committeeSize: z.number(),
  contactPersonName: z.string(),
  contactPersonEmail: z.string(),
  contactPersonPhoneNumber: z.string(),
  clubName: z.string(),
  s3Key: z.string(),
});

export type Event = z.infer<typeof EventEntity>;
