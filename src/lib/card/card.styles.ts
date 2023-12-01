import { tv } from "tailwind-variants";

export const cardStyles = tv({
  base: "block border border-default-200 text-default-1000 outline-none duration-200",
  variants: {
    radius: {
      sm: "rounded-lg",
      md: "rounded-xl",
      lg: "rounded-2xl",
      full: "rounded-full",
      none: "rounded-none",
    },
    isContrasted: {
      true: "bg-default-0",
      false: "bg-default-100",
    },
    isHovered: {
      true: "border-default-500",
    },
    isPressed: {
      true: "scale-95",
    },
    isFocusVisible: {
      true: "outline-2 outline-offset-2 outline-default-1000",
    },
  },
});
