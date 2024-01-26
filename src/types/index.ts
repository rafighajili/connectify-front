import { CSSProperties, ReactNode } from "react";
import { ItemType } from "#/entities";

export type Children = { children?: ReactNode };

export type StyleProps = { className?: string; style?: CSSProperties };

export type ConditionalLoading<T extends {}> =
  | ({
      isLoading: true;
    } & Partial<{
      [K in keyof T]: never;
    }>)
  | ({
      isLoading?: false;
    } & T);

export type PageParamsType = Partial<{ page: number }>;

export type EventParamsType = PageParamsType & Partial<{ type: ItemType["id"]; categories: ItemType["id"][] }>;
