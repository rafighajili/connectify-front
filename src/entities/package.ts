import { z } from "zod";
import { ItemEntity } from "./common";

export const PackageEntity = ItemEntity.pick({ id: true }).merge(
  z.object({
    name: z.union([z.literal("BRONZE"), z.literal("SILVER"), z.literal("GOLD"), z.literal("DIAMOND")]),
    price: z.number(),
    features: ItemEntity.array(),
  }),
);

export type PackageType = z.infer<typeof PackageEntity>;
