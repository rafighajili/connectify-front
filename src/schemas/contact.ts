import { z } from "zod";
import { ItemEntity } from "#/entities";

const baseContactResponseSchema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email("Please enter valid email address"),
  phoneNumber: z
    .string()
    .length(9, "Please enter valid phone number")
    .transform((val) => "+994" + val),
});

export const contactRequestSchema = baseContactResponseSchema.extend({
  message: z.string().min(1, "Required"),
});

export type ContactRequestType = z.infer<typeof contactRequestSchema>;

export const contactSponsorRequestSchema = baseContactResponseSchema.extend({
  companyName: z.string().min(1, "Required"),
});

export type ContactSponsorRequestType = z.infer<typeof contactSponsorRequestSchema>;

export const contactResponseSchema = ItemEntity.pick({ id: true }).merge(contactRequestSchema);

export type ContactResponseType = z.infer<typeof contactResponseSchema>;

export const contactSponsorResponseSchema = ItemEntity.pick({ id: true }).merge(contactSponsorRequestSchema);

export type ContactSponsorResponseType = z.infer<typeof contactSponsorResponseSchema>;
