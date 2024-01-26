import { z } from "zod";
import { ItemEntity, StatusEntity, TimeStampEntity } from "./common";
import { PackageEntity } from "./package";
import { UserEntity } from "./user";

export const EventEntity = ItemEntity.extend({
  description: z.string().min(1, { message: "Required" }),
  date: z.string().min(1, { message: "Required" }),
  venue: z.string().min(1, { message: "Required" }),
  size: z.coerce.number().int().positive({ message: "Size have to be positive" }),
  imageUrl: z.string().url(),
  type: ItemEntity,
  categories: ItemEntity.array().nonempty({ message: "Required" }),
  organizer: UserEntity.optional(),
  packages: PackageEntity.array()
    .nonempty({ message: "Required" })
    .transform((arr) => {
      const order = {
        BRONZE: 0,
        SILVER: 1,
        GOLD: 2,
        DIAMOND: 3,
      };

      return arr.sort((a, b) => order[a.name] - order[b.name]);
    }),
}).merge(StatusEntity.merge(TimeStampEntity));

export interface EventType extends z.infer<typeof EventEntity> {}
