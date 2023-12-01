import { tv } from "tailwind-variants";

export const listContainerStyles = tv({
  base: "flex flex-col w-full outline-none",
  variants: {
    size: {
      sm: "py-1.5",
      md: "py-2",
      lg: "py-2.5",
    },
  },
});

export const listSectionStyles = tv({
  base: "font-bold",
  variants: {
    color: {
      default: "text-default-1000",
      primary: "text-primary-500",
      secondary: "text-secondary-500",
      info: "text-added-500",
      success: "text-success-500",
      warning: "text-warning-500",
      danger: "text-danger-500",
    },
    size: {
      sm: "px-3 pt-1.5 text-sm [&>svg]:h-4 [&>svg]:w-4",
      md: "px-4 pt-2 text-base [&>svg]:h-5 [&>svg]:w-5",
      lg: "px-5 pt-2.5 text-lg [&>svg]:h-6 [&>svg]:w-6",
    },
  },
});

export const listItemStyles = tv({
  base: "flex items-center bg-opacity-0 cursor-pointer outline-none",
  variants: {
    color: {
      default: "",
      primary: "",
      secondary: "",
      info: "",
      success: "",
      warning: "",
      danger: "",
    },
    size: {
      sm: "h-8 space-x-1 pl-3 text-sm [&>svg]:h-4 [&>svg]:w-4",
      md: "h-10 space-x-2 pl-4 text-base [&>svg]:h-5 [&>svg]:w-5",
      lg: "h-12 space-x-3 pl-5 text-lg [&>svg]:h-6 [&>svg]:w-6",
    },
    isDisabled: {
      true: "opacity-50 cursor-not-allowed",
    },
    isFocusVisible: {
      true: "relative bg-opacity-10 before:absolute before:w-0.5 before:inset-y-0 before:left-0 before:z-10",
    },
    isHovered: {
      true: "bg-opacity-20",
    },
    isPressed: {
      true: "bg-opacity-40",
    },
    isSelected: {
      true: "",
    },
  },
  compoundVariants: [
    {
      color: "default",
      class: "bg-default-1000 text-default-1000 before:bg-default-1000",
    },
    {
      color: "primary",
      class: "bg-primary-500 text-primary-500 before:bg-primary-500",
    },
    {
      color: "secondary",
      class: "bg-secondary-500 text-secondary-500 before:bg-secondary-500",
    },
    {
      color: "info",
      class: "bg-added-500 text-added-500 before:bg-added-500",
    },
    {
      color: "success",
      class: "bg-success-500 text-success-500 before:bg-success-500",
    },
    {
      color: "warning",
      class: "bg-warning-500 text-warning-500 before:bg-warning-500",
    },
    {
      color: "danger",
      class: "bg-danger-500 text-danger-500 before:bg-danger-500",
    },

    {
      isSelected: false,
      size: "sm",
      class: "pr-8",
    },
    {
      isSelected: false,
      size: "md",
      class: "pr-11",
    },
    {
      isSelected: false,
      size: "lg",
      class: "pr-14",
    },
    {
      isSelected: true,
      size: "sm",
      class: "pr-3",
    },
    {
      isSelected: true,
      size: "md",
      class: "pr-4",
    },
    {
      isSelected: true,
      size: "lg",
      class: "pr-5",
    },
  ],
});
