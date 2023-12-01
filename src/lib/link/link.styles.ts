import { tv } from "tailwind-variants";

export const linkStyles = tv({
  base: "text-secondary-500 outline-none duration-200",
  variants: {
    isDisabled: {
      true: "opacity-50 cursor-not-allowed",
    },
    isHovered: {
      true: "underline decoration-solid",
    },
    isPressed: {
      true: "text-secondary-600",
    },
    isFocusVisible: {
      true: "underline decoration-double",
    },
  },
});
