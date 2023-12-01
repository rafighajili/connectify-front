import { tv } from "tailwind-variants";

export const dividerStyles = tv({
  base: "bg-default-1000/20 border-none rounded-full",
  variants: {
    orientation: {
      horizontal: "w-full",
      vertical: "h-full",
    },
    size: {
      sm: "",
      md: "",
      lg: "",
    },
  },
  compoundVariants: [
    //  horizontal
    {
      orientation: "horizontal",
      size: "sm",
      class: "h-px",
    },
    {
      orientation: "horizontal",
      size: "md",
      class: "h-0.5",
    },
    {
      orientation: "horizontal",
      size: "lg",
      class: "h-1",
    },

    //  vertical
    {
      orientation: "vertical",
      size: "sm",
      class: "w-px",
    },
    {
      orientation: "vertical",
      size: "md",
      class: "w-0.5",
    },
    {
      orientation: "vertical",
      size: "lg",
      class: "w-1",
    },
  ],
});
