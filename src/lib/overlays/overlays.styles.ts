import { tv } from "tailwind-variants";

export const modalStyles = tv({
  slots: {
    wrapper: "grid place-items-center overflow-y-auto py-8 px-4 lg:py-16 lg:px-8",
    self: "w-full flex flex-col items-center gap-y-4",
    icon: "h-16 w-16",
    card: "relative w-full",
    dismiss: "absolute top-2 right-2",
  },
  variants: {
    size: {
      sm: { self: "max-w-3xl" },
      md: { self: "max-w-4xl" },
      lg: { self: "max-w-5xl" },
      full: { self: "max-w-full" },
    },
  },
});

export const popoverStyles = tv({
  base: "relative overflow-hidden",
  variants: {
    size: {
      sm: "max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg",
      md: "max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl",
      lg: "max-w-md sm:max-w-lg md:max-w-xs lg:max-w-2xl",
      full: "max-w-full",
    },
  },
});

export const underlayStyles = tv({
  base: "fixed inset-0 z-[999] bg-default-0",
  variants: {
    backdrop: {
      opaque: "bg-opacity-50",
      blur: "bg-opacity-25 backdrop-blur-sm",
      transparent: "bg-opacity-0",
    },
  },
});
