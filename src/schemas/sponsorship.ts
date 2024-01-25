import { z } from "zod";
import { ItemEntity, UserEntity } from "#/entities";
import { eventSponsoredSchema } from "#/schemas/event";

export const createSponsorshipRequestSchema = z.object({
  eventPackageId: ItemEntity.shape.id,
  comments: z.string().min(1, { message: "Required" }),
});

export type CreateSponsorshipRequestType = z.infer<typeof createSponsorshipRequestSchema>;

export const sponsorshipSchema = eventSponsoredSchema.extend({ sponsor: UserEntity });

export interface SponsorshipType extends z.infer<typeof sponsorshipSchema> {}
