import { ConnectifyDividerProps } from "./divider.props";
import { dividerStyles } from "./divider.styles";
import { DOMRef } from "../types";
import { useDOMRef } from "../utils";
import { ElementType, forwardRef } from "react";
import { useSeparator } from "react-aria";

function Divider(props: ConnectifyDividerProps, ref: DOMRef) {
  const {
    orientation = "horizontal",
    size = "sm",
    elementType: Component = (orientation === "horizontal" ? "hr" : "div") as ElementType,
    className,
    style,
  } = props;

  const domRef = useDOMRef(ref);
  const { separatorProps } = useSeparator(props);

  return (
    <Component
      ref={domRef}
      {...separatorProps}
      className={dividerStyles({ orientation, size, className })}
      style={style}
    />
  );
}

const _Divider = forwardRef(Divider);
export { _Divider as Divider };
