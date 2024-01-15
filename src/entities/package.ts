import { z } from "zod";
import { ItemEntity } from "#/entities/common";

export const PackageEntity = z.object({
  id: z.string(),
  name: z.union([z.literal("BRONZE"), z.literal("SILVER"), z.literal("GOLD"), z.literal("DIAMOND")]),
  price: z.number(),
  features: ItemEntity.array(),
});

export type Package = z.infer<typeof PackageEntity>;
