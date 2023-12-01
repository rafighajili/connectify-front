import { ConnectifyPopoverProps } from "./overlays.props";
import { popoverStyles } from "./overlays.styles";
import { DOMRef } from "../types";
import { useDOMRef } from "../utils";
import { forwardRef } from "react";
import { DismissButton, Overlay, usePopover } from "react-aria";
import { Underlay } from "./underlay";
import { Card } from "../index";

function Popover(props: ConnectifyPopoverProps, ref: DOMRef<HTMLDivElement>) {
  const { state, size = "md", offset = 16, backdrop = "transparent", children } = props;

  const domRef = useDOMRef(ref);
  const { popoverProps, underlayProps } = usePopover({ ...props, popoverRef: domRef, offset }, state);

  return (
    <Overlay>
      <Underlay {...underlayProps} backdrop={backdrop} />
      <Card {...popoverProps} ref={domRef} className={popoverStyles({ size })}>
        <DismissButton onDismiss={state.close} />
        {children}
        <DismissButton onDismiss={state.close} />
      </Card>
    </Overlay>
  );
}

const _Popover = forwardRef(Popover);
export { _Popover as Popover };
