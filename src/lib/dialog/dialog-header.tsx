import { ConnectifyDialogHeaderProps } from "./dialog.props";
import { dialogHeaderStyles } from "./dialog.styles";
import { DOMRef } from "../types";
import { useDOMRef } from "../utils";
import { forwardRef } from "react";

function DialogHeader(props: ConnectifyDialogHeaderProps, ref: DOMRef) {
  const { children, className, style } = props;

  const domRef = useDOMRef(ref);

  return (
    <header ref={domRef} className={dialogHeaderStyles({ className })} style={style}>
      {children}
    </header>
  );
}

const _DialogHeader = forwardRef(DialogHeader);
export { _DialogHeader as DialogHeader };
