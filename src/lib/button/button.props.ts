import { AriaButtonProps } from "react-aria";
import { Colors, Sizes, StyleProps } from "../types";
import { ReactNode } from "react";

export interface ConnectifyButtonProps extends AriaButtonProps, StyleProps {
  variant?: "solid" | "soft" | "light" | "bordered" | "outlined" | "faded";
  color?: Colors;
  size?: Sizes;
  radius?: Sizes | "none" | "full";
  startContent?: ReactNode;
  endContent?: ReactNode;
  spinnerPlacement?: "start" | "end";
  isIconOnly?: boolean;
  isLoading?: boolean;
}

export interface ConnectifyButtonGroupProps
  extends Pick<
    ConnectifyButtonProps,
    "variant" | "color" | "size" | "radius" | "isDisabled" | "children" | "className" | "style"
  > {}
