import { ConnectifyDialogBodyProps } from "./dialog.props";
import { dialogBodyStyles } from "./dialog.styles";
import { DOMRef } from "../types";
import { useDOMRef } from "../utils";
import { forwardRef } from "react";

function DialogBody(props: ConnectifyDialogBodyProps, ref: DOMRef) {
  const { children, className, style } = props;

  const domRef = useDOMRef(ref);

  return (
    <section ref={domRef} className={dialogBodyStyles({ className })} style={style}>
      {children}
    </section>
  );
}

const _DialogBody = forwardRef(DialogBody);
export { _DialogBody as DialogBody };
