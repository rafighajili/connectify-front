import { ConnectifyCardProps } from "./card.props";
import { cardStyles } from "./card.styles";
import { DOMRef } from "../types";
import { useDOMRef } from "../utils";
import { forwardRef } from "react";
import { mergeProps, useFocusRing, useHover, usePress } from "react-aria";

function Card(props: ConnectifyCardProps, ref: DOMRef) {
  const {
    radius = "md",
    isContrasted = false,
    isPressable,
    children,
    elementType: Component = isPressable ? "button" : "div",
    className,
    style,

    // hover props
    isDisabled,
    onHoverChange,
    onHoverStart,
    onHoverEnd,

    // press props
    preventFocusOnPress,
    allowTextSelectionOnPress = true,
    shouldCancelOnPointerExit,
    onPress,
    onPressUp,
    onPressChange,
    onPressStart,
    onPressEnd,

    ...otherProps
  } = props;

  const domRef = useDOMRef(ref);
  const { hoverProps, isHovered } = useHover({ isDisabled, onHoverChange, onHoverStart, onHoverEnd });
  const { pressProps, isPressed } = usePress({
    isDisabled,
    preventFocusOnPress,
    allowTextSelectionOnPress,
    shouldCancelOnPointerExit,
    onPress,
    onPressUp,
    onPressChange,
    onPressStart,
    onPressEnd,
  });
  const { focusProps, isFocusVisible } = useFocusRing({});

  const pressableStyles = isPressable ? { isHovered, isPressed, isFocusVisible } : {};

  return (
    <Component
      {...mergeProps(hoverProps, isPressable ? pressProps : null, isPressable ? focusProps : null, otherProps)}
      ref={domRef}
      className={cardStyles({ radius, isContrasted, ...pressableStyles, className })}
      style={style}
    >
      {children}
    </Component>
  );
}

const _Card = forwardRef(Card);
export { _Card as Card };
