export type ConditionalLoadingType<T extends {}> =
  | ({
      isLoading: true;
    } & Partial<{
      [K in keyof T]: never;
    }>)
  | ({
      isLoading?: false;
    } & T);
