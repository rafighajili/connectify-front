import { useButtonGroupSlots } from "./button.context";
import { ConnectifyButtonProps } from "./button.props";
import { buttonStyles } from "./button.styles";
import { DOMRef } from "../types";
import { useDOMRef } from "../utils";
import { ElementType, forwardRef } from "react";
import { mergeProps, useButton, useFocusRing, useHover } from "react-aria";
import { Spinner } from "../index";
import { useFormSlots } from "../form";

function Button(originalProps: ConnectifyButtonProps, ref: DOMRef) {
  const formProps = useFormSlots({ ...originalProps, isDisabled: originalProps.isDisabled || originalProps.isLoading });
  const props = useButtonGroupSlots(formProps);
  const {
    variant = "solid",
    color = "default",
    size = "md",
    radius = "md",
    startContent,
    endContent,
    spinnerPlacement = "start",
    isIconOnly,
    isInGroup,
    isDisabled,
    isLoading,
    elementType: Component = "button" as ElementType,
    children,
    className,
    style,
  } = props;

  const domRef = useDOMRef(ref);
  const { buttonProps, isPressed } = useButton(props, domRef);
  const { hoverProps, isHovered } = useHover(props);
  const { focusProps, isFocusVisible } = useFocusRing(props);

  const spinner = isLoading ? <Spinner size={size} /> : null;

  return (
    <Component
      ref={domRef}
      {...mergeProps(buttonProps, hoverProps, focusProps)}
      className={buttonStyles({
        variant,
        color,
        size,
        radius,
        isDisabled,
        isIconOnly,
        isHovered,
        isPressed,
        isFocusVisible,
        isInGroup,
        className,
      })}
      style={style}
    >
      {spinnerPlacement === "start" && spinner}
      {startContent}
      {children}
      {endContent}
      {spinnerPlacement === "end" && spinner}
    </Component>
  );
}

const _Button = forwardRef(Button);
export { _Button as Button };
