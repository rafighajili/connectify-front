import { useFieldSlots } from "./field.context";
import { ConnectifyFieldButtonProps } from "./field.props";
import { fieldButtonStyles } from "./field.styles";
import { DOMRef } from "../types";
import { useDOMRef } from "../utils";
import { forwardRef } from "react";
import { mergeProps, useButton, useFocusRing, useHover } from "react-aria";

function FieldButton(originalProps: ConnectifyFieldButtonProps, ref: DOMRef<HTMLButtonElement>) {
  const props = useFieldSlots(originalProps);
  const { size, radius, startContent, endContent, isContrasted, isIconOnly, isInvalid, isDisabled, children } = props;

  const domRef = useDOMRef(ref);
  const { buttonProps, isPressed } = useButton(props, domRef);
  const { hoverProps, isHovered } = useHover(props);
  const { focusProps, isFocusVisible } = useFocusRing(props);

  const { base, self, content } = fieldButtonStyles({
    size,
    radius,
    isIconOnly,
    isContrasted,
    isDisabled,
    isHovered,
    isPressed,
    isFocusVisible,
    hasStartContent: !!startContent,
    hasEndContent: !!endContent,
  });

  return (
    <button {...mergeProps(buttonProps, hoverProps, focusProps)} ref={domRef} className={base()}>
      {startContent && <div className={content()}>{startContent}</div>}

      <div className={self()}>{children}</div>

      {endContent && <div className={content()}>{endContent}</div>}
    </button>
  );
}

const _FieldButton = forwardRef(FieldButton);
export { _FieldButton as FieldButton };
