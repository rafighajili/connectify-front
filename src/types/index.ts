import { CSSProperties, ReactNode } from "react";

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
