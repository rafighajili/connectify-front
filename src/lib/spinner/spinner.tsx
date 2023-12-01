import { ConnectifySpinnerProps } from "./spinner.props";
import { spinnerStyles } from "./spinner.styles";
import { DOMRef } from "../types";
import { useDOMRef } from "../utils";
import { forwardRef } from "react";

function Spinner(props: ConnectifySpinnerProps, ref: DOMRef<HTMLDivElement>) {
  const { color = "current", size = "md", className, style } = props;

  const domRef = useDOMRef(ref);

  return <div ref={domRef} className={spinnerStyles({ color, size, className })} style={style} />;
}

const _Spinner = forwardRef(Spinner);
export { _Spinner as Spinner };
