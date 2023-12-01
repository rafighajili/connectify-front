import { useDialogSlots } from "./dialog.context";
import { ConnectifyModalDialogProps } from "./dialog.props";
import { DOMRef } from "../types";
import { useDOMRef } from "../utils";
import { forwardRef } from "react";
import { Modal } from "../overlays";
import { Dialog } from "./dialog";

function ModalDialog(props: ConnectifyModalDialogProps, ref: DOMRef<HTMLDivElement>) {
  const { state, triggerRef, children, ...otherProps } = useDialogSlots(props);

  const domRef = useDOMRef(ref);

  return (
    <Modal state={state} {...otherProps}>
      <Dialog ref={domRef} {...otherProps}>
        {children}
      </Dialog>
    </Modal>
  );
}

const _ModalDialog = forwardRef(ModalDialog);
export { _ModalDialog as ModalDialog };
