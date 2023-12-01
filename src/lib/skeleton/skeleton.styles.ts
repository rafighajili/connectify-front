import { tv } from "tailwind-variants";

export const skeletonStyles = tv({
  base: "bg-default-1000/10 animate-pulse",
  variants: {
    disableAnimation: {
      true: "animate-none",
    },
  },
});
