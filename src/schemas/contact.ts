import { z } from "zod";
import { ItemEntity, TimeStampEntity } from "#/entities";

const baseSchema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email("Please enter valid email address"),
  phoneNumber: z
    .string()
    .length(9, "Please enter valid phone number")
    .transform((val) => "+994" + val),
});

export const contactRequestSchema = baseSchema.extend({
  message: z.string().min(1, "Required"),
});

export type ContactRequestType = z.infer<typeof contactRequestSchema>;

export const contactSponsorRequestSchema = baseSchema.extend({
  companyName: z.string().min(1, "Required"),
});

export type ContactSponsorRequestType = z.infer<typeof contactSponsorRequestSchema>;

export const contactResponseSchema = ItemEntity.pick({ id: true })
  .merge(contactRequestSchema.extend({ phoneNumber: z.string() }))
  .merge(TimeStampEntity.pick({ createdAt: true }));

export interface ContactResponseType extends z.infer<typeof contactResponseSchema> {}

export const contactSponsorResponseSchema = ItemEntity.pick({ id: true })
  .merge(contactSponsorRequestSchema.extend({ phoneNumber: z.string() }))
  .merge(TimeStampEntity.pick({ createdAt: true }));

export interface ContactSponsorResponseType extends z.infer<typeof contactSponsorResponseSchema> {}
