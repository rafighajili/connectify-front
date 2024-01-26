import { z } from "zod";
import { ItemEntity } from "./common";

export const PackageEntity = ItemEntity.pick({ id: true }).extend({
  name: z.union([z.literal("BRONZE"), z.literal("SILVER"), z.literal("GOLD"), z.literal("DIAMOND")]),
  price: z.coerce.number().min(0, { message: "Minimum price is 0" }),
  features: ItemEntity.array(),
});

export interface PackageType extends z.infer<typeof PackageEntity> {}
