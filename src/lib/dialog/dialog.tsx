import { ConnectifyDialogProps } from "./dialog.props";
import { dialogStyles } from "./dialog.styles";
import { DOMRef } from "../types";
import { useDOMRef } from "../utils";
import { forwardRef } from "react";
import { useDialog } from "react-aria";

function Dialog(props: ConnectifyDialogProps, ref: DOMRef<HTMLDivElement>) {
  const { children } = props;

  const domRef = useDOMRef(ref);
  const { dialogProps } = useDialog(props, domRef);

  return (
    <div {...dialogProps} ref={domRef} className={dialogStyles()}>
      {children}
    </div>
  );
}

const _Dialog = forwardRef(Dialog);
export { _Dialog as Dialog };
