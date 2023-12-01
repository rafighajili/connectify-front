import { tv } from "tailwind-variants";

export const tagsStyles = tv({
  base: "flex flex-wrap",
  variants: {
    size: {
      sm: "gap-2",
      md: "gap-2.5",
      lg: "gap-3",
    },
    align: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
    },
  },
});

export const tagsActionButtonStyles = tv({
  base: "rounded-md",
  variants: {
    size: {
      sm: "h-6 px-2 text-xs",
      md: "h-7 px-2.5 text-sm",
      lg: "h-8 px-3 text-base",
    },
  },
});

export const tagStyles = tv({
  base: "relative flex items-center bg-default-1000 text-default-1000 bg-opacity-10 rounded-md outline-none duration-200",
  variants: {
    size: {
      sm: "h-6 px-2 text-xs",
      md: "h-7 px-2.5 text-sm",
      lg: "h-8 px-3 text-base",
    },
    isDisabled: {
      true: "opacity-50 cursor-not-allowed",
    },
    isHovered: {
      true: "bg-opacity-20 cursor-default",
    },
    isPressed: {
      true: "scale-95",
    },
    isSelected: {
      true: "bg-opacity-100 text-default-0",
    },
    isFocusVisible: {
      true: "outline-1 outline-offset-1 outline-default-1000",
    },
  },
  compoundVariants: [
    {
      isSelected: true,
      isHovered: true,
      class: "bg-opacity-80",
    },
  ],
});

export const tagButtonStyles = tv({
  base: "rounded-full bg-default-0 text-default-1000 p-0.5 absolute outline-none duration-200",
  variants: {
    size: {
      sm: "h-4 w-4 -top-2 -right-2",
      md: "h-4 w-4 -top-2 -right-2",
      lg: "h-5 w-5 -top-2.5 -right-2.5",
    },
    isHovered: {
      true: "scale-125",
    },
    isPressed: {
      true: "scale-100",
    },
  },
});

export const tagSkeletonStyles = tv({
  base: "rounded-md",
  variants: {
    size: {
      sm: "h-6 w-16",
      md: "h-7 w-20",
      lg: "h-8 w-24",
    },
  },
});
