import { ChildrenProps, Sizes, StyleProps } from "../types";
import { HoverProps, PressProps } from "react-aria";
import { ElementType } from "react";

export interface ConnectifyCardProps extends HoverProps, Omit<PressProps, "isPressed">, ChildrenProps, StyleProps {
  elementType?: ElementType;
  radius?: Sizes | "full" | "none";
  isContrasted?: boolean;
  isPressable?: boolean;
  href?: string;
}
