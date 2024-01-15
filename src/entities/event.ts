import { z } from "zod";
import { ItemEntity, StatusEntity, TimeEntity } from "#/entities";

export const EventEntity = ItemEntity.merge(
  z.object({
    description: z.string(),
    date: z.string(),
    venue: z.string(),
    size: z.string(),
    imageUrl: z.string(),
    categories: ItemEntity.array(),
    type: ItemEntity,
    // packages: PackageEntity.array(),
    // organizer: UserEntity,
  }),
)
  .merge(StatusEntity)
  .merge(TimeEntity);

export type Event = z.infer<typeof EventEntity>;
