import { ButtonGroupSlotsProvider } from "./button.context";
import { ConnectifyButtonGroupProps } from "./button.props";
import { buttonGroupStyles } from "./button.styles";
import { DOMRef } from "../types";
import { useDOMRef } from "../utils";
import { forwardRef } from "react";

function ButtonGroup(props: ConnectifyButtonGroupProps, ref: DOMRef<HTMLDivElement>) {
  const { variant, color, size, radius, isDisabled, children, className, style } = props;

  const domRef = useDOMRef(ref);

  return (
    <ButtonGroupSlotsProvider
      value={{
        variant,
        color,
        size,
        radius,
        isDisabled,
        isInGroup: true,
      }}
    >
      <div ref={domRef} className={buttonGroupStyles({ className })} style={style}>
        {children}
      </div>
    </ButtonGroupSlotsProvider>
  );
}

const _ButtonGroup = forwardRef(ButtonGroup);
export { _ButtonGroup as ButtonGroup };
