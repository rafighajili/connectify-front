import { z } from "zod";
import { ItemEntity, StatusEntity, TimeStampEntity } from "./common";
import { PackageEntity } from "./package";
import { UserEntity } from "./user";

export const EventEntity = ItemEntity.extend({
  description: z.string().min(1, { message: "Required" }),
  date: z.string().min(1, { message: "Required" }),
  venue: z.string().min(1, { message: "Required" }),
  size: z.coerce.number().int().min(1, { message: "Minimum size is 1" }),
  imageUrl: z.string().url(),
  type: ItemEntity,
  categories: ItemEntity.array().nonempty({ message: "Required" }),
  packages: PackageEntity.array().nonempty({ message: "Required" }),
  organizer: UserEntity,
}).merge(StatusEntity.merge(TimeStampEntity));

export type EventType = z.infer<typeof EventEntity>;
