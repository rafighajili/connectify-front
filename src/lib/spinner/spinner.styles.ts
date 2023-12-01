import { tv } from "tailwind-variants";

export const spinnerStyles = tv({
  base: "inline-block animate-spin rounded-full border border-b-transparent border-r-transparent",
  variants: {
    color: {
      current: "border-l-current border-t-current",
      default: "border-l-default-1000 border-t-default-1000",
      primary: "border-l-primary-500 border-t-primary-500",
      secondary: "border-l-secondary-500 border-t-secondary-500",
      info: "border-l-added-500 border-t-added-500",
      success: "border-l-success-500 border-t-success-500",
      warning: "border-l-warning-500 border-t-warning-500",
      danger: "border-l-danger-500 border-t-danger-500",
    },
    size: {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
    },
  },
});
