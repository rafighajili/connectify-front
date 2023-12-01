import { AriaModalOverlayProps, AriaPopoverProps } from "react-aria";
import { ChildrenProps, Sizes, StyleProps } from "../types";
import { OverlayTriggerState } from "react-stately";

export interface ConnectifyModalProps
  extends AriaModalOverlayProps,
    ChildrenProps,
    Partial<Pick<ConnectifyUnderlayProps, "backdrop">> {
  state: OverlayTriggerState;
  size?: Sizes | "full";
}

export interface ConnectifyPopoverProps
  extends Pick<
      AriaPopoverProps,
      "triggerRef" | "offset" | "placement" | "shouldFlip" | "shouldUpdatePosition" | "isKeyboardDismissDisabled"
    >,
    Partial<Pick<ConnectifyUnderlayProps, "backdrop">>,
    ChildrenProps {
  state: OverlayTriggerState;
  size?: Sizes | "full";
}

export interface ConnectifyUnderlayProps extends ChildrenProps, StyleProps {
  backdrop: "opaque" | "blur" | "transparent";
}
