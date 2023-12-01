import { tv } from "tailwind-variants";

export const buttonStyles = tv({
  base: "flex items-center justify-center min-w-max overflow-hidden z-0 whitespace-nowrap outline-none cursor-pointer duration-200",
  variants: {
    variant: {
      solid: "bg-opacity-100 text-default-0",
      soft: "bg-opacity-20",
      light: "bg-opacity-0",
      bordered: "bg-opacity-0 border",
      outlined: "bg-opacity-0 border",
      faded: "bg-default-1000 bg-opacity-10 border border-default-1000/10",
    },
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
      sm: "h-8 gap-x-1 px-4 text-xs font-normal [&>svg]:h-4 [&>svg]:w-4",
      md: "h-10 gap-x-1.5 px-5 text-sm font-medium [&>svg]:h-5 [&>svg]:w-5",
      lg: "h-12 gap-x-2 px-6 text-base font-bold [&>svg]:h-6 [&>svg]:w-6",
    },
    radius: {
      sm: "rounded-lg",
      md: "rounded-xl",
      lg: "rounded-2xl",
      none: "rounded-none",
      full: "rounded-full",
    },
    isInGroup: {
      true: "first:rounded-r-none last:rounded-l-none [&:not(:first-child):not(:last-child)]:rounded-none",
    },
    isIconOnly: {
      true: "px-0",
    },
    isDisabled: {
      true: "opacity-50 cursor-not-allowed",
    },
    isHovered: {
      true: "",
    },
    isPressed: {
      true: "scale-95",
    },
    isFocusVisible: {
      true: "outline-2 outline-offset-2 outline-primary-500 z-10",
    },
  },
  compoundVariants: [
    // is in group & variant
    {
      isInGroup: true,
      variant: ["bordered", "outlined"],
      class: "first:border-r last:border-l [&:not(:first-child):not(:last-child)]:border-x",
    },

    // is icon only & size
    {
      isIconOnly: true,
      size: "sm",
      class: "w-8",
    },
    {
      isIconOnly: true,
      size: "md",
      class: "w-10",
    },
    {
      isIconOnly: true,
      size: "lg",
      class: "w-12",
    },

    // variant & color
    // solid & soft & light & bordered & outlined
    {
      variant: ["solid", "soft", "light", "bordered", "outlined"],
      color: "default",
      class: "bg-default-1000",
    },
    {
      variant: ["solid", "soft", "light", "bordered", "outlined"],
      color: "primary",
      class: "bg-primary-500",
    },
    {
      variant: ["solid", "soft", "light", "bordered", "outlined"],
      color: "secondary",
      class: "bg-secondary-500",
    },
    {
      variant: ["solid", "soft", "light", "bordered", "outlined"],
      color: "info",
      class: "bg-added-500",
    },
    {
      variant: ["solid", "soft", "light", "bordered", "outlined"],
      color: "success",
      class: "bg-success-500",
    },
    {
      variant: ["solid", "soft", "light", "bordered", "outlined"],
      color: "warning",
      class: "bg-warning-500",
    },
    {
      variant: ["solid", "soft", "light", "bordered", "outlined"],
      color: "danger",
      class: "bg-danger-500",
    },
    // solid & soft & light & bordered & outlined
    {
      variant: ["soft", "light", "bordered", "outlined", "faded"],
      color: "default",
      class: "text-default-1000",
    },
    {
      variant: ["soft", "light", "bordered", "outlined", "faded"],
      color: "primary",
      class: "text-primary-500",
    },
    {
      variant: ["soft", "light", "bordered", "outlined", "faded"],
      color: "secondary",
      class: "text-secondary-500",
    },
    {
      variant: ["soft", "light", "bordered", "outlined", "faded"],
      color: "info",
      class: "text-added-500",
    },
    {
      variant: ["soft", "light", "bordered", "outlined", "faded"],
      color: "success",
      class: "text-success-500",
    },
    {
      variant: ["soft", "light", "bordered", "outlined", "faded"],
      color: "warning",
      class: "text-warning-500",
    },
    {
      variant: ["soft", "light", "bordered", "outlined", "faded"],
      color: "danger",
      class: "text-danger-500",
    },
    // bordered & outlined
    {
      variant: ["bordered", "outlined"],
      color: "default",
      class: "border-default-1000",
    },
    {
      variant: ["bordered", "outlined"],
      color: "primary",
      class: "border-primary-500",
    },
    {
      variant: ["bordered", "outlined"],
      color: "secondary",
      class: "border-secondary-500",
    },
    {
      variant: ["bordered", "outlined"],
      color: "info",
      class: "border-added-500",
    },
    {
      variant: ["bordered", "outlined"],
      color: "success",
      class: "border-success-500",
    },
    {
      variant: ["bordered", "outlined"],
      color: "warning",
      class: "border-warning-500",
    },
    {
      variant: ["bordered", "outlined"],
      color: "danger",
      class: "border-danger-500",
    },

    // is hovered & variant
    {
      variant: "solid",
      isHovered: true,
      class: "bg-opacity-80",
    },
    {
      variant: "soft",
      isHovered: true,
      class: "bg-opacity-40",
    },
    {
      variant: "light",
      isHovered: true,
      class: "bg-opacity-20",
    },
    {
      variant: "bordered",
      isHovered: true,
      class: "bg-opacity-20",
    },
    {
      variant: "outlined",
      isHovered: true,
      class: "bg-opacity-100 text-default-0",
    },
    {
      variant: "faded",
      isHovered: true,
      class: "bg-opacity-5",
    },
  ],
});

export const buttonGroupStyles = tv({
  base: "grid grid-flow-col",
});
