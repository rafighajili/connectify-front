import { ConnectifyUnderlayProps } from "./overlays.props";
import { underlayStyles } from "./overlays.styles";
import { DOMRef } from "../types";
import { useDOMRef } from "../utils";
import { forwardRef } from "react";

function Underlay(props: ConnectifyUnderlayProps, ref: DOMRef<HTMLDivElement>) {
  const { backdrop, children, className, style, ...otherProps } = props;

  const domRef = useDOMRef(ref);

  return (
    <div ref={domRef} {...otherProps} className={underlayStyles({ backdrop, className })} style={style}>
      {children}
    </div>
  );
}

const _Underlay = forwardRef(Underlay);
export { _Underlay as Underlay };
