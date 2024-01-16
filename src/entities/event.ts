import { z } from "zod";
import { ItemEntity, StatusEntity, TimeEntity } from "./common";
import { PackageEntity } from "./package";
import { UserEntity } from "./user";

export const EventEntity = ItemEntity.merge(
  z
    .object({
      description: z.string(),
      date: z.string(),
      venue: z.string(),
      size: z.coerce.number(),
      imageUrl: z.string(),
      categories: ItemEntity.array(),
      type: ItemEntity,
      packages: PackageEntity.array(),
      organizer: UserEntity,
    })
    .merge(StatusEntity)
    .merge(TimeEntity),
);

export type EventType = z.infer<typeof EventEntity>;
