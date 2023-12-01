import { AriaTooltipProps, PositionProps, TooltipTriggerProps } from "react-aria";
import { ReactNode } from "react";
import { ChildrenProps } from "#/lib/types";

export interface ConnectifyTooltipProps
  extends AriaTooltipProps,
    TooltipTriggerProps,
    Pick<PositionProps, "offset" | "placement" | "shouldFlip">,
    ChildrenProps {
  content: ReactNode;
  delay?: number;
  closeDelay?: number;
}
