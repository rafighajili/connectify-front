import { useDialogSlots } from "./dialog.context";
import { ConnectifyPopoverDialogProps } from "./dialog.props";
import { DOMRef } from "../types";
import { useDOMRef } from "../utils";
import { forwardRef } from "react";
import { Popover } from "../overlays";
import { Dialog } from "./dialog";

function PopoverDialog(props: ConnectifyPopoverDialogProps, ref: DOMRef<HTMLDivElement>) {
  const { state, triggerRef, children, ...otherProps } = useDialogSlots(props);

  const domRef = useDOMRef(ref);

  return (
    <Popover state={state} triggerRef={triggerRef} {...otherProps}>
      <Dialog ref={domRef} {...otherProps}>
        {children}
      </Dialog>
    </Popover>
  );
}

const _PopoverDialog = forwardRef(PopoverDialog);
export { _PopoverDialog as PopoverDialog };
