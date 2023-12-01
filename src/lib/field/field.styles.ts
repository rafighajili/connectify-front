import { tv } from "tailwind-variants";

export const fieldStyles = tv({
  slots: {
    base: "flex flex-col gap-y-2",
    self: "flex",
  },
  variants: {
    hasStartButton: {
      true: {
        self: "[&>*:nth-child(1)]:!rounded-r-none [&>*:nth-child(2)]:!rounded-l-none",
      },
    },
    hasEndButton: {
      true: {
        self: "[&>*:nth-child(1)]:!rounded-r-none [&>*:nth-child(2)]:!rounded-l-none",
      },
    },
  },
  compoundVariants: [
    {
      hasStartButton: true,
      hasEndButton: true,
      class: {
        self: "[&>*:nth-child(1)]:!rounded-r-none [&>*:nth-child(2)]:!rounded-none [&>*:nth-child(3)]:!rounded-l-none",
      },
    },
  ],
});

export const labelStyles = tv({
  base: "w-fit text-sm",
});

export const helperTextStyles = tv({
  base: "w-fit text-sm",
  variants: {
    isInvalid: {
      true: "text-danger-500",
    },
  },
});

export const fieldTextInputStyles = tv({
  slots: {
    base: "flex-1 flex bg-default-100 text-default-1000 border border-default-200 overflow-hidden outline-none z-10 duration-200",
    self: "flex-1 w-full bg-transparent outline-none placeholder:text-default-500",
    content: "flex items-center text-default-700",
  },
  variants: {
    size: {
      sm: { base: "h-8 text-sm", self: "px-2", content: "[&>svg]:h-4 [&>svg]:w-4 px-2" },
      md: { base: "h-10 text-base", self: "px-2.5", content: "[&>svg]:h-5 [&>svg]:w-5 px-2.5" },
      lg: { base: "h-12 text-lg", self: "px-3", content: "[&>svg]:h-6 [&>svg]:w-6 px-3" },
    },
    radius: {
      sm: "rounded-lg",
      md: "rounded-xl",
      lg: "rounded-2xl",
      none: "rounded-none",
      full: "rounded-full",
    },
    isMultiline: {
      true: { base: "h-auto", self: "resize-none", content: "items-start" },
    },
    isContrasted: {
      true: { base: "bg-default-0" },
    },
    isInvalid: {
      true: { base: "bg-danger-500/20" },
    },
    isDisabled: {
      true: { base: "opacity-50", self: "cursor-not-allowed", content: "cursor-not-allowed" },
    },
    isHovered: {
      true: { base: "border-default-400" },
    },
    isFocused: {
      true: { base: "border-primary-500" },
    },
    isFocusVisible: {
      true: { base: "outline-2 outline-offset-2 outline-primary-500" },
    },
    hasStartContent: {
      true: { self: "!pl-0" },
    },
    hasEndContent: {
      true: { self: "!pr-0" },
    },
  },
  compoundVariants: [
    // is multiline & size
    {
      isMultiline: true,
      size: "sm",
      class: { self: "py-2", content: "py-2" },
    },
    {
      isMultiline: true,
      size: "md",
      class: { self: "py-2.5", content: "py-2.5" },
    },
    {
      isMultiline: true,
      size: "lg",
      class: { self: "py-3", content: "py-3" },
    },
  ],
});

export const fieldButtonStyles = tv({
  slots: {
    base: "flex items-center bg-default-100 text-default-1000 border border-default-200 overflow-hidden outline-none duration-200",
    self: "",
    content: "flex items-center text-default-700",
  },
  variants: {
    size: {
      sm: { base: "h-8 text-sm [&_svg]:h-4 [&_svg]:w-4", content: "px-2" },
      md: { base: "h-10 text-base [&_svg]:h-5 [&_svg]:w-5", content: "px-2.5" },
      lg: { base: "h-12 text-lg [&_svg]:h-6 [&_svg]:w-6", content: "px-3" },
    },
    radius: {
      sm: "rounded-lg",
      md: "rounded-xl",
      lg: "rounded-2xl",
      none: "rounded-none",
      full: "rounded-full",
    },
    isIconOnly: {
      true: { base: "justify-center" },
      false: { base: "flex-1", self: "flex-1 text-start" },
    },
    isContrasted: {
      true: { base: "bg-default-0" },
    },
    isDisabled: {
      true: { base: "opacity-50 cursor-not-allowed" },
    },
    isHovered: {
      true: { base: "border-default-400" },
    },
    isPressed: {
      true: "bg-default-200",
    },
    isFocusVisible: {
      true: "outline-2 outline-offset-2 outline-primary-500 z-20",
    },
    hasStartContent: {
      true: { self: "!pl-0" },
    },
    hasEndContent: {
      true: { self: "!pr-0" },
    },
  },
  compoundVariants: [
    // is icon only & size
    {
      isIconOnly: true,
      size: "sm",
      class: { base: "w-8" },
    },
    {
      isIconOnly: true,
      size: "md",
      class: { base: "w-10" },
    },
    {
      isIconOnly: true,
      size: "lg",
      class: { base: "w-12" },
    },
    {
      isIconOnly: false,
      size: "sm",
      class: { self: "px-2" },
    },
    {
      isIconOnly: false,
      size: "md",
      class: { self: "px-2.5" },
    },
    {
      isIconOnly: false,
      size: "lg",
      class: { self: "px-3" },
    },
  ],
});
