import { z } from "zod";
import { ItemEntity } from "#/entities";

export const createSponsorshipRequestSchema = z.object({
  eventPackageId: ItemEntity.shape.id,
  comments: z.string().min(1, { message: "Required" }),
});

export type CreateSponsorshipRequestType = z.infer<typeof createSponsorshipRequestSchema>;
