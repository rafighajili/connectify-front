import { ConnectifyDialogFooterProps } from "./dialog.props";
import { dialogFooterStyles } from "./dialog.styles";
import { DOMRef } from "../types";
import { useDOMRef } from "../utils";
import { forwardRef } from "react";

function DialogFooter(props: ConnectifyDialogFooterProps, ref: DOMRef) {
  const { children, className, style } = props;

  const domRef = useDOMRef(ref);

  return (
    <footer ref={domRef} className={dialogFooterStyles({ className })} style={style}>
      {children}
    </footer>
  );
}

const _DialogFooter = forwardRef(DialogFooter);
export { _DialogFooter as DialogFooter };
