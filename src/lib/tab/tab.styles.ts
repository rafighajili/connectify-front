import { tv } from "tailwind-variants";

export const tabsStyles = tv({
  base: "flex flex-col",
  variants: {},
});

export const tabListStyles = tv({
  base: "grid grid-flow-col gap-x-2 bg-default-1000/10",
  variants: {
    radius: {
      sm: "rounded-lg",
      md: "rounded-xl",
      lg: "rounded-2xl",
      none: "rounded-none",
      full: "rounded-full",
    },
    size: {
      sm: "",
      md: "",
      lg: "",
    },
    fullWidth: {
      true: "w-full",
      false: "w-fit",
    },
    isDisabled: {
      true: "opacity-50 cursor-not-allowed",
    },
  },
});

export const tabStyles = tv({
  base: "flex items-center justify-center min-w-max border overflow-hidden z-0 whitespace-nowrap outline-none cursor-pointer duration-200",
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
      sm: "h-8 gap-x-1.5 px-3 text-xs font-normal [&>svg]:h-4",
      md: "h-10 gap-x-2 px-4 text-sm font-medium [&>svg]:h-5",
      lg: "h-12 gap-x-2.5 px-5 text-base font-bold [&>svg]:h-6",
    },
    radius: {
      sm: "rounded-lg",
      md: "rounded-xl",
      lg: "rounded-2xl",
      none: "rounded-none",
      full: "rounded-full",
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
    isSelected: {
      true: "border-default-1000/20 bg-default-0",
      false: "border-transparent text-default-500",
    },
    isFocusVisible: {
      true: "outline-2 outline-offset-2 outline-primary-500 z-10",
    },
  },
  compoundVariants: [
    {
      color: "default",
      isSelected: true,
      class: "text-default-1000",
    },
    {
      color: "primary",
      isSelected: true,
      class: "text-primary-500",
    },
    {
      color: "secondary",
      isSelected: true,
      class: "text-secondary-500",
    },
    {
      color: "info",
      isSelected: true,
      class: "text-added-500",
    },
    {
      color: "success",
      isSelected: true,
      class: "text-success-500",
    },
    {
      color: "warning",
      isSelected: true,
      class: "text-warning-500",
    },
    {
      color: "danger",
      isSelected: true,
      class: "text-danger-500",
    },

    {
      isSelected: true,
      isHovered: true,
      class: "border-default-1000/40",
    },
    {
      isSelected: false,
      isHovered: true,
      class: "text-default-1000 bg-default-1000/10",
    },
  ],
});

export const tabPanelStyles = tv({
  base: "p-2 outline-none",
  variants: {
    isFocusVisible: {
      true: "outline-primary-500",
    },
  },
});
